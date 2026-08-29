import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

from app.database import MERCHANT_SETTINGS, ORDER_STORE
from app.schemas.payments import RecoveryOffer
from app.services.audit_service import audit_service


class RecoveryEngine:
    @staticmethod
    def initiate_recovery(
        order_id: str,
        error_code: str = "ERR_BANK_504_TIMEOUT",
        error_description: str = "Bank gateway timeout during UPI authentication",
        payment_method: str = "UPI",
    ) -> RecoveryOffer:
        trace_id = f"trc_rec_{uuid.uuid4().hex[:8]}"

        order = ORDER_STORE.get(order_id)
        current_total = order.get("total", 5998) if order else 5998

        hold_minutes = MERCHANT_SETTINGS.get("hold_duration_minutes", 15)
        rescue_discount_pct = MERCHANT_SETTINGS.get("rescue_discount_pct", 5)

        expires_at = (
            datetime.now(timezone.utc) + timedelta(minutes=hold_minutes)
        ).isoformat()

        discount_amount = int(current_total * (rescue_discount_pct / 100))
        revised_total = max(0, current_total - discount_amount)

        rescue_code = f"RESCUE{rescue_discount_pct}"

        # Choose best alternate route
        alt_method = "Razorpay Fast-Track Card/NetBanking" if payment_method.upper() == "UPI" else "Razorpay Direct UPI Auto-Intent"

        offer = RecoveryOffer(
            order_id=order_id,
            policy_code="RF-REC-02 (Autonomous Revenue Rescue Policy)",
            reason=f"Detected {error_code}: {error_description}. Applying 15-minute inventory protection lock and bounded {rescue_discount_pct}% conversion incentive.",
            hold_duration_minutes=hold_minutes,
            expires_at=expires_at,
            discount_percentage=rescue_discount_pct,
            discount_amount=discount_amount,
            rescue_code=rescue_code,
            revised_total=revised_total,
            recommended_payment_method=alt_method,
            one_click_retry_url=f"/checkout?order_id={order_id}&rescue_code={rescue_code}",
            audit_trace_id=trace_id,
        )

        if order:
            order["status"] = "RESCUE_OFFERED"
            order["recovery_offer"] = offer.model_dump()

        audit_service.log_event(
            "PAYMENT_FAILURE_RECOVERED",
            {
                "order_id": order_id,
                "error_code": error_code,
                "policy_code": "RF-REC-02",
                "discount_applied": discount_amount,
                "revised_total": revised_total,
                "hold_minutes": hold_minutes,
            },
            trace_id=trace_id,
            severity="WARN",
        )

        return offer


recovery_engine = RecoveryEngine()
