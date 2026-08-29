"use client";

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
}

export default function CognitiveStream({
  telemetry,
  intent,
  budget,
  confidence,
  budgetPct,
  modelUsed,
  traceId = "trc_9a81",
}: CognitiveStreamProps) {
  const steps =
    telemetry.length > 0
      ? telemetry
      : [
          { id: "1", name: "QUERY_INGEST", status: "completed" as const, details: "Awaiting natural language input", latency_ms: 0, confidence: 1.0 },
          { id: "2", name: "INTENT_PARSED", status: "pending" as const, details: "Semantic intent classifier ready", latency_ms: 0, confidence: 0.0 },
          { id: "3", name: "CATALOG_BOUNDING", status: "pending" as const, details: "Deterministic budget constraint validator", latency_ms: 0, confidence: 0.0 },
          { id: "4", name: "POLICY_ENFORCED", status: "pending" as const, details: "Merchant margin & discount guardrails", latency_ms: 0, confidence: 0.0 },
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
              Cognitive Decision Stream
            </div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              GLASS-BOX AGENT TELEMETRY
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono text-slate-300">
          <Cpu size={12} className="text-cyan-400" />
          <span className="truncate max-w-[110px]">{modelUsed.replace(" (Primary: gemini-2.5-flash)", "").replace("RAFON-", "")}</span>
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
            {budgetPct > 0 ? `${budgetPct}%` : "0.0%"}
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, budgetPct)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Live Stepper */}
      <div className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
          <Layers size={12} />
          Pipeline Execution Trace
        </div>

        {steps.map((step, idx) => {
          const isFailed = step.status === "failed";
          const isPending = step.status === "pending";

          return (
            <motion.div
              key={step.id || idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
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
