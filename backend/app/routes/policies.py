from typing import Any
from fastapi import APIRouter
from pydantic import BaseModel

from app.database import MERCHANT_SETTINGS
from app.schemas.orders import OrderItem
from app.services.policy_engine import policy_engine

router = APIRouter(
    prefix="/policies",
    tags=["Merchant Policies"],
)


class CartValidationRequest(BaseModel):
    items: list[OrderItem]
    discount_code: str | None = None


class MerchantSettingsUpdate(BaseModel):
    max_ai_discount_pct: int | None = None
    min_margin_pct: int | None = None
    auto_bundle_enabled: bool | None = None


@router.get("")
def get_merchant_policies() -> dict[str, Any]:
    """Retrieve current active merchant boundary guardrails and rules."""
    return {
        "status": "active",
        "settings": MERCHANT_SETTINGS,
        "rules": [
            "Strict catalog bounding: No out-of-catalog hallucinations permitted",
            "Budget constraint enforcement: Products exceeding customer ceiling are bounded",
            "Margin protection: Minimum acceptable margin maintained across automated bundles",
            "Discount cap: AI rescue discounts hard-limited to verified limits",
        ],
    }


@router.post("/validate-cart")
def validate_cart(payload: CartValidationRequest) -> dict[str, Any]:
    """Validate cart subtotal, bundle discounts, and maximum allowable markdown."""
    subtotal, discount, total = policy_engine.validate_cart(
        payload.items, payload.discount_code
    )
    return {
        "subtotal": subtotal,
        "discount_amount": discount,
        "total": total,
        "currency": "INR",
        "policy_verified": True,
    }


@router.put("/settings")
def update_merchant_settings(payload: MerchantSettingsUpdate) -> dict[str, Any]:
    """Update active guardrail limits."""
    if payload.max_ai_discount_pct is not None:
        MERCHANT_SETTINGS["max_ai_discount_pct"] = payload.max_ai_discount_pct
    if payload.min_margin_pct is not None:
        MERCHANT_SETTINGS["min_margin_pct"] = payload.min_margin_pct
    if payload.auto_bundle_enabled is not None:
        MERCHANT_SETTINGS["auto_bundle_enabled"] = payload.auto_bundle_enabled

    return {
        "message": "Merchant guardrail settings updated",
        "settings": MERCHANT_SETTINGS,
    }
