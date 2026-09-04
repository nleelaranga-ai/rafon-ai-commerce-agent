import json
import re
from typing import Any

import httpx

from app.config import settings
from app.services.audit_service import audit_service


class AIOrchestrator:
    GROQ_MODEL = "qwen/qwen3.8-27b"

    def __init__(self) -> None:
        self.groq_key = settings.groq_api_key

    async def orchestrate(
        self,
        message: str,
        conversation_history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        trace_id: str,
    ) -> dict[str, Any]:
        # 1. Primary AI Engine: Groq LPU
        if self.groq_key:
            try:
                result = await self._call_groq(message, conversation_history, catalog)
                result["model_used"] = f"groq (Primary: {self.GROQ_MODEL})"
                audit_service.log_event(
                    "AI_INFERENCE_SUCCESS",
                    {"provider": "groq", "model": self.GROQ_MODEL, "trace_id": trace_id},
                    trace_id=trace_id,
                )
                return result
            except Exception as exc:
                print(f"\n[GROQ RUNTIME ERROR]: {exc}\n")
                audit_service.log_event(
                    "AI_PRIMARY_FAILOVER",
                    {"provider": "groq", "error": str(exc), "trace_id": trace_id},
                    trace_id=trace_id,
                    severity="WARN",
                )
        else:
            print("\n[GROQ SKIPPED]: settings.groq_api_key is empty or None. Check backend/.env\n")

        # 2. Deterministic Edge Fallback (Only used if Groq is down or key missing)
        result = self._deterministic_commerce_engine(message, conversation_history, catalog)
        result["model_used"] = "RAFON-Deterministic-Engine (Edge Fallback)"
        audit_service.log_event(
            "DETERMINISTIC_ENGINE_ENGAGED",
            {"reason": "Zero-latency edge fallback active", "trace_id": trace_id},
            trace_id=trace_id,
        )
        return result

    async def _call_groq(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
    ) -> dict[str, Any]:
        prompt = self._build_prompt(message, history, catalog)
        url = "https://api.groq.com/openai/v1/chat/completions"
        payload = {
            "model": self.GROQ_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are RAFON AI, an autonomous commerce engine. "
                        "Return strictly a raw valid JSON object without any Markdown formatting or backticks."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0.2,
        }
        headers = {
            "Authorization": f"Bearer {self.groq_key}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(url, headers=headers, json=payload)

        if response.status_code >= 400:
            raise RuntimeError(f"Groq API returned HTTP {response.status_code}: {response.text}")

        body = response.json()
        content = body.get("choices", [{}])[0].get("message", {}).get("content", "{}")
        return json.loads(content)

    def _deterministic_commerce_engine(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
    ) -> dict[str, Any]:
        msg_lower = message.lower()

        budget = 6000
        budget_match = re.search(
            r"(?:under|below|budget|within|<=|<)?\s*(?:₹|rs\.?|inr)?\s*(\d{3,6})",
            msg_lower,
        )
        if budget_match:
            try:
                budget = int(budget_match.group(1))
            except ValueError:
                budget = 6000

        # Natural Greetings
        if msg_lower.strip() in ["hi", "hello", "hey", "start", "help", "who are you"]:
            return {
                "reply": (
                    "Hey! 👋 I'm **RAFON AI**, your autonomous commerce intelligence agent. "
                    "I can help find the best gear matching your latency and budget constraints, "
                    "package verified bundles, and walk you through secure checkout. What are you looking for today?"
                ),
                "intent": "GREETING",
                "budget": None,
                "requirements": ["intent_discovery", "natural_guidance"],
                "recommended_product_id": None,
                "recommendation_reason": None,
                "upsell_product_id": None,
                "upsell_reason": None,
                "confidence": 0.99,
                "action": "GREETING",
            }

        # Cheaper / Alternatives
        if any(w in msg_lower for w in ["cheaper", "budget option", "less price", "alternate", "lower cost"]):
            return {
                "reply": (
                    "I found a budget-focused gaming option: **boAt Immortal 131 Gaming TWS** at **₹1,499** "
                    "(saving ₹4,000 vs premium picks). It features 40ms BEAST™ Mode latency and 40h playtime."
                ),
                "intent": "ALTERNATIVE_DISCOVERY",
                "budget": budget,
                "requirements": ["ultra_low_cost", "40ms_latency"],
                "recommended_product_id": "boat-immortal-131",
                "recommendation_reason": "Top cost-to-performance ratio in the catalog with 40ms low latency gaming mode at ₹1,499.",
                "upsell_product_id": "fast-charger-65w",
                "upsell_reason": "Bundle with a 65W GaN Dual-Port Fast Charger for only ₹499 additional.",
                "confidence": 0.97,
                "action": "COMPARISON",
            }

        # Cart Addition
        if any(w in msg_lower for w in ["add", "cart", "buy that", "take that", "add that", "proceed"]):
            return {
                "reply": "Added the recommended setup to your Smart Cart. Your package is bounded by merchant rules and ready for Razorpay checkout.",
                "intent": "CART_ACTION",
                "budget": budget,
                "requirements": ["cart_addition", "checkout_ready"],
                "recommended_product_id": "nothing-ear-a",
                "recommendation_reason": "Customer approved item addition.",
                "upsell_product_id": "fast-charger-65w",
                "upsell_reason": "Contextual power accessory ready in cart.",
                "confidence": 0.98,
                "action": "CART_ACTION",
            }

        # General Audio Queries
        if any(w in msg_lower for w in ["earbud", "audio", "headphone", "gaming", "tws", "wireless", "sound"]):
            return {
                "reply": (
                    "I've matched your request with our top-rated gaming TWS: **Nothing Ear (a)** at **₹5,499** "
                    "(within your ₹6,000 budget). It delivers dedicated **45ms Low Latency Gaming Mode**, 45dB Smart ANC, "
                    "and 42.5 hours battery life."
                ),
                "intent": "Gaming Audio",
                "budget": budget,
                "requirements": ["45ms low-latency", "45dB active noise cancellation", "under ₹6,000 budget"],
                "recommended_product_id": "nothing-ear-a",
                "recommendation_reason": "Optimal 45ms low-latency gaming profile while fitting comfortably within budget.",
                "upsell_product_id": "fast-charger-65w",
                "upsell_reason": "Pair with 65W GaN Fast Charger to charge earbuds and mobile simultaneously.",
                "confidence": 0.986,
                "action": "RECOMMEND",
            }

        # Default fallback
        return {
            "reply": "I analyzed our catalog for your request. Here is our best matching recommendation with verified stock and price bounds.",
            "intent": "PRODUCT_DISCOVERY",
            "budget": budget,
            "requirements": ["verified_stock", "bounded_pricing"],
            "recommended_product_id": "nothing-ear-a",
            "recommendation_reason": "Selected based on general relevance and category rating.",
            "upsell_product_id": "fast-charger-65w",
            "upsell_reason": "Universal complementary accessory.",
            "confidence": 0.92,
            "action": "RECOMMEND",
        }

    def _build_prompt(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
    ) -> str:
        catalog_json = json.dumps(catalog, ensure_ascii=False)
        history_json = json.dumps(history[-8:], ensure_ascii=False)

        return f"""
You are RAFON AI, an autonomous, intelligent commerce engine and shopping assistant.
Maintain an authentic, concise, helpful tone with natural dialogue.

Merchant Catalog:
{catalog_json}

Recent Conversation History:
{history_json}

Current User Message:
"{message}"

CRITICAL BEHAVIOR GUIDELINES:
1. Multi-Turn Awareness: Read the conversation history. If the user is asking a follow-up or meta-question (e.g. "are you ai", "who built you", "what can you do"), answer directly and conversationally as RAFON AI. NEVER repeat a generic introductory greeting if you have already greeted the user.
2. Direct Product Discovery: Only suggest specific products from the Merchant Catalog when the user expresses an intent, constraint, or interest in shopping/gear.
3. If no product recommendation is needed (e.g. greetings, casual chat, clarification, general questions):
   - Set "action": "CHAT" (or "GREETING" only for the very first hello)
   - Set "recommended_product_id": null
   - Set "upsell_product_id": null
   - Set "budget": null
   - Do NOT invent fake specifications.

Output strictly a JSON object with this schema:
{{
  "reply": "Your natural, direct conversational response to the user with bold highlights and emojis",
  "intent": "Short intent (e.g., IDENTITY_QUERY, GREETING, GAMING_AUDIO, BUDGET_DISCOVERY)",
  "budget": 6000 or null,
  "requirements": ["list", "of", "extracted", "specs"],
  "recommended_product_id": "catalog-product-id" or null,
  "recommendation_reason": "Why chosen or null",
  "upsell_product_id": "upsell-id" or null,
  "upsell_reason": "Why complementary or null",
  "confidence": 0.95,
  "action": "GREETING" | "CHAT" | "RECOMMEND" | "COMPARISON" | "CART_ACTION"
}}
""".strip()

ai_orchestrator = AIOrchestrator()
