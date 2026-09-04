import uuid

from fastapi import APIRouter

from app.database import CONVERSATION_STORE
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.audit_service import audit_service
from app.services.orchestrator import unified_orchestrator
from app.services.policy_engine import policy_engine
from app.services.product_service import get_all_products

router = APIRouter(
    prefix="/chat",
    tags=["AI Commerce"],
)


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    # 1. Resolve conversation_id and trace_id
    conversation_id = request.conversation_id or f"conv_{uuid.uuid4().hex[:8]}"
    trace_id = f"trc_{uuid.uuid4().hex[:8]}"

    # 2. Retrieve conversation history
    history = CONVERSATION_STORE.get(conversation_id, [])

    # 3. Log ingest audit event
    audit_service.log_event(
        "QUERY_INGEST",
        {
            "conversation_id": conversation_id,
            "message": request.message,
            "cart_items_count": len(request.client_cart),
        },
        trace_id=trace_id,
    )

    # 4. Prepare catalog
    catalog = [p.model_dump() for p in get_all_products()]

    # 5. AI Orchestration (Grok -> Gemini -> Local Deterministic Engine)
    raw_decision = await unified_orchestrator.orchestrate(
        message=request.message,
        conversation_history=history,
        catalog=catalog,
        trace_id=trace_id,
        session_id=conversation_id,
    )

    # 6. Deterministic Policy Bounding & Telemetry Generation
    validated_decision, telemetry, comparison, budget_pct = (
        policy_engine.evaluate_commerce_decision(raw_decision, trace_id)
    )

    reply_text = validated_decision.get("message") or validated_decision.get("reply", "Here are matching recommendations from our catalog.")

    # 7. Record conversation history
    history.append({"role": "user", "content": request.message})
    history.append({"role": "assistant", "content": reply_text})
    CONVERSATION_STORE[conversation_id] = history

    return ChatResponse(
        conversation_id=conversation_id,
        reply=reply_text,
        intent=validated_decision.get("intent", "PRODUCT_DISCOVERY"),
        budget=int(validated_decision["budget"]) if validated_decision.get("budget") is not None else None,
        requirements=validated_decision.get("requirements", []),
        recommended_product_id=validated_decision.get("recommended_product_id"),
        recommendation_reason=validated_decision.get("reasoning_summary") or validated_decision.get("recommendation_reason"),
        upsell_product_id=validated_decision.get("upsell_product_id"),
        upsell_reason=validated_decision.get("upsell_reason") or "Margin-compliant accessory within budget.",
        confidence=float(validated_decision.get("confidence", 0.98)),
        telemetry=telemetry,
        comparison=comparison,
        action=validated_decision.get("action", "RECOMMEND"),
        budget_utilized_percentage=budget_pct,
        model_used=validated_decision.get("model_name") or validated_decision.get("model_used", "Grok-2-Commerce"),
        reasoning_summary=validated_decision.get("reasoning_summary", ""),
        rejected_products=validated_decision.get("rejected_products", []),
        memory_updates=validated_decision.get("memory_updates", {}),
        specs_extracted=validated_decision.get("specs_extracted", {}),
    )


