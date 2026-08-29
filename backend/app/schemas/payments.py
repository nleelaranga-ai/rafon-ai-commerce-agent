from typing import Any
from pydantic import BaseModel, Field


class VerifyPaymentRequest(BaseModel):
    order_id: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class VerifyPaymentResponse(BaseModel):
    success: bool
    order_id: str
    status: str
    message: str
    verified_at: str
    amount_paid: int


class TriggerFailureRequest(BaseModel):
    order_id: str
    error_code: str = "ERR_BANK_504_TIMEOUT"
    error_description: str = "Bank gateway did not respond within timeout window"
    payment_method: str = "UPI"


class RecoveryOffer(BaseModel):
    order_id: str
    policy_code: str
    reason: str
    hold_duration_minutes: int
    expires_at: str
    discount_percentage: int
    discount_amount: int
    rescue_code: str
    revised_total: int
    recommended_payment_method: str
    one_click_retry_url: str
    audit_trace_id: str
