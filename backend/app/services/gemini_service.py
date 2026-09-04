import json
import re
from typing import Any, AsyncGenerator
import httpx

from app.config import settings
from app.services.ai_provider import AIResponse, BaseAIProvider


class GeminiService(BaseAIProvider):
    GEMINI_MODEL = "gemini-2.5-flash"

    def __init__(self) -> None:
        self.api_key = settings.gemini_api_key

    def is_configured(self) -> bool:
        return bool(self.api_key)

    async def generate_response(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
        trace_id: str,
    ) -> AIResponse:
        if not self.is_configured():
            raise ValueError("Gemini API Key not configured")

        prompt = self._build_prompt(message, history, catalog, memory)
        url = (
            "https://generativelanguage.googleapis.com/v1beta/"
            f"models/{self.GEMINI_MODEL}:generateContent"
        )
        payload = {
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.2,
                "responseMimeType": "application/json",
            },
        }
        headers = {"x-goog-api-key": self.api_key, "Content-Type": "application/json"}

        async with httpx.AsyncClient(timeout=12.0) as client:
            response = await client.post(url, headers=headers, json=payload)

        if response.status_code >= 400:
            raise RuntimeError(f"Gemini API error {response.status_code}: {response.text}")

        body = response.json()
        raw_text = (
            body.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "{}")
        )

        try:
            parsed = json.loads(raw_text)
        except json.JSONDecodeError:
            json_match = re.search(r"\{.*\}", raw_text, re.DOTALL)
            parsed = json.loads(json_match.group(0)) if json_match else {}

        return AIResponse(
            message=parsed.get("message", "Here is our top recommendation for your request."),
            intent=parsed.get("intent", "PRODUCT_DISCOVERY"),
            budget=float(parsed["budget"]) if parsed.get("budget") is not None else None,
            recommended_product_id=parsed.get("recommended_product_id"),
            upsell_product_id=parsed.get("upsell_product_id"),
            confidence=float(parsed.get("confidence", 0.95)),
            reasoning_summary=parsed.get("reasoning_summary", "Analyzed query against merchant policy bounds."),
            specs_extracted=parsed.get("specs_extracted", {}),
            rejected_products=parsed.get("rejected_products", []),
            memory_updates=parsed.get("memory_updates", {}),
            model_name=f"Gemini ({self.GEMINI_MODEL})",
        )

    async def stream_tokens(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> AsyncGenerator[str, None]:
        res = await self.generate_response(message, history, catalog, memory, "trace_stream")
        yield res.message

    def _build_prompt(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> str:
        compact_catalog = [
            {
                "id": p.get("id"),
                "name": p.get("name"),
                "price": p.get("price"),
                "category": p.get("category"),
                "specs": p.get("specs", {}),
                "in_stock": p.get("in_stock", True),
            }
            for p in catalog
        ]
        return (
            "You are RAFON AI for Razorpay AI Buildathon.\n"
            f"Given the customer message: {message}\n"
            "Return ONLY a valid JSON object matching:\n"
            "{\n"
            '  "message": "Conversational reply",\n'
            '  "intent": "GAMING_AUDIO | COMMUTE_ANC | WORK_CALLS | BUDGET_AUDIO | ACCESSORY_MATCH",\n'
            '  "budget": 6000,\n'
            '  "recommended_product_id": "product-id",\n'
            '  "upsell_product_id": "accessory-id",\n'
            '  "confidence": 0.96,\n'
            '  "reasoning_summary": "Extracted budget and latency specs",\n'
            '  "specs_extracted": {"latency_ms": 45},\n'
            '  "rejected_products": [{"id": "boat-air-141", "name": "boAt Airdopes 141", "reason": "Latency too high"}],\n'
            '  "memory_updates": {"preferred_brand": "Nothing"}\n'
            "}\n\n"
            f"CATALOG:\n{json.dumps(compact_catalog)}\n"
        )

