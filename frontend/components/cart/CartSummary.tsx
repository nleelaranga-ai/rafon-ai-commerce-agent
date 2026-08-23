import { ArrowRight, ShieldCheck } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({
  subtotal,
  discount,
  total,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Order Summary</h2>

        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          <ShieldCheck size={13} />
          Protected
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="text-slate-300">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-slate-500">
          <span>RAFON bundle discount</span>
          <span className="font-semibold text-emerald-300">
            -₹{discount.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between">
            <span className="font-semibold text-slate-300">
              Total
            </span>

            <span className="text-3xl font-black">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-5 py-3.5 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
      >
        Proceed to Razorpay Checkout
        <ArrowRight size={17} />
      </button>

      <p className="mt-3 text-center text-[10px] leading-5 text-slate-600">
        Payment will use Razorpay Test Mode during the buildathon demo.
      </p>
    </div>
  );
}
