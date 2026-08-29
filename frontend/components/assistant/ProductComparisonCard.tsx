"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Flame, RefreshCw, Sparkles } from "lucide-react";
import { SpecComparison } from "@/lib/api";

interface ProductComparisonCardProps {
  comparison: SpecComparison;
  onSwitchProduct: (newProductId: string) => void;
}

export default function ProductComparisonCard({
  comparison,
  onSwitchProduct,
}: ProductComparisonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="mt-4 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-[#091224] to-[#060a14] p-4 text-white shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-cyan-300" />
          <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
            Autonomous Alternative Ranking
          </span>
        </div>
        <span className="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 font-mono">
          SAVE ₹{comparison.savings.toLocaleString()}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
          <div className="text-[10px] uppercase font-bold text-slate-500">Premium Choice</div>
          <div className="mt-1 font-bold text-slate-200">Nothing Ear (a)</div>
          <div className="mt-1 text-sm font-black text-white">₹5,499</div>
        </div>

        <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2.5 relative">
          <div className="absolute -top-2 right-2 rounded-full bg-cyan-400 px-1.5 py-0.2 text-[8px] font-black text-slate-950 uppercase">
            Budget King
          </div>
          <div className="text-[10px] uppercase font-bold text-cyan-300">Alternative</div>
          <div className="mt-1 font-bold text-white">boAt Immortal 131</div>
          <div className="mt-1 text-sm font-black text-emerald-300">₹1,499</div>
        </div>
      </div>

      <div className="mt-3 divide-y divide-white/5 rounded-xl border border-white/5 bg-black/20 p-2">
        {comparison.comparison_points.map((pt, idx) => (
          <div key={idx} className="grid grid-cols-3 py-1.5 text-[11px] items-center">
            <span className="text-slate-400 text-left font-medium">{pt.feature}</span>
            <span className="text-slate-300 text-center font-mono text-[10px]">{pt.primary}</span>
            <span className="text-cyan-300 text-right font-mono text-[10px] font-bold">{pt.alternative}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between pt-1">
        <div className="text-[10px] text-slate-400 flex items-center gap-1">
          <Flame size={12} className="text-amber-400" />
          <span>BEAST™ Mode 40ms ready</span>
        </div>

        <button
          type="button"
          onClick={() => onSwitchProduct(comparison.alternative_product_id)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-3.5 py-2 text-xs font-black text-slate-950 transition hover:scale-105 active:scale-95 shadow-md shadow-cyan-400/20"
        >
          <RefreshCw size={13} />
          Switch in Smart Cart
        </button>
      </div>
    </motion.div>
  );
}
