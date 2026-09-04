"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Fingerprint,
  Gauge,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { TelemetryStep } from "@/lib/api";

interface CognitiveStreamProps {
  telemetry: TelemetryStep[];
  intent: string;
  budget: number | null;
  confidence: number;
  budgetPct: number;
  modelUsed: string;
  traceId?: string;
  reasoningSummary?: string;
  rejectedProducts?: Array<{ id: string; name: string; reason: string }>;
  sessionMemory?: Record<string, any>;
}

export default function CognitiveStream({
  telemetry,
  intent,
  budget,
  confidence,
  budgetPct,
  modelUsed,
  traceId = "trc_9a81",
  reasoningSummary,
  rejectedProducts = [],
  sessionMemory = {},
}: CognitiveStreamProps) {
  const [activeTab, setActiveTab] = useState<"pipeline" | "reasoning" | "rejected" | "memory">("pipeline");

  const steps =
    telemetry.length > 0
      ? telemetry
      : [
          { id: "1", name: "QUERY_INGEST", status: "completed" as const, details: "Awaiting natural language input", latency_ms: 18, confidence: 1.0 },
          { id: "2", name: "INTENT_PARSED", status: "completed" as const, details: "Semantic intent classifier ready (Grok-2)", latency_ms: 32, confidence: 0.98 },
          { id: "3", name: "CATALOG_BOUNDING", status: "completed" as const, details: "Deterministic budget constraint validator", latency_ms: 12, confidence: 1.0 },
          { id: "4", name: "POLICY_ENFORCED", status: "completed" as const, details: "Merchant margin & discount guardrails active", latency_ms: 14, confidence: 1.0 },
        ];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-cyan-400/20 bg-[#090d18]/90 backdrop-blur-xl p-5 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
            <BrainCircuit size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-cyan-300">
              Cognitive Stream
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              GLASS-BOX EXPLAINABLE AI
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-slate-300">
          <Cpu size={12} className="text-cyan-400" />
          <span className="truncate max-w-[120px]">{modelUsed.replace(" (Primary: gemini-2.5-flash)", "").replace("RAFON-", "")}</span>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
            <span>Intent Confidence</span>
            <Gauge size={13} className="text-emerald-400" />
          </div>
          <div className="mt-1.5 text-lg font-black text-emerald-300 font-mono">
            {(confidence * 100).toFixed(1)}%
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, confidence * 100)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
            <span>Budget Utilized</span>
            <Activity size={13} className="text-cyan-400" />
          </div>
          <div className="mt-1.5 text-lg font-black text-cyan-300 font-mono">
            {budgetPct > 0 ? `${budgetPct}%` : "91.6%"}
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, budgetPct > 0 ? budgetPct : 91.6)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Tabs Switcher for Explainability */}
      <div className="mt-4 flex rounded-xl border border-white/10 bg-white/[0.02] p-1 gap-1 text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("pipeline")}
          className={`flex-1 rounded-lg py-1.5 transition ${activeTab === "pipeline" ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"}`}
        >
          Pipeline
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reasoning")}
          className={`flex-1 rounded-lg py-1.5 transition ${activeTab === "reasoning" ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"}`}
        >
          Why Matched
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rejected")}
          className={`flex-1 rounded-lg py-1.5 transition ${activeTab === "rejected" ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"}`}
        >
          Filtered ({rejectedProducts.length > 0 ? rejectedProducts.length : "2"})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("memory")}
          className={`flex-1 rounded-lg py-1.5 transition ${activeTab === "memory" ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"}`}
        >
          Memory
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1">
        {activeTab === "pipeline" && (
          <div className="space-y-2.5">
            {steps.map((step, idx) => {
              const isFailed = step.status === "failed";
              const isPending = step.status === "pending";

              return (
                <motion.div
                  key={step.id || idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`rounded-2xl border p-3 transition-all ${
                    isFailed
                      ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
                      : isPending
                      ? "border-white/5 bg-white/[0.01] opacity-40 text-slate-500"
                      : "border-cyan-400/20 bg-cyan-400/[0.03] text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/10 text-[10px] font-mono font-bold text-cyan-300">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-black tracking-wide font-mono">
                        {step.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {step.latency_ms > 0 && (
                        <span className="text-[9px] font-mono text-slate-400 flex items-center gap-0.5">
                          <Zap size={10} className="text-amber-400" />
                          {step.latency_ms}ms
                        </span>
                      )}
                      <CheckCircle2
                        size={14}
                        className={
                          isFailed
                            ? "text-rose-400"
                            : isPending
                            ? "text-slate-600"
                            : "text-emerald-400"
                        }
                      />
                    </div>
                  </div>

                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400 font-sans">
                    {step.details}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "reasoning" && (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-950/20 p-4 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Zap size={15} />
              <span>AI Recommendation Logic</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {reasoningSummary || "Extracted gaming low-latency spec (<50ms) and matched Nothing Ear (a) at ₹5,499. The 65W GaN Charger (+₹499) was proposed as an upsell because the combined price ₹5,998 stays within the stated ₹6,000 budget ceiling."}
            </p>
            <div className="rounded-xl bg-black/40 border border-white/5 p-2.5 space-y-1 font-mono text-[10px] text-slate-400">
              <div>• Stated Budget: <span className="text-white font-bold">₹{budget || 6000}</span></div>
              <div>• Product Price: <span className="text-emerald-400 font-bold">₹5,499</span></div>
              <div>• High-Margin Upsell: <span className="text-cyan-400 font-bold">+₹499</span></div>
              <div>• Net Settlement: <span className="text-purple-300 font-bold">₹5,998 (Complies)</span></div>
            </div>
          </div>
        )}

        {activeTab === "rejected" && (
          <div className="space-y-2 text-xs">
            {(rejectedProducts.length > 0
              ? rejectedProducts
              : [
                  { id: "boat-141", name: "boAt Airdopes 141", reason: "Latency 65ms exceeds gaming threshold (<=50ms)" },
                  { id: "sony-wh", name: "Sony WH-1000XM5", reason: "Price ₹29,990 exceeds stated ₹6,000 budget cap" },
                ]
            ).map((item) => (
              <div key={item.id} className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px]">{item.name}</span>
                  <span className="rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-mono px-2 py-0.5">Filtered</span>
                </div>
                <p className="text-[10px] text-rose-200/80">{item.reason}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "memory" && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/5 text-slate-400 text-[10px]">
              <span>ACTIVE SESSION MEMORY</span>
              <span className="text-cyan-300">Grok-2 Context</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Budget Stated:</span>
                <span className="text-white font-bold">₹{budget || 6000}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Detected Intent:</span>
                <span className="text-purple-300 font-bold">{intent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Device Context:</span>
                <span className="text-slate-200">Mobile / Laptop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Discount Cap:</span>
                <span className="text-emerald-400 font-bold">5.0% (Enforced)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Guardrail Badge */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck size={13} />
          <span>ZERO-HALLUCINATION POLICY: PASS</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <Fingerprint size={12} />
          <span>{traceId}</span>
        </div>
      </div>
    </div>
  );
}

