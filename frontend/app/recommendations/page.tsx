"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BrainCircuit,
  Filter,
  ShoppingBag,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import RecommendationCard from "@/components/recommendations/RecommendationCard";

const recommendations = [
  {
    rank: 1,
    name: "Nothing Ear (a)",
    price: 5499,
    originalPrice: 7999,
    match: "98.6%",
    description:
      "Best fit for gaming thanks to low-latency mode, ANC and battery life while staying within the ₹6,000 budget.",
    specs: ["45ms latency", "45dB ANC", "42.5h battery"],
    featured: true,
  },
  {
    rank: 2,
    name: "Realme Buds Air 5 Pro",
    price: 4999,
    originalPrice: 6999,
    match: "94.4%",
    description:
      "Strong low-latency alternative with LDAC support and deeper ANC at a lower purchase price.",
    specs: ["40ms latency", "LDAC", "50dB ANC"],
  },
  {
    rank: 3,
    name: "boAt Immortal 131 Gaming",
    price: 1499,
    originalPrice: 3490,
    match: "92.1%",
    description:
      "Budget-focused gaming option with a dedicated low-latency mode and long battery life.",
    specs: ["40ms latency", "BEAST mode", "40h battery"],
  },
];

export default function RecommendationsPage() {
  const router = useRouter();

  const handleAddToCart = (productName: string) => {
    // Temporary frontend state transition.
    // Real cart persistence will be added next.
    console.log(`Added ${productName} to cart`);
    router.push("/cart");
  };

  return (
    <AppShell
      title="AI Recommendations"
      subtitle="Ranked products based on customer intent"
    >
      <main className="min-h-screen bg-[#06080f] px-5 py-7 text-white lg:px-8 lg:py-9">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <button
                type="button"
                onClick={() => router.push("/assistant")}
                className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-white"
              >
                <ArrowLeft size={14} />
                Back to AI Assistant
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                <BrainCircuit size={14} />
                AI-ranked catalog
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Recommendations for gaming audio
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                RAFON matched the customer request against the merchant
                catalog using gaming intent, budget and low-latency
                requirements.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300"
            >
              <Filter size={15} />
              Ranking criteria
            </button>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {recommendations.map((product) => (
              <RecommendationCard
                key={product.name}
                {...product}
                onAdd={() => handleAddToCart(product.name)}
              />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-bold text-emerald-300">
                  Agentic upsell identified
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  RAFON found a high-affinity 65W GaN Fast Charger that can
                  increase basket value without exceeding the customer's
                  budget after the bundle discount.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-5 py-3 text-xs font-black text-slate-950"
              >
                <ShoppingBag size={15} />
                Open Smart Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
