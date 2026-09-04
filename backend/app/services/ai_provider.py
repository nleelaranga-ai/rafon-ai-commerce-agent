from abc import ABC, abstractmethod
from typing import Any, AsyncGenerator
from pydantic import BaseModel, Field


class AIResponse(BaseModel):
    model_config = {"protected_namespaces": ()}

    message: str
    intent: str = "PRODUCT_DISCOVERY"
    budget: float | None = None
    recommended_product_id: str | None = None
    upsell_product_id: str | None = None
    confidence: float = 0.95
    reasoning_summary: str = ""
    specs_extracted: dict[str, Any] = Field(default_factory=dict)
    rejected_products: list[dict[str, Any]] = Field(default_factory=list)
    memory_updates: dict[str, Any] = Field(default_factory=dict)
    model_name: str = "Grok-2-Commerce"


class BaseAIProvider(ABC):
    @abstractmethod
    async def generate_response(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
        trace_id: str,
    ) -> AIResponse:
        pass

    @abstractmethod
    async def stream_tokens(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> AsyncGenerator[str, None]:
        pass

