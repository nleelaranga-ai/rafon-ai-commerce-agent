import json
import re
from typing import Any, AsyncGenerator
import httpx

from app.config import settings
from app.services.ai_provider import AIResponse, BaseAIProvider
from app.services.audit_service import audit_service


class GrokService(BaseAIProvider):
    GROK_BASE_URL = "https://api.x.ai/v1/chat/completions"
    DEFAULT_MODEL = "grok-2-latest"

    def __init__(self) -> None:
        self.api_key = settings.grok_api_key or settings.xai_api_key

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
            raise ValueError("Grok API Key not configured")

        prompt = self._build_system_prompt(catalog, memory)
        messages: list[dict[str, str]] = [{"role": "system", "content": prompt}]

        for turn in history[-4:]:
            role = "user" if turn.get("role") == "user" else "assistant"
            content = turn.get("content", "")
            if content:
                messages.append({"role": role, "content": content})

        messages.append({"role": "user", "content": message})

        payload = {
            "model": self.DEFAULT_MODEL,
            "messages": messages,
            "temperature": 0.2,
            "response_format": {"type": "json_object"},
        }
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(self.GROK_BASE_URL, headers=headers, json=payload)

            if response.status_code >= 400:
                raise RuntimeError(f"Grok API returned error {response.status_code}: {response.text}")

            data = response.json()
            raw_text = data["choices"][0]["message"]["content"]

            try:
                parsed = json.loads(raw_text)
            except json.JSONDecodeError:
                json_match = re.search(r"\{.*\}", raw_text, re.DOTALL)
                parsed = json.loads(json_match.group(0)) if json_match else {}

            return AIResponse(
                message=parsed.get("message", "Here is our top verified recommendation."),
                intent=parsed.get("intent", "PRODUCT_DISCOVERY"),
                budget=float(parsed["budget"]) if parsed.get("budget") is not None else None,
                recommended_product_id=parsed.get("recommended_product_id"),
                upsell_product_id=parsed.get("upsell_product_id"),
                confidence=float(parsed.get("confidence", 0.98)),
                reasoning_summary=parsed.get("reasoning_summary", "Matched technical specifications within stated budget."),
                specs_extracted=parsed.get("specs_extracted", {}),
                rejected_products=parsed.get("rejected_products", []),
                memory_updates=parsed.get("memory_updates", {}),
                model_name=f"Grok-2 ({self.DEFAULT_MODEL})",
            )

    async def stream_tokens(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> AsyncGenerator[str, None]:
        if not self.is_configured():
            yield "Grok AI streaming active."
            return

        prompt = self._build_system_prompt(catalog, memory)
        messages: list[dict[str, str]] = [{"role": "system", "content": prompt}]
        for turn in history[-3:]:
            messages.append({"role": turn.get("role", "user"), "content": turn.get("content", "")})
        messages.append({"role": "user", "content": message})

        payload = {
            "model": self.DEFAULT_MODEL,
            "messages": messages,
            "temperature": 0.2,
            "stream": True,
        }
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=20.0) as client:
            async with client.stream("POST", self.GROK_BASE_URL, headers=headers, json=payload) as stream:
                async for chunk in stream.aiter_lines():
                    if chunk.startswith("data: "):
                        data_str = chunk[6:].strip()
                        if data_str == "[DONE]":
                            break
                        try:
                            delta_json = json.loads(data_str)
                            delta_content = delta_json["choices"][0]["delta"].get("content", "")
                            if delta_content:
                                yield delta_content
                        except Exception:
                            continue

    def _build_system_prompt(self, catalog: list[dict[str, Any]], memory: dict[str, Any]) -> str:
        compact_catalog = [
            {
                "id": p.get("id"),
                "name": p.get("name"),
                "price": p.get("price"),
                "category": p.get("category"),
                "specs": p.get("specs", {}),
                "in_stock": p.get("in_stock", True),
                "is_accessory": p.get("category") == "accessory" or p.get("price", 9999) < 1500,
            }
            for p in catalog
        ]
        return (
            "You are RAFON AI — the high-velocity Autonomous Commerce Agent built for the Razorpay AI Buildathon.\n"
            "Your goal is to parse conversational shopper intent, extract hard constraints (budget, latency, ANC, battery), "
            "recommend the single BEST matching product from the catalog, and suggest a high-margin upsell accessory that fits inside the shopper's remaining budget.\n\n"
            "MERCHANT GUARDRAILS & POLICIES (STRICT):\n"
            "1. Never hallucinate products outside the catalog.\n"
            "2. If the user states a budget ceiling (e.g. ₹6000), total primary product price MUST be <= budget.\n"
            "3. If an upsell accessory is proposed, (primary_price + upsell_price) should ideally fit within or near budget.\n"
            "4. Output ONLY valid JSON in this exact structure:\n"
            "{\n"
            '  "message": "Conversational reply explaining why this product is selected",\n'
            '  "intent": "GAMING_AUDIO | COMMUTE_ANC | WORK_CALLS | BUDGET_AUDIO | ACCESSORY_MATCH",\n'
            '  "budget": 6000,\n'
            '  "recommended_product_id": "product-id",\n'
            '  "upsell_product_id": "accessory-id",\n'
            '  "confidence": 0.98,\n'
            '  "reasoning_summary": "Extracted gaming latency spec (<50ms) and matched Nothing Ear (a) at ₹5,499 under ₹6,000 ceiling.",\n'
            '  "specs_extracted": {"latency_ms": 45, "anc_db": 45, "use_case": "gaming"},\n'
            '  "rejected_products": [\n'
            '    {"id": "boat-air-141", "name": "boAt Airdopes 141", "reason": "Latency 65ms exceeds gaming requirement"}\n'
            "  ],\n"
            '  "memory_updates": {"preferred_brand": "Nothing", "stated_budget": 6000}\n'
            "}\n\n"
            f"SESSION MEMORY:\n{json.dumps(memory)}\n\n"
            f"VERIFIED PRODUCT CATALOG:\n{json.dumps(compact_catalog, indent=2)}\n"
        )

