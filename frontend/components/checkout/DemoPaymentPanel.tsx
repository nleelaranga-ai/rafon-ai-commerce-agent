"use client";

import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

interface DemoPaymentPanelProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export default function DemoPaymentPanel({
  onSuccess,
  onFailure,
}: DemoPaymentPanelProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Razorpay
          </div>

          <h2 className="mt-1 text-xl font-black">
            Test Mode Checkout
          </h2>
        </div>

        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
          TEST
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#071526] p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            RAFON AI Order
          </span>

          <span className="font-mono text-[10px] text-slate-600">
            order_RAFON_001
          </span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
            <CreditCard className="text-blue-300" size={20} />
          </div>

          <div>
            <div className="text-sm font-bold text-white">
              Secure payment
            </div>

            <div className="mt-1 text-[10px] text-slate-500">
              Razorpay Test Mode
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <button
          type="button"
          onClick={onSuccess}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
        >
          <CheckCircle2 size={16} />
          Demo Success Payment
        </button>

        <button
          type="button"
          onClick={onFailure}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/15 bg-rose-400/[0.04] px-5 py-3.5 text-sm font-bold text-rose-300 transition hover:bg-rose-400/[0.08]"
        >
          <AlertTriangle size={16} />
          Demo Failed Payment
        </button>
      </div>

      <div className="mt-5 flex items-start gap-2 text-[10px] leading-5 text-slate-600">
        <ShieldCheck size={13} className="mt-0.5 shrink-0" />
        <span>
          These controls simulate the success and failure states for the
          buildathon demo. Real Razorpay order creation and verification
          will move to the FastAPI backend.
        </span>
      </div>
    </div>
  );
}
