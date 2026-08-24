from pydantic import BaseModel, Field


class Product(BaseModel):
    id: str
    name: str
    category: str
    price: int = Field(ge=0)
    original_price: int = Field(ge=0)
    match_score: float | None = Field(default=None, ge=0, le=100)
    specs: list[str]
    icon: str
