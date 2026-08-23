"use client";

import ChatWindow from "@/components/assistant/ChatWindow";
import AppShell from "@/components/layout/AppShell";

export default function AssistantPage() {
  return (
    <AppShell
      title="AI Shopping Assistant"
      subtitle="Understand intent → recommend → upsell → checkout"
    >
      <div className="min-h-screen bg-[#06080f] px-5 py-8 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Agentic Shopper
            </div>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Understand the shopper.
              <br />
              Then grow the basket.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              RAFON AI understands customer intent, ranks products,
              explains recommendations and prepares the commerce journey.
            </p>
          </div>

          <ChatWindow
  onAddToCart={() => {
    window.location.href = "/recommendations";
  }}
/>
        </div>
      </div>
    </AppShell>
  );
}
