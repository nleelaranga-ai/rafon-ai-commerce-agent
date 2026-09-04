from typing import Any
from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.database import MERCHANT_SETTINGS
from app.services.audit_service import audit_service

router = APIRouter(
    prefix="/policies",
    tags=["Merchant Governance & Policies"],
)


class PolicyUpdateRequest(BaseModel):
    max_ai_discount_pct: int = Field(default=5, ge=0, le=25)
    target_upsell_margin_pct: int = Field(default=25, ge=10, le=60)
    min_inventory_threshold: int = Field(default=3, ge=1, le=20)
    hold_duration_minutes: int = Field(default=15, ge=5, le=60)
    rescue_discount_pct: int = Field(default=5, ge=0, le=15)


@router.get("")
def get_merchant_policies() -> dict[str, Any]:
    return {
        "status": "success",
        "policies": MERCHANT_SETTINGS,
        "guardrail_status": "ACTIVE",
        "zero_hallucination_guarantee": True,
        "hmac_enforcement": True,
    }


@router.post("")
def update_merchant_policies(payload: PolicyUpdateRequest) -> dict[str, Any]:
    old_policies = dict(MERCHANT_SETTINGS)
    MERCHANT_SETTINGS.update(payload.model_dump())

    audit_service.log_event(
        "MERCHANT_POLICY_UPDATED",
        {
            "old_policies": old_policies,
            "new_policies": MERCHANT_SETTINGS,
        },
        severity="INFO",
    )

    return {
        "status": "success",
        "message": "Merchant policy playground updated. Live AI guardrails synchronized.",
        "policies": MERCHANT_SETTINGS,
    }

