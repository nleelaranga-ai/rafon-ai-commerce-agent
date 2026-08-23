import {
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

interface ProductRecommendationProps {
  onAddToCart: () => void;
}

export default function ProductRecommendation({
  onAddToCart,
}: ProductRecommendationProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.06] to-emerald-400/[0.04]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-cyan-300" />
          <span className="text-xs font-bold text-cyan-300">
            RAFON TOP PICK
          </span>
        </div>

        <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
          98.6% MATCH
        </span>
      </div>

      <div className="p-5">
        <div className="grid gap-5 sm:grid-cols-[110px_1fr]">
          <div className="flex h-[110px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]">
            <div className="text-4xl">🎧</div>
          </div>

          <div>
            <div className="text-lg font-black">
              Nothing Ear (a)
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Black Edition · Low-Latency Gaming Mode
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                45ms latency
              </span>

              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                45dB ANC
              </span>

              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                42.5h battery
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <div className="text-2xl font-black">
                  ₹5,499
                </div>

                <div className="text-xs text-slate-600 line-through">
                  ₹7,999
                </div>
              </div>

              <button
                type="button"
                onClick={onAddToCart}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-100"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <CheckCircle2 size={14} />
            Why RAFON selected this
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Best match for your gaming requirement because the product
            satisfies the low-latency constraint while staying below your
            ₹6,000 budget.
          </p>

          <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-cyan-300">
            See full recommendation logic
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
