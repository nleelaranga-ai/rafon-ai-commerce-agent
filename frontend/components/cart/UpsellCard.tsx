"use client";

import {
  ArrowUpRight,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";

interface UpsellCardProps {
  onAdd: () => void;
}

export default function UpsellCard({ onAdd }: UpsellCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.08] via-cyan-400/[0.04] to-transparent">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-emerald-300" />

          <span className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            RAFON AI suggestion
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl">
            ⚡
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold">
              65W GaN Fast Charger
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              High-affinity accessory for the selected audio bundle.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                AI MATCH 96.2%
              </span>

              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                Bundle eligible
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-black/10 p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-600">
              Expected lift
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-300">
              <ArrowUpRight size={14} />
              +₹499
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/10 p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-600">
              Guardrail
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-cyan-300">
              <Check size={14} />
              Within budget
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
        >
          <Zap size={16} />
          Add AI Bundle
        </button>
      </div>
    </div>
  );
}
