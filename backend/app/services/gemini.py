import json
from typing import Any

import httpx

from app.config import settings


class GeminiService:
    MODEL = "gemini-2.5-flash"

    def __init__(self) -> None:
        self.api_key = settings.gemini_api_key

    async def generate_commerce_decision(
        self,
        message: str,
        catalog: list[dict[str, Any]],
    ) -> dict[str, Any]:
        if not self.api_key:
            raise RuntimeError("GEMINI_API_KEY is not configured")

        prompt = self._build_prompt(message, catalog)

        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.MODEL}:generateContent"
        )

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt,
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "responseMimeType": "application/json",
            },
        }

        params = {
            "key": self.api_key,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                url,
                params=params,
                json=payload,
            )

        response.raise_for_status()

        body = response.json()

        text = self._extract_text(body)

        try:
            result = json.loads(text)
        except json.JSONDecodeError as exc:
            raise RuntimeError(
                "Gemini returned invalid JSON"
            ) from exc

        return result

    def _build_prompt(
        self,
        message: str,
        catalog: list[dict[str, Any]],
    ) -> str:
        catalog_json = json.dumps(
            catalog,
            ensure_ascii=False,
        )

        return f"""
You are RAFON AI, an autonomous commerce assistant for an electronics merchant.

Your task is to understand a customer's shopping request and select the best
product from the supplied merchant catalog.

Important rules:
1. Never invent a product.
2. Only recommend products present in the catalog.
3. Respect the customer's stated budget.
4. Extract useful shopping requirements.
5. Recommend an optional complementary upsell only if it is genuinely relevant.
6. Do not perform payment actions.
7. Return ONLY valid JSON.
8. confidence must be between 0 and 1.

Customer request:
{message}

Merchant catalog:
{catalog_json}

Return exactly this JSON structure:

{{
  "reply": "A concise customer-facing explanation",
  "intent": "short intent label",
  "budget": 6000,
  "requirements": ["gaming", "low_latency"],
  "recommended_product_id": "product-id",
  "recommendation_reason": "Why this product matches",
  "upsell_product_id": "product-id-or-null",
  "confidence": 0.98
}}
""".strip()

    @staticmethod
    def _extract_text(body: dict[str, Any]) -> str:
        candidates = body.get("candidates", [])

        if not candidates:
            raise RuntimeError("Gemini returned no candidates")

        content = candidates[0].get("content", {})
        parts = content.get("parts", [])

        if not parts:
            raise RuntimeError("Gemini returned no content")

        text = parts[0].get("text")

        if not text:
            raise RuntimeError("Gemini returned empty text")

        return text


gemini_service = GeminiService()
