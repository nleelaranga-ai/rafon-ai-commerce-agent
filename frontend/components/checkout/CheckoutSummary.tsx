import { ShieldCheck, ShoppingBag } from "lucide-react";

interface CheckoutSummaryProps {
  total: number;
}

export default function CheckoutSummary({
  total,
}: CheckoutSummaryProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
      <div className="flex items-center gap-2">
        <ShoppingBag size={17} className="text-cyan-300" />
        <h2 className="text-lg font-black">Order Summary</h2>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm text-slate-500">
          <span>Nothing Ear (a)</span>
          <span className="text-slate-300">₹5,499</span>
        </div>

        <div className="flex justify-between text-sm text-slate-500">
          <span>65W GaN Charger</span>
          <span className="text-slate-300">₹499</span>
        </div>

        <div className="flex justify-between text-sm text-emerald-300">
          <span>RAFON bundle discount</span>
          <span>-₹700</span>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-end justify-between">
            <span className="font-semibold text-slate-300">
              Total payable
            </span>

            <span className="text-3xl font-black">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-3">
        <ShieldCheck
          size={15}
          className="mt-0.5 shrink-0 text-emerald-300"
        />

        <p className="text-[10px] leading-5 text-slate-500">
          Payment processing will use Razorpay Test Mode. No real money
          will be charged during the demo.
        </p>
      </div>
    </div>
  );
}
