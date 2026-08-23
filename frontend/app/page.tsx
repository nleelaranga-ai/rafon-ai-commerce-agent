"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/shared/GlassCard";

const capabilities = [
  {
    icon: Bot,
    title: "AI Shopping Assistant",
    text: "Understand customer intent from natural language and guide the shopper toward relevant products.",
  },
  {
    icon: Sparkles,
    title: "Intelligent Upsell",
    text: "Generate contextual cross-sell offers while respecting merchant-defined discount and action limits.",
  },
  {
    icon: CreditCard,
    title: "Razorpay Checkout",
    text: "Move from recommendation to a bounded Razorpay Test Mode checkout experience.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Intelligence",
    text: "Track AI-assisted orders, conversion performance and incremental merchant revenue.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable Decisions",
    text: "Record what the agent decided, why it decided it and which action followed.",
  },
  {
    icon: LayoutDashboard,
    title: "Merchant Control Center",
    text: "Give merchants one place to inspect commerce activity, payments, recovery and audit events.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#06080f] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-400/10 blur-[120px]" />
        <div className="absolute right-[-10rem] top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <Navbar />

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Razorpay AI Buildathon · Track 01
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Turn customer
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  {" "}
                  conversations
                </span>{" "}
                into revenue.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                RAFON AI is an autonomous commerce intelligence platform that
                understands shopping intent, recommends products, creates
                bounded upsells and connects the journey to Razorpay-powered
                checkout.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/assistant"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500 px-6 py-3.5 font-bold text-slate-950 transition hover:scale-[1.02]"
                >
                  Launch AI Shopping
                  <ArrowRight size={18} />
                </a>

                <a
                  href="/dashboard"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-center font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Explore Merchant Dashboard
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                <Metric value="3.4K" label="AI Decisions" />
                <Metric value="892" label="AI Assisted Orders" />
                <Metric value="12.8K" label="Audit Events" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="overflow-hidden p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-sm font-bold">RAFON-CORE</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      Autonomous Decision Stream
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-5 space-y-4 font-mono text-xs leading-6">
                  <Log tag="QUERY_INGEST">
                    I need wireless earbuds for gaming under ₹6000.
                  </Log>

                  <Log tag="INTENT_PARSED">
                    {"{ category: audio, use_case: gaming, budget: 6000 }"}
                  </Log>

                  <Log tag="RANKING_ENGINE">
                    Top match: Nothing Ear (a) · ₹5,499 · 98.6% match
                  </Log>

                  <Log tag="AGENTIC_UPSELL">
                    65W GaN Charger · +₹499 · contextual bundle
                  </Log>

                  <Log tag="CHECKOUT">
                    Razorpay test order prepared · awaiting approval
                  </Log>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      Decision status
                    </span>
                    <span className="text-xs font-bold text-emerald-300">
                      BOUNDED
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "86%" }}
                      transition={{ duration: 0.9 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto max-w-7xl px-6 pb-28 lg:px-8"
        >
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Core capabilities
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One agent. One commerce loop.
            </h2>

            <p className="mt-3 max-w-3xl text-slate-400">
              Designed around the Razorpay brief: merchant growth, bounded
              money actions, explainability and graceful failure recovery.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                  }}
                >
                  <GlassCard className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan-300">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
      <div className="text-xl font-black">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}

function Log({
  tag,
  children,
}: {
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="shrink-0 text-emerald-300">[{tag}]</span>
      <span className="text-slate-300">{children}</span>
    </div>
  );
}
