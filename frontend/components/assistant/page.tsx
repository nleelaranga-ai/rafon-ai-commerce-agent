"use client";

import { useState } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  ShoppingBag,
} from "lucide-react";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import ChatWindow from "@/components/assistant/ChatWindow";

export default function AssistantPage() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <AppShell
      title="AI Shopping Assistant"
      subtitle="Understand intent → recommend → upsell → checkout"
    >
      <div className="relative min-h-screen overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 rounded-full bg-cyan-400/5 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                <BrainCircuit size={14} />
                Agentic shopper
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Understand the shopper.
                <br className="hidden sm:block" />
                Then grow the basket.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                This demo currently uses the featured Razorpay buildathon
                journey. Later, the same UI will call the FastAPI + Gemini
                recommendation engine.
              </p>
            </div>

            <Link
              href="/cart"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <ShoppingBag size={16} />
              Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <ChatWindow
            onAddToCart={() => setCartCount((count) => count + 1)}
          />

          <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5">
              Intent extraction
            </span>

            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5">
              Product ranking
            </span>

            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5">
              Explainable recommendation
            </span>

            <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5">
              Bounded upsell
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
