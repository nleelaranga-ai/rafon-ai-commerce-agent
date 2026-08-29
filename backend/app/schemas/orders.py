from typing import Any
from pydantic import BaseModel, Field


class OrderItem(BaseModel):
    product_id: str
    name: str
    quantity: int = Field(default=1, ge=1)
    unit_price: int = Field(ge=0)
    is_upsell: bool = False


class CreateOrderRequest(BaseModel):
    conversation_id: str | None = None
    items: list[OrderItem]
    applied_discount_code: str | None = None
    customer_notes: str | None = None


class OrderResponse(BaseModel):
    id: str
    conversation_id: str | None = None
    items: list[OrderItem]
    subtotal: int
    discount_amount: int = 0
    total: int
    currency: str = "INR"
    razorpay_order_id: str
    status: str = "CREATED"  # CREATED, PAID, FAILED, RESCUED, REFUNDED
    created_at: str
    policy_validation_passed: bool = True
