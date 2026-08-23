"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import DemoPaymentPanel from "@/components/checkout/DemoPaymentPanel";
import PaymentMethod from "@/components/checkout/PaymentMethod";

export default function CheckoutPage() {
  const router = useRouter();

  const [method, setMethod] = useState("upi");

  const total = 5298;

  return (
    <AppShell
      title="Razorpay Checkout"
      subtitle="Secure payment experience · Test Mode"
    >
      <main className="min-h-screen bg-[#06080f] px-5 py-7 text-white lg:px-8 lg:py-9">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Smart Cart
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              <CreditCard size={14} />
              Payment
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Complete your payment.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              RAFON has completed the shopping intelligence layer. The
              customer is now at the Razorpay payment boundary.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <section className="space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center gap-2">
                  <LockKeyhole
                    size={17}
                    className="text-emerald-300"
                  />

                  <h2 className="text-lg font-black">
                    Select payment method
                  </h2>
                </div>

                <div className="mt-5">
                  <PaymentMethod
                    active={method}
                    onSelect={setMethod}
                  />
                </div>
              </div>

              <DemoPaymentPanel
                onSuccess={() => router.push("/success")}
                onFailure={() => router.push("/failure")}
              />
            </section>

            <aside className="h-fit">
              <CheckoutSummary total={total} />
            </aside>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
