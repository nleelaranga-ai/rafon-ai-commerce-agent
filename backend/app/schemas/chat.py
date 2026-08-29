from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    reply: str
    intent: str
    budget: int | None = None
    requirements: list[str] = []
    recommended_product_id: str | None = None
    recommendation_reason: str | None = None
    upsell_product_id: str | None = None
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)
