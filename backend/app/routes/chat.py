from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.gemini import gemini_service
from app.services.recommendation import (
    build_catalog_for_ai,
    validate_recommendation,
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Commerce"],
)


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        result = await gemini_service.generate_commerce_decision(
            message=request.message,
            catalog=build_catalog_for_ai(),
        )
    except RuntimeError as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail="AI service request failed",
        ) from exc

    recommendation = validate_recommendation(
        product_id=result.get("recommended_product_id"),
        budget=result.get("budget"),
    )

    if result.get("recommended_product_id") and recommendation is None:
        result["recommended_product_id"] = None
        result["recommendation_reason"] = (
            "The suggested product did not pass merchant-side validation."
        )

    return ChatResponse(
        reply=result.get(
            "reply",
            "I found a few products that may fit your request.",
        ),
        intent=result.get("intent", "general_shopping"),
        budget=result.get("budget"),
        requirements=result.get("requirements", []),
        recommended_product_id=result.get(
            "recommended_product_id"
        ),
        recommendation_reason=result.get(
            "recommendation_reason"
        ),
        upsell_product_id=result.get(
            "upsell_product_id"
        ),
        confidence=float(
            result.get("confidence", 0.0)
        ),
    )
