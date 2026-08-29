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
            raise RuntimeError(
                "GEMINI_API_KEY is missing from Render environment variables."
            )

        prompt = self._build_prompt(message, catalog)

        url = (
            "https://generativelanguage.googleapis.com/v1beta/"
            f"models/{self.MODEL}:generateContent"
        )

        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": prompt,
                        }
                    ],
                }
            ],
            "generationConfig": {
                "temperature": 0.15,
                "responseMimeType": "application/json",
                "responseSchema": {
                    "type": "OBJECT",
                    "properties": {
                        "reply": {
                            "type": "STRING",
                        },
                        "intent": {
                            "type": "STRING",
                        },
                        "budget": {
                            "type": "INTEGER",
                        },
                        "requirements": {
                            "type": "ARRAY",
                            "items": {
                                "type": "STRING",
                            },
                        },
                        "recommended_product_id": {
                            "type": "STRING",
                        },
                        "recommendation_reason": {
                            "type": "STRING",
                        },
                        "upsell_product_id": {
                            "type": "STRING",
                        },
                        "confidence": {
                            "type": "NUMBER",
                        },
                    },
                    "required": [
                        "reply",
                        "intent",
                        "requirements",
                        "confidence",
                    ],
                },
            },
        }

        headers = {
            "x-goog-api-key": self.api_key,
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    url,
                    headers=headers,
                    json=payload,
                )

        except httpx.TimeoutException as exc:
            raise RuntimeError(
                "Gemini request timed out after 30 seconds."
            ) from exc

        except httpx.RequestError as exc:
            raise RuntimeError(
                f"Could not reach Gemini API: {exc}"
            ) from exc

        if response.status_code >= 400:
            raise RuntimeError(
                f"Gemini API returned HTTP {response.status_code}: "
                f"{response.text}"
            )

        try:
            body = response.json()
        except ValueError as exc:
            raise RuntimeError(
                "Gemini returned a non-JSON HTTP response."
            ) from exc

        text = self._extract_text(body)

        try:
            return json.loads(text)
        except json.JSONDecodeError as exc:
            raise RuntimeError(
                f"Gemini returned invalid JSON: {text}"
            ) from exc

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
You are RAFON AI, an autonomous commerce assistant for Apex Electronics.

Your job is to understand a customer's shopping request and select the best
product from the merchant catalog.

Rules:
1. Never invent products.
2. Only recommend products from the catalog.
3. Never recommend above the customer's explicit budget.
4. Extract meaningful shopping requirements.
5. An upsell must be relevant and complementary.
6. Never claim that payment has happened.
7. Never execute a payment.
8. Return only JSON matching the provided schema.

Customer request:
{message}

Merchant catalog:
{catalog_json}

For:
"I need wireless earbuds for gaming under ₹6000."

Prioritize:
- gaming use case
- low latency
- explicit budget
- product relevance
- customer value

Return the best commerce decision.
""".strip()

    @staticmethod
    def _extract_text(
        body: dict[str, Any],
    ) -> str:

        candidates = body.get("candidates")

        if not candidates:
            raise RuntimeError(
                f"Gemini returned no candidates: {body}"
            )

        parts = (
            candidates[0]
            .get("content", {})
            .get("parts", [])
        )

        if not parts:
            raise RuntimeError(
                f"Gemini returned no content parts: {body}"
            )

        text = parts[0].get("text")

        if not text:
            raise RuntimeError(
                f"Gemini returned empty text: {body}"
            )

        return text


gemini_service = GeminiService()
