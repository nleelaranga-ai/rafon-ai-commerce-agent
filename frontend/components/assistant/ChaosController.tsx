"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Flame,
  LayoutDashboard,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";

interface ChaosControllerProps {
  onCleanCheckout: () => void;
  onSimulate504Timeout: () => void;
  isMerchantView: boolean;
  onToggleMerchantView: () => void;
}

export default function ChaosController({
  onCleanCheckout,
  onSimulate504Timeout,
  isMerchantView,
  onToggleMerchantView,
}: ChaosControllerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-400/30 bg-[#090e1c]/90 px-4 py-2.5 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 font-mono">
          Demo Control Deck
        </span>
        <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono">
          | Track 01 Agentic Commerce
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Clean checkout */}
        <button
          type="button"
          onClick={onCleanCheckout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400/20 active:scale-95"
          title="Run normal Razorpay test checkout flow"
        >
          <CheckCircle2 size={13} />
          <span>Clean Checkout</span>
        </button>

        {/* 504 Chaos Failure */}
        <button
          type="button"
          onClick={onSimulate504Timeout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-300 transition hover:bg-rose-500/25 active:scale-95 shadow-sm shadow-rose-500/20"
          title="Simulate a 504 bank gateway dropout to trigger Recovery Agent"
        >
          <AlertTriangle size={13} className="animate-bounce" />
          <span>Simulate 504 Bank Dropout</span>
        </button>

        {/* Merchant View Toggle */}
        <button
          type="button"
          onClick={onToggleMerchantView}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
            isMerchantView
              ? "border-cyan-400 bg-cyan-400 text-slate-950 font-black"
              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          <LayoutDashboard size={13} />
          <span>{isMerchantView ? "Customer Mode" : "Merchant View"}</span>
        </button>
      </div>
    </div>
  );
}
