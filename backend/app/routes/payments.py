from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from app.database import ORDER_STORE, PAYMENT_STORE
from app.schemas.payments import (
    RecoveryOffer,
    TriggerFailureRequest,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
)
from app.services.audit_service import audit_service
from app.services.razorpay_service import razorpay_service
from app.services.recovery_engine import recovery_engine

router = APIRouter(
    prefix="/payments",
    tags=["Payments & Recovery"],
)


@router.post("/verify", response_model=VerifyPaymentResponse)
def verify_payment(request: VerifyPaymentRequest) -> VerifyPaymentResponse:
    order = ORDER_STORE.get(request.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    is_valid = razorpay_service.verify_payment_signature(
        razorpay_order_id=request.razorpay_order_id,
        razorpay_payment_id=request.razorpay_payment_id,
        razorpay_signature=request.razorpay_signature,
    )

    if not is_valid:
        audit_service.log_event(
            "PAYMENT_SIGNATURE_FAILED",
            {
                "order_id": request.order_id,
                "razorpay_payment_id": request.razorpay_payment_id,
            },
            severity="CRITICAL",
        )
        raise HTTPException(status_code=400, detail="Invalid Razorpay payment signature")

    verified_at = datetime.now(timezone.utc).isoformat()
    order["status"] = "PAID"
    order["verified_at"] = verified_at
    order["razorpay_payment_id"] = request.razorpay_payment_id

    payment_record = {
        "order_id": request.order_id,
        "razorpay_payment_id": request.razorpay_payment_id,
        "razorpay_order_id": request.razorpay_order_id,
        "amount": order.get("total", 0),
        "status": "CAPTURED",
        "verified_at": verified_at,
    }
    PAYMENT_STORE[request.razorpay_payment_id] = payment_record

    audit_service.log_event(
        "PAYMENT_VERIFIED_SUCCESS",
        {
            "order_id": request.order_id,
            "razorpay_payment_id": request.razorpay_payment_id,
            "amount": order.get("total", 0),
            "status": "PAID",
        },
        severity="SUCCESS",
    )

    return VerifyPaymentResponse(
        success=True,
        order_id=request.order_id,
        status="PAID",
        message="Payment signature cryptographically verified. Order marked as fulfilled.",
        verified_at=verified_at,
        amount_paid=order.get("total", 0),
    )


@router.post("/recover", response_model=RecoveryOffer)
def trigger_recovery(request: TriggerFailureRequest) -> RecoveryOffer:
    offer = recovery_engine.initiate_recovery(
        order_id=request.order_id,
        error_code=request.error_code,
        error_description=request.error_description,
        payment_method=request.payment_method,
    )
    return offer
