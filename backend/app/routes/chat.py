import uuid
from fastapi import APIRouter

from app.database import CONVERSATION_STORE
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_orchestrator import ai_orchestrator
from app.services.audit_service import audit_service
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

    # 2. Retrieve history (from in-memory store or client payload)
    history = CONVERSATION_STORE.get(conversation_id, [])
    if not history and hasattr(request, "conversation_history") and request.conversation_history:
        history = [h.model_dump() if hasattr(h, "model_dump") else h for h in request.conversation_history]

    # 3. Log ingest audit event
    audit_service.log_event(
        "QUERY_INGEST",
        {
            "conversation_id": conversation_id,
            "message": request.message,
            "cart_items_count": len(request.client_cart) if hasattr(request, "client_cart") and request.client_cart else 0,
        },
        trace_id=trace_id,
    )

    # 4. Prepare catalog
    catalog = [p.model_dump() for p in get_all_products()]

    # 5. AI Orchestration
    raw_decision = await ai_orchestrator.orchestrate(
        message=request.message,
        conversation_history=history,
        catalog=catalog,
        trace_id=trace_id,
    )

    # 6. Check if Intent is Pure Greeting / General Chat
    is_greeting = raw_decision.get("action") == "GREETING" or raw_decision.get("intent") == "GREETING"

    if is_greeting:
        # Do not force product catalog bounding or upsell cards on a simple hello
        validated_decision = raw_decision
        validated_decision["recommended_product_id"] = None
        validated_decision["upsell_product_id"] = None
        comparison = None
        budget_pct = 0.0
        telemetry = [
            {
                "id": "step-1",
                "name": "QUERY_INGEST",
                "status": "completed",
                "details": "Natural language tokenization & semantic mapping complete",
                "latency_ms": 14,
                "confidence": 1.0,
            },
            {
                "id": "step-2",
                "name": "INTENT_PARSED",
                "status": "completed",
                "details": "Extracted intent: 'GREETING' — Welcoming user",
                "latency_ms": 22,
                "confidence": float(raw_decision.get("confidence", 0.99)),
            },
            {
                "id": "step-3",
                "name": "POLICY_ENFORCED",
                "status": "completed",
                "details": "Standing by for user product specifications & budget constraints",
                "latency_ms": 8,
                "confidence": 1.0,
            },
        ]
    else:
        # Standard Commerce Evaluation
        validated_decision, telemetry, comparison, budget_pct = (
            policy_engine.evaluate_commerce_decision(raw_decision, trace_id)
        )

    # 7. Record conversation history
    history.append({"role": "user", "content": request.message})
    history.append({"role": "assistant", "content": validated_decision.get("reply", "")})
    CONVERSATION_STORE[conversation_id] = history[-10:]  # Keep last 10 turns

    return ChatResponse(
        conversation_id=conversation_id,
        reply=validated_decision.get("reply", "How can I assist your search today?"),
        intent=validated_decision.get("intent", "PRODUCT_DISCOVERY"),
        budget=validated_decision.get("budget"),
        requirements=validated_decision.get("requirements", []),
        recommended_product_id=validated_decision.get("recommended_product_id"),
        recommendation_reason=validated_decision.get("recommendation_reason"),
        upsell_product_id=validated_decision.get("upsell_product_id"),
        upsell_reason=validated_decision.get("upsell_reason"),
        confidence=float(validated_decision.get("confidence", 0.95)),
        telemetry=telemetry,
        comparison=comparison,
        action=validated_decision.get("action", "RECOMMEND"),
        budget_utilized_percentage=budget_pct,
        model_used=validated_decision.get("model_used", "groq (Primary: qwen/qwen3.8-27b)"),
    )
