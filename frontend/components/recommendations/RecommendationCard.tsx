"use client";

import {
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

interface RecommendationCardProps {
  rank: number;
  name: string;
  price: number;
  originalPrice: number;
  match: string;
  description: string;
  specs: string[];
  featured?: boolean;
  onAdd: () => void;
}

export default function RecommendationCard({
  rank,
  name,
  price,
  originalPrice,
  match,
  description,
  specs,
  featured = false,
  onAdd,
}: RecommendationCardProps) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl border p-5 transition duration-300",
        featured
          ? "border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.07] via-emerald-400/[0.03] to-transparent shadow-[0_0_40px_rgba(0,242,254,0.06)]"
          : "border-white/10 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04]",
      ].join(" ")}
    >
      {featured && (
        <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
          <Sparkles size={12} />
          Top Pick
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-3xl">
          🎧
        </div>

        <div className="flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-black text-cyan-300">
          {match}
          <span className="font-medium text-slate-500">match</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          Recommendation #{rank}
        </div>

        <h3 className="mt-2 text-xl font-black text-white">{name}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {specs.map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] text-slate-400"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-black">
              ₹{price.toLocaleString("en-IN")}
            </div>

            <div className="text-xs text-slate-600 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </div>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-100"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/5 bg-black/10 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <CheckCircle2 size={14} className="text-emerald-300" />
          Why RAFON selected it
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          {featured
            ? "Best overall match for the customer's gaming, latency and budget constraints."
            : "Strong alternative based on the detected shopping intent and price constraint."}
        </p>

        <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300">
          View reasoning
          <ArrowRight size={11} />
        </div>
      </div>
    </div>
  );
}
