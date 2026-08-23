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

const features = [
  {
    icon: Bot,
    title: "AI Shopping Assistant",
    description:
      "Understand natural-language shopping intent and turn conversations into product discovery.",
  },
  {
    icon: Sparkles,
    title: "Intelligent Upsell",
    description:
      "Find relevant cross-sell opportunities while respecting merchant-defined limits.",
  },
  {
    icon: CreditCard,
    title: "Razorpay Checkout",
    description:
      "Move from AI recommendation to a bounded Razorpay test-mode payment flow.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Intelligence",
    description:
      "Give merchants visibility into AI-assisted orders, AOV and conversion impact.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable Decisions",
    description:
      "Record what the agent decided, why it decided it and what action followed.",
  },
  {
    icon: LayoutDashboard,
    title: "Merchant Control Center",
    description:
      "Bring commerce, payments, recovery and audit information into one interface.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute right-[-120px] top-20 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="rafon-grid relative min-h-screen">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rafon-gradient flex h-10 w-10 items-center justify-center rounded-xl text-slate-950 shadow-lg shadow-cyan-400/20">
              <Bot size={21} />
            </div>

            <div>
              <div className="text-lg font-extrabold tracking-tight">
                RAFON AI
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                Agentic Commerce
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="#features"
              className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#demo"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
            >
              View Demo
            </a>
          </div>
        </header>

        <section
          id="demo"
          className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-24"
        >
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold text-cyan-300 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Razorpay AI Buildathon · Track 01
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Turn customer
                <span className="text-gradient"> conversations</span>
                into revenue.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                RAFON AI is an autonomous commerce intelligence platform that
                understands shopping intent, recommends products, creates
                bounded upsells and connects the journey to Razorpay-powered
                checkout.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button className="rafon-gradient group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-slate-950 shadow-xl shadow-emerald-400/10 transition hover:scale-[1.02]">
                  Launch AI Shopping
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                  Explore Merchant Dashboard
                </button>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                <Stat label="AI Decisions" value="3.4K" />
                <Stat label="AI Assisted Orders" value="892" />
                <Stat label="Audit Events" value="12.8K" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-cyan-500/5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-sm font-bold text-white">
                  RAFON-CORE
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Autonomous Decision Stream
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Active
              </div>
            </div>

            <div className="mt-5 space-y-3 font-mono text-xs leading-6">
              <TerminalLine
                tag="QUERY_INGEST"
                text='I need wireless earbuds for gaming under ₹6000.'
              />

              <TerminalLine
                tag="INTENT_PARSED"
                text='{ category: "audio", use_case: "gaming", budget: 6000 }'
              />

              <TerminalLine
                tag="RANKING_ENGINE"
                text="Top match: Nothing Ear (a) · ₹5,499 · 98.6% match"
              />

              <TerminalLine
                tag="AGENTIC_UPSELL"
                text="65W GaN Charger · +₹499 · contextual bundle"
              />

              <TerminalLine
                tag="CHECKOUT"
                text="Razorpay test order prepared · awaiting customer approval"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Decision status
                </span>

                <span className="text-xs font-bold text-emerald-300">
                  BOUNDED
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "86%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                />
              </div>
            </div>
          </motion.div>
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

            <p className="mt-3 max-w-2xl text-slate-400">
              Designed around the Razorpay brief: merchant growth, bounded
              money actions, explainability and graceful failure recovery.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-400/20"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan-300">
                    <Icon size={21} />
                  </div>

                  <h3 className="text-lg font-bold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xl font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  );
}

function TerminalLine({
  tag,
  text,
}: {
  tag: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="shrink-0 text-emerald-300">[{tag}]</span>
      <span className="text-slate-300">{text}</span>
    </div>
  );
}
