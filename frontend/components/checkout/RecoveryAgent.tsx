"use client";

import {
  AlertTriangle,
  Clock3,
  Copy,
  ExternalLink,
  LifeBuoy,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function RecoveryAgent() {
  const [seconds, setSeconds] = useState(899);
  const [rescued, setRescued] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 0) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
      <section className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.035] p-7 sm:p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-300">
          <AlertTriangle size={31} />
        </div>

        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            Payment interrupted
          </div>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            RAFON started recovery.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            The payment attempt timed out. Instead of simply returning an
            error, RAFON has started a bounded recovery workflow.
          </p>
        </div>

        <div className="mt-7 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={17} className="text-cyan-300" />

            <span className="text-sm font-black">
              Autonomous Cart Recovery Agent
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <RecoveryStep
              number="01"
              title="Inventory lock"
              value="15 min"
              active
            />

            <RecoveryStep
              number="02"
              title="Rescue token"
              value="RESCUE-5"
              active
            />

            <RecoveryStep
              number="03"
              title="Fallback UPI"
              value="Ready"
              active
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-5">
          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-amber-300" />

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cart reservation remaining
            </span>
          </div>

          <div className="mt-4 font-mono text-4xl font-black tracking-tight">
            {minutes}:{remainingSeconds}
          </div>

          <div className="mt-2 text-xs text-slate-600">
            The agent will stop recovery when the reservation expires.
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-rose-400/10 bg-rose-400/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
            <LifeBuoy size={15} />
            Payment failure reason
          </div>

          <p className="mt-2 text-sm text-slate-300">
            Simulated bank timeout during payment confirmation.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setRescued(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-5 py-3.5 text-sm font-black text-slate-950"
          >
            <RefreshCw size={16} />
            Retry with UPI
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white"
          >
            <Copy size={15} />
            Copy Rescue Token
          </button>
        </div>

        {rescued && (
          <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4 text-xs font-semibold text-emerald-300">
            Recovery action initiated. Fallback payment route is ready.
          </div>
        )}
      </section>

      <aside className="space-y-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-emerald-300" />
            <h2 className="font-black">
              Recovery guardrails
            </h2>
          </div>

          <div className="mt-5 space-y-3">
            <Guardrail
              label="Maximum discount"
              value="5%"
            />

            <Guardrail
              label="Inventory hold"
              value="15 minutes"
            />

            <Guardrail
              label="Action"
              value="Retry only"
            />

            <Guardrail
              label="Escalation"
              value="Stop on expiry"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-blue-400/10 bg-blue-400/[0.035] p-6">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300">
            Fallback payment
          </div>

          <h3 className="mt-2 text-lg font-black">
            One-tap UPI recovery
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            The recovery action uses a bounded payment retry rather than
            repeatedly charging the customer.
          </p>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-cyan-300"
          >
            Open fallback flow
            <ExternalLink size={13} />
          </button>
        </div>
      </aside>
    </div>
  );
}

function RecoveryStep({
  number,
  title,
  value,
  active = false,
}: {
  number: string;
  title: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-black/10 p-4">
      <div className="text-[9px] font-black uppercase tracking-wider text-slate-600">
        {number}
      </div>

      <div className="mt-2 text-xs font-semibold text-slate-300">
        {title}
      </div>

      <div
        className={[
          "mt-2 text-sm font-black",
          active ? "text-cyan-300" : "text-slate-600",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
}

function Guardrail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-bold text-slate-300">{value}</span>
    </div>
  );
}
