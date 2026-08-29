from typing import Any
from pydantic import BaseModel, Field


class TelemetryStep(BaseModel):
    id: str
    name: str
    status: str = "completed"  # pending, in_progress, completed, failed
    details: str
    latency_ms: int = 0
    confidence: float = 1.0


class SpecComparison(BaseModel):
    primary_product_id: str
    alternative_product_id: str
    comparison_points: list[dict[str, str]] = []
    savings: int = 0


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    conversation_id: str | None = None
    client_cart: list[dict[str, Any]] = []


class ChatResponse(BaseModel):
    conversation_id: str
    reply: str
    intent: str
    budget: int | None = None
    requirements: list[str] = []
    recommended_product_id: str | None = None
    recommendation_reason: str | None = None
    upsell_product_id: str | None = None
    upsell_reason: str | None = None
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)
    telemetry: list[TelemetryStep] = []
    comparison: SpecComparison | None = None
    action: str = "RECOMMEND"  # GREETING, RECOMMEND, UPSELL, CART_ACTION, COMPARISON, CLARIFY
    budget_utilized_percentage: float = 0.0
    model_used: str = "gemini-2.5-flash"

    model_config = {"protected_namespaces": ()}


