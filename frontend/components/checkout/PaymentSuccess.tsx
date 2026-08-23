"use client";

import {
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function PaymentSuccess() {
  const [copied, setCopied] = useState(false);

  const paymentId = "pay_RAFON8K2M7X1";
  const orderId = "order_RAFON_001";

  const copyPaymentId = async () => {
    try {
      await navigator.clipboard.writeText(paymentId);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
      <section className="rounded-3xl border border-emerald-400/15 bg-emerald-400/[0.035] p-7 sm:p-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
          <CheckCircle2 size={42} />
        </div>

        <div className="mt-7">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Payment verified
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Order confirmed.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            The Razorpay test payment was verified successfully. RAFON has
            recorded the transaction and moved the order into fulfillment.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <InfoCard label="Order ID" value={orderId} />

          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Payment ID
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="truncate font-mono text-xs text-slate-300">
                {paymentId}
              </span>

              <button
                type="button"
                onClick={copyPaymentId}
                className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                title="Copy payment ID"
              >
                <Copy size={14} />
              </button>
            </div>

            {copied && (
              <div className="mt-2 text-[10px] font-semibold text-emerald-300">
                Copied
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <MessageSquare size={16} className="text-cyan-300" />
            Automated order update
          </div>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            A customer notification has been queued with the order ID,
            payment confirmation and expected dispatch information.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2 text-[10px] font-bold text-emerald-300">
            ✓ Dispatch notification queued
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-5 py-3 text-sm font-black text-slate-950"
          >
            View Merchant Dashboard
            <ArrowRight size={16} />
          </a>

          <a
            href="/audit"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white"
          >
            View AI Audit
            <ExternalLink size={15} />
          </a>
        </div>
      </section>

      <aside className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={17} className="text-emerald-300" />

          <h2 className="font-black">
            Verified transaction
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          <StatusRow label="Razorpay order created" />
          <StatusRow label="Customer payment completed" />
          <StatusRow label="Payment signature verified" />
          <StatusRow label="Order status updated" />
          <StatusRow label="Audit event recorded" />
        </div>

        <div className="mt-7 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            Demo note
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            These IDs are currently simulated. Real Razorpay order creation
            and signature verification will be connected through FastAPI.
          </p>
        </div>
      </aside>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </div>
      <div className="mt-2 font-mono text-xs text-slate-300">{value}</div>
    </div>
  );
}

function StatusRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <CheckCircle2 size={15} className="text-emerald-300" />
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </div>
  );
}
