"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  CreditCard,
  Gift,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { RecoveryOffer } from "@/lib/api";

interface RecoveryDrawerProps {
  offer: RecoveryOffer;
  onClose: () => void;
  onRetrySuccess: () => void;
}

export default function RecoveryDrawer({
  offer,
  onClose,
  onRetrySuccess,
}: RecoveryDrawerProps) {
  const [secondsLeft, setSecondsLeft] = useState(offer.hold_duration_minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-b from-[#11192e] to-[#080d1a] p-6 text-white shadow-2xl relative"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-300">
            <AlertTriangle size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 font-mono">
                Autonomous Recovery Agent
              </span>
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-mono font-bold text-amber-300">
                ACTIVE
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight mt-0.5">
              Payment Interruption Detected
            </h2>
          </div>
        </div>

        {/* Details Card */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-300">
          <div className="font-mono text-[11px] text-amber-300 font-bold mb-1">
            POLICY RULE: {offer.policy_code}
          </div>
          {offer.reason}
        </div>

        {/* 2-Column Incentives */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* Inventory Hold Clock */}
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.05] p-3.5 text-center">
            <div className="text-[10px] uppercase font-bold text-cyan-300 flex items-center justify-center gap-1">
              <Clock size={13} />
              Inventory Lock
            </div>
            <div className="mt-1 text-2xl font-black font-mono text-white tracking-widest">
              {timeFormatted}
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5">
              Your items are reserved
            </div>
          </div>

          {/* Rescue Discount */}
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.05] p-3.5 text-center">
            <div className="text-[10px] uppercase font-bold text-emerald-300 flex items-center justify-center gap-1">
              <Gift size={13} />
              Rescue Discount
            </div>
            <div className="mt-1 text-2xl font-black font-mono text-emerald-300">
              {offer.discount_percentage}% OFF
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5">
              Coupon: <span className="font-mono font-bold text-emerald-300">{offer.rescue_code}</span>
            </div>
          </div>
        </div>

        {/* Revised Total calculation */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Original Package:</span>
            <span className="line-through">₹5,998</span>
          </div>
          <div className="flex items-center justify-between text-xs text-emerald-400 mt-1">
            <span>Rescue Incentive Applied:</span>
            <span>- ₹{offer.discount_amount}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-200">Revised Checkout Amount:</span>
            <span className="text-xl font-black font-mono text-cyan-300">₹{offer.revised_total}</span>
          </div>
        </div>

        {/* Route recommendation */}
        <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-300 font-mono">
          <Sparkles size={14} className="text-cyan-300" />
          <span>Recommended Route: <strong>{offer.recommended_payment_method}</strong></span>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onRetrySuccess}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 py-3.5 text-sm font-black text-slate-950 transition hover:scale-[1.02] active:scale-98 shadow-xl shadow-cyan-400/25"
          >
            <RefreshCw size={16} />
            Complete Payment (₹{offer.revised_total})
          </button>
        </div>

        <div className="mt-3 text-center text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>Cryptographic trace: {offer.audit_trace_id}</span>
        </div>
      </motion.div>
    </div>
  );
}
