import json
import re
from typing import Any, AsyncGenerator
import httpx

from app.config import settings
from app.services.ai_provider import AIResponse, BaseAIProvider
from app.services.audit_service import audit_service


class GrokService(BaseAIProvider):
    GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions"
    GROQ_DEFAULT_MODEL = "llama-3.3-70b-versatile"

    XAI_BASE_URL = "https://api.x.ai/v1/chat/completions"
    XAI_DEFAULT_MODEL = "grok-2-latest"

    def __init__(self) -> None:
        self.api_key = settings.groq_api_key or settings.grok_api_key or settings.xai_api_key

    def is_configured(self) -> bool:
        return bool(self.api_key)

    def _resolve_endpoint_and_model(self) -> tuple[str, str, str]:
        key = self.api_key or ""
        if key.startswith("gsk_") or settings.groq_api_key:
            return self.GROQ_BASE_URL, self.GROQ_DEFAULT_MODEL, f"Groq LPU ({self.GROQ_DEFAULT_MODEL})"
        if key.startswith("xai-") or settings.xai_api_key:
            return self.XAI_BASE_URL, self.XAI_DEFAULT_MODEL, f"xAI Grok ({self.XAI_DEFAULT_MODEL})"
        # Default to Groq if key matches gsk or Grok format
        return self.GROQ_BASE_URL, self.GROQ_DEFAULT_MODEL, "Groq-LPU-FastEngine"

    async def generate_response(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
        trace_id: str,
    ) -> AIResponse:
        if not self.is_configured():
            raise ValueError("Groq / Grok API Key not configured")

        url, model, model_display_name = self._resolve_endpoint_and_model()
        prompt = self._build_system_prompt(catalog, memory)
        messages: list[dict[str, str]] = [{"role": "system", "content": prompt}]

        for turn in history[-6:]:
            role = "user" if turn.get("role") == "user" else "assistant"
            content = turn.get("content", "")
            if content:
                messages.append({"role": role, "content": content})

        messages.append({"role": "user", "content": message})

        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.4,
            "response_format": {"type": "json_object"},
        }
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(url, headers=headers, json=payload)

            if response.status_code >= 400:
                raise RuntimeError(f"AI API returned error {response.status_code}: {response.text}")

            data = response.json()
            raw_text = data["choices"][0]["message"]["content"]

            try:
                parsed = json.loads(raw_text)
            except json.JSONDecodeError:
                json_match = re.search(r"\{.*\}", raw_text, re.DOTALL)
                parsed = json.loads(json_match.group(0)) if json_match else {}

            return AIResponse(
                message=parsed.get("message", "Hey there! I'm here to help you find the perfect audio gear. What are you looking for today?"),
                intent=parsed.get("intent", "PRODUCT_DISCOVERY"),
                budget=float(parsed["budget"]) if parsed.get("budget") is not None else None,
                recommended_product_id=parsed.get("recommended_product_id"),
                upsell_product_id=parsed.get("upsell_product_id"),
                confidence=float(parsed.get("confidence", 0.98)),
                reasoning_summary=parsed.get("reasoning_summary", "Conversational response processed with context awareness."),
                specs_extracted=parsed.get("specs_extracted", {}),
                rejected_products=parsed.get("rejected_products", []),
                memory_updates=parsed.get("memory_updates", {}),
                model_name=model_display_name,
            )

    async def stream_tokens(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> AsyncGenerator[str, None]:
        if not self.is_configured():
            yield "AI streaming active."
            return

        url, model, _ = self._resolve_endpoint_and_model()
        prompt = self._build_system_prompt(catalog, memory)
        messages: list[dict[str, str]] = [{"role": "system", "content": prompt}]
        for turn in history[-4:]:
            messages.append({"role": turn.get("role", "user"), "content": turn.get("content", "")})
        messages.append({"role": "user", "content": message})

        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.4,
            "stream": True,
        }
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=20.0) as client:
            async with client.stream("POST", url, headers=headers, json=payload) as stream:
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
                "specs": p.get("specs", []),
                "in_stock": p.get("in_stock", True),
                "is_accessory": p.get("category") in ["Charging", "Protection", "accessory"] or p.get("price", 9999) < 1500,
            }
            for p in catalog
        ]
        return (
            "You are RAFON AI — the high-intelligence Autonomous Commerce Agent built for the Razorpay AI Buildathon.\n"
            "Your personality is warm, natural, human-like, knowledgeable, and empathetic like ChatGPT or Claude.\n\n"
            "CONVERSATIONAL GUIDELINES:\n"
            "1. GREETINGS & CASUAL INTERACTION (IMPORTANT):\n"
            "   - If the user greets you ('hi', 'hello', 'hey', 'what can you do', 'how can you help'), DO NOT force a product recommendation immediately.\n"
            "   - Greet them warmly and naturally: Explain what you do (precision audio matching for gaming/travel/work, strict budget protection, and 1-click Razorpay checkout), and ask what they are listening to or what budget they have in mind.\n"
            "   - In this case, set 'recommended_product_id': null and 'intent': 'GREETING' or 'CAPABILITIES_OVERVIEW'.\n\n"
            "2. SHOPPER SPEC & BUDGET MATCHING:\n"
            "   - When the user asks for recommendations (e.g. gaming low latency, noise cancellation, workout earbuds, under a specific budget):\n"
            "     - Explain with audiophile clarity why the product fits (latency, ANC dB, battery life, drivers).\n"
            "     - Strictly respect their budget ceiling (recommended product price MUST be <= budget).\n"
            "     - If there is remaining budget, propose a smart complementary accessory (e.g. 65W GaN fast charger) and show the total bundle price.\n\n"
            "3. MULTI-TURN MEMORY & FOLLOW-UP QUESTIONS:\n"
            "   - Answer questions like 'does it have good bass?', 'is there anything cheaper?', 'can I use it for Zoom calls?', 'add to cart' naturally and accurately.\n"
            "   - Maintain context across previous turns.\n\n"
            "MERCHANT GUARDRAILS & POLICIES (STRICT):\n"
            "1. Never hallucinate products outside the catalog.\n"
            "2. Output ONLY valid JSON in this exact structure:\n"
            "{\n"
            '  "message": "Conversational reply formatted in clean markdown with emojis and clear bullet points",\n'
            '  "intent": "GREETING | CAPABILITIES_OVERVIEW | GAMING_AUDIO | COMMUTE_ANC | WORK_CALLS | BUDGET_AUDIO | COMPARISON | CART_ACTION",\n'
            '  "budget": 6000,\n'
            '  "recommended_product_id": "product-id or null",\n'
            '  "upsell_product_id": "accessory-id or null",\n'
            '  "confidence": 0.98,\n'
            '  "reasoning_summary": "Extracted user constraints and matched optimal catalog item.",\n'
            '  "specs_extracted": {"latency_ms": 45, "use_case": "gaming"},\n'
            '  "rejected_products": [\n'
            '    {"id": "boat-immortal-131", "name": "boAt Immortal 131", "reason": "Lacks Active Noise Cancellation (ANC)"}\n'
            "  ],\n"
            '  "memory_updates": {"preferred_brand": "Nothing", "stated_budget": 6000}\n'
            "}\n\n"
            f"SESSION MEMORY:\n{json.dumps(memory)}\n\n"
            f"VERIFIED PRODUCT CATALOG:\n{json.dumps(compact_catalog, indent=2)}\n"
        )

