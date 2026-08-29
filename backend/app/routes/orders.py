import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from app.database import ORDER_STORE
from app.schemas.orders import CreateOrderRequest, OrderResponse
from app.services.audit_service import audit_service
from app.services.policy_engine import policy_engine
from app.services.razorpay_service import razorpay_service

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.post("/create", response_model=OrderResponse)
async def create_order(request: CreateOrderRequest) -> OrderResponse:
    if not request.items:
        raise HTTPException(status_code=400, detail="Cart cannot be empty")

    order_id = f"ord_{uuid.uuid4().hex[:10]}"
    trace_id = f"trc_ord_{uuid.uuid4().hex[:8]}"

    # Policy validation
    subtotal, discount_amount, total = policy_engine.validate_cart(
        request.items,
        request.applied_discount_code,
    )

    # Razorpay order generation
    rp_order = await razorpay_service.create_order(
        amount_in_rupees=total,
        receipt=order_id,
        notes={
            "conversation_id": request.conversation_id or "unassigned",
            "items_count": len(request.items),
            "discount_code": request.applied_discount_code or "none",
        },
    )

    created_at = datetime.now(timezone.utc).isoformat()

    order_data = {
        "id": order_id,
        "conversation_id": request.conversation_id,
        "items": [item.model_dump() for item in request.items],
        "subtotal": subtotal,
        "discount_amount": discount_amount,
        "total": total,
        "currency": "INR",
        "razorpay_order_id": rp_order.get("id", f"order_{uuid.uuid4().hex[:12]}"),
        "status": "CREATED",
        "created_at": created_at,
        "policy_validation_passed": True,
    }

    ORDER_STORE[order_id] = order_data

    audit_service.log_event(
        "ORDER_CREATED",
        {
            "order_id": order_id,
            "razorpay_order_id": order_data["razorpay_order_id"],
            "subtotal": subtotal,
            "discount": discount_amount,
            "total": total,
            "items": len(request.items),
        },
        trace_id=trace_id,
    )

    return OrderResponse(**order_data)


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: str) -> OrderResponse:
    order = ORDER_STORE.get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderResponse(**order)
