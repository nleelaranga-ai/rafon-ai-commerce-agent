"use client";

import CommandCenter from "@/components/assistant/CommandCenter";
import AppShell from "@/components/layout/AppShell";

export default function AssistantPage() {
  return (
    <AppShell
      title="Autonomous Commerce Command Center"
      subtitle="Track 01 — AI Growth & Agentic Commerce · Razorpay AI Buildathon"
    >
      <main className="min-h-screen bg-[#06080f] px-4 py-6 text-white lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <CommandCenter />
        </div>
      </main>
    </AppShell>
  );
}

