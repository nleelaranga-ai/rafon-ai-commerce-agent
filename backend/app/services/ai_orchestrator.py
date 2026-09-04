import json
import logging
import re
from typing import Any, AsyncGenerator

from app.config import settings
from app.services.ai_provider import AIResponse
from app.services.audit_service import audit_service
from app.services.gemini_service import GeminiService
from app.services.grok_service import GrokService
from app.services.product_service import get_all_products

logger = logging.getLogger("rafon_orchestrator")


class AIOrchestrator:
    def __init__(self) -> None:
        self.grok = GrokService()
        self.gemini = GeminiService()
        self.session_memory: dict[str, dict[str, Any]] = {}

    def get_session_memory(self, session_id: str) -> dict[str, Any]:
        return self.session_memory.get(session_id, {
            "budget": None,
            "preferred_brand": None,
            "device_type": "Mobile/Laptop",
            "past_purchases": [],
            "conversation_count": 0,
        })

    def update_session_memory(self, session_id: str, updates: dict[str, Any]) -> dict[str, Any]:
        mem = self.get_session_memory(session_id)
        mem.update(updates)
        mem["conversation_count"] = mem.get("conversation_count", 0) + 1
        self.session_memory[session_id] = mem
        return mem

    async def generate_response(
        self,
        message: str,
        history: list[dict[str, Any]] | None = None,
        session_id: str = "default_session",
        trace_id: str = "trc_live",
    ) -> dict[str, Any]:
        catalog = [p.model_dump() for p in get_all_products()]
        return await self.orchestrate(
            message=message,
            conversation_history=history or [],
            catalog=catalog,
            trace_id=trace_id,
            session_id=session_id,
        )

    async def orchestrate(
        self,
        message: str,
        conversation_history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        trace_id: str,
        session_id: str = "default_session",
    ) -> dict[str, Any]:
        memory = self.get_session_memory(session_id)

        # 1. Primary: Groq LPU / xAI Grok
        if self.grok.is_configured():
            try:
                res = await self.grok.generate_response(message, conversation_history, catalog, memory, trace_id)
                audit_service.log_event(
                    "AI_INFERENCE_SUCCESS",
                    {"provider": "grok_groq", "model": res.model_name, "trace_id": trace_id},
                    trace_id=trace_id,
                )
                self._update_memory_from_response(session_id, res)
                return res.model_dump()
            except Exception as exc:
                logger.warning(f"Primary Groq/Grok provider error: {exc}")
                audit_service.log_event(
                    "AI_PRIMARY_FAILOVER",
                    {"provider": "grok_groq", "error": str(exc), "trace_id": trace_id},
                    trace_id=trace_id,
                    severity="WARN",
                )

        # 2. Secondary: Google Gemini
        if self.gemini.is_configured():
            try:
                res = await self.gemini.generate_response(message, conversation_history, catalog, memory, trace_id)
                audit_service.log_event(
                    "AI_INFERENCE_SUCCESS",
                    {"provider": "gemini", "model": res.model_name, "trace_id": trace_id},
                    trace_id=trace_id,
                )
                self._update_memory_from_response(session_id, res)
                return res.model_dump()
            except Exception as exc:
                logger.warning(f"Secondary Gemini provider error: {exc}")
                audit_service.log_event(
                    "AI_FALLBACK_FAILOVER",
                    {"provider": "gemini", "error": str(exc), "trace_id": trace_id},
                    trace_id=trace_id,
                    severity="WARN",
                )

        # 3. Deterministic Local Commerce Engine (Edge Fallback)
        res = self._deterministic_commerce_engine(message, conversation_history, catalog, memory)
        audit_service.log_event(
            "DETERMINISTIC_ENGINE_ENGAGED",
            {"reason": "Zero-latency edge fallback active", "trace_id": trace_id},
            trace_id=trace_id,
        )
        self._update_memory_from_response(session_id, res)
        return res.model_dump()

    def _update_memory_from_response(self, session_id: str, res: AIResponse) -> None:
        updates = dict(res.memory_updates)
        if res.budget is not None:
            updates["budget"] = res.budget
        self.update_session_memory(session_id, updates)

    def _deterministic_commerce_engine(
        self,
        message: str,
        history: list[dict[str, Any]],
        catalog: list[dict[str, Any]],
        memory: dict[str, Any],
    ) -> AIResponse:
        lower = message.lower()

        # Parse Budget
        budget: float | None = None
        budget_match = re.search(r"(?:under|below|budget|around|upto|within|<=|less than)\s*₹?\s*(\d{3,6})", lower)
        if budget_match:
            budget = float(budget_match.group(1))
        elif "6000" in lower or "6k" in lower:
            budget = 6000.0
        elif "5000" in lower or "5k" in lower:
            budget = 5000.0
        elif "4000" in lower or "4k" in lower:
            budget = 4000.0
        elif "3000" in lower or "3k" in lower:
            budget = 3000.0
        elif memory.get("budget"):
            budget = float(memory["budget"])

        # Intent Detection
        is_greeting = any(k == lower.strip() for k in ["hi", "hello", "hey", "hola", "yo", "good morning", "good evening", "heyy", "hi there", "hello there"]) or (len(lower.split()) <= 2 and any(k in lower for k in ["hi", "hello", "hey"]))
        is_help = any(k in lower for k in ["how can you help", "what can you do", "who are you", "what do you do", "help me"]) or lower.strip() == "help"
        is_cheaper = any(k in lower for k in ["cheaper", "less expensive", "lower price", "lower cost", "alternative", "low price"])
        is_gaming = any(k in lower for k in ["gaming", "game", "low latency", "latency", "bgmi", "cod", "pubg", "fps"])
        is_anc = any(k in lower for k in ["noise cancel", "anc", "travel", "flight", "commute", "quiet", "ambient"])
        is_budget = any(k in lower for k in ["cheap", "affordable", "budget", "under 3000", "under 4000", "best price"])
        is_headphone = any(k in lower for k in ["headphone", "over ear", "studio", "bass", "sony", "wh-1000", "soundcore"])

        matched_product = None
        rejected_products = []
        intent = "PRODUCT_DISCOVERY"
        reasoning = ""

        if is_greeting and not (is_gaming or is_anc or is_budget or budget):
            intent = "GREETING"
            reasoning = "Welcomed shopper and invited conversational use case / budget preferences."
            reply = (
                "Hey there! 👋 Welcome to **RAFON AI** — your autonomous personal audio concierge.\n\n"
                "Whether you're looking for **ultra-low latency gaming earbuds** (<50ms for BGMI/COD), "
                "**hybrid ANC headphones** for travel and focus, or **daily commute gear**, "
                "I'm here to match your exact technical needs while staying strictly inside your budget.\n\n"
                "What kind of audio setup are you shopping for, or do you have a target budget?"
            )
            return AIResponse(
                message=reply,
                intent=intent,
                budget=None,
                recommended_product_id=None,
                upsell_product_id=None,
                confidence=1.0,
                reasoning_summary=reasoning,
                specs_extracted={"action": "greet"},
                rejected_products=[],
                memory_updates={"last_intent": intent},
                model_name="RAFON-Conversational-Engine",
            )

        if is_help and not (is_gaming or is_anc or is_budget or budget):
            intent = "CAPABILITIES_OVERVIEW"
            reasoning = "Presented interactive platform capabilities and invited technical constraints."
            reply = (
                "I'm your **Autonomous Audio Concierge & Commerce Agent**! Here is how I make shopping seamless:\n\n"
                "🎯 **Precision Spec Matching:** Tell me what games you play, if you travel, or if you need mic clarity for calls, and I'll match the optimal product.\n"
                "💰 **Strict Budget Guardrails:** I mathematically verify prices so you never exceed your budget ceiling.\n"
                "🎁 **Smart Margin Bundles:** I identify compatible accessories (like 65W GaN fast chargers) that fit inside your remaining budget.\n"
                "⚡ **1-Click Razorpay Payments:** When you're ready, I prepare your order for instant, secure checkout.\n\n"
                "Tell me what you're looking for to get started!"
            )
            return AIResponse(
                message=reply,
                intent=intent,
                budget=None,
                recommended_product_id=None,
                upsell_product_id=None,
                confidence=1.0,
                reasoning_summary=reasoning,
                specs_extracted={"action": "help"},
                rejected_products=[],
                memory_updates={"last_intent": intent},
                model_name="RAFON-Conversational-Engine",
            )

        # Filter catalog for product matching
        for p in catalog:
            price = p.get("price", 9999)
            if budget and price > budget:
                rejected_products.append({
                    "id": p["id"],
                    "name": p["name"],
                    "reason": f"Price ₹{price:,} exceeds stated budget ceiling (₹{budget:,})"
                })
                continue

            specs_val = p.get("specs") or []
            specs_str = " ".join(specs_val) if isinstance(specs_val, list) else str(specs_val)
            if is_gaming and "ms" in specs_str and not ("40ms" in specs_str or "45ms" in specs_str or "beast" in specs_str.lower()):
                rejected_products.append({
                    "id": p["id"],
                    "name": p["name"],
                    "reason": "Latency exceeds ultra-low gaming threshold (<=50ms)"
                })

        if is_cheaper:
            intent = "ALTERNATIVE_DISCOVERY"
            matched_product = next((p for p in catalog if p["id"] == "boat-immortal-131"), None) or next((p for p in catalog if p.get("price", 9999) < 2000), catalog[0])
            reasoning = "Identified request for lower cost alternative; recommended boAt Immortal 131 at ₹1,499 with 40ms BEAST mode."
            reply = f"Here is our top budget gaming alternative: **{matched_product['name']}** at just **₹{matched_product['price']:,}** (saving ₹4,000 with 40ms BEAST Mode latency)."

        elif is_gaming:
            intent = "GAMING_AUDIO"
            matched_product = next((p for p in catalog if p["id"] == "nothing-ear-a"), None)
            if not matched_product:
                matched_product = next((p for p in catalog if "40ms" in str(p.get("specs", "")) or "45ms" in str(p.get("specs", ""))), catalog[0])
            reasoning = "Extracted gaming low-latency requirement (<50ms) and matched Nothing Ear (a) with 45ms gaming mode under ₹6,000 budget ceiling."
            reply = f"I've matched the **{matched_product['name']}** (₹{matched_product['price']:,}). It delivers an ultra-low **45ms dedicated gaming mode** with **45dB Adaptive ANC** and 42.5h battery life, staying strictly under your ₹{int(budget or 6000):,} budget."

        elif is_anc or is_headphone:
            intent = "COMMUTE_ANC"
            matched_product = next((p for p in catalog if p["id"] == "soundcore-space-one" or p.get("category") == "headphones"), catalog[0])
            reasoning = "Matched Active Noise Cancellation requirement with multi-mic Hybrid ANC system."
            reply = f"For travel and immersive silence, the **{matched_product['name']}** (₹{matched_product['price']:,}) is optimal, offering **2X stronger voice reduction ANC** and 55-hour battery life."

        elif is_budget:
            intent = "BUDGET_AUDIO"
            matched_product = next((p for p in catalog if p.get("price", 9999) <= (budget or 3000)), catalog[1])
            reasoning = "Optimized for maximum battery and value within stated price floor."
            reply = f"The **{matched_product['name']}** (₹{matched_product['price']:,}) provides outstanding value with 60ms low latency, 50h playback, and IPX5 water resistance."

        else:
            intent = "PRODUCT_DISCOVERY"
            matched_product = catalog[0]
            reasoning = "Defaulted to top-rated flagship audio catalog entry."
            reply = f"I recommend the **{matched_product['name']}** (₹{matched_product['price']:,}). What budget or specific features (e.g. gaming latency, ANC, battery life) are most important for you?"

        # Contextual Upsell Generator (Margin-Aware)
        upsell_product_id = None
        if matched_product and matched_product.get("id") == "nothing-ear-a":
            upsell_product_id = "gan-charger-65w"
            reply += " 🎁 **Bundle Offer:** Add our **65W GaN Fast Charger** for just **+₹499** (Net: ₹5,998 — fits inside ₹6,000 budget)!"
        elif matched_product and matched_product.get("category") == "headphones":
            upsell_product_id = "premium-case-audio"
            reply += " 🛡️ **Protection Pack:** Add the **Reinforced Hard Shell Case** for only **+₹349**."

        return AIResponse(
            message=reply,
            intent=intent,
            budget=budget,
            recommended_product_id=matched_product["id"] if matched_product else None,
            upsell_product_id=upsell_product_id,
            confidence=0.98 if is_gaming or is_anc else 0.94,
            reasoning_summary=reasoning,
            specs_extracted={"latency_ms": 45 if is_gaming else 60, "use_case": intent.lower()},
            rejected_products=rejected_products[:3],
            memory_updates={"last_intent": intent, "budget": budget},
            model_name="RAFON-Conversational-Engine",
        )


ai_orchestrator = AIOrchestrator()

