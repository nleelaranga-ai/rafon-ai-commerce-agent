"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Fingerprint,
  IndianRupee,
  Layers,
  LifeBuoy,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/shared/GlassCard";

const accordionFeatures = [
  {
    id: "01",
    tag: "INTENT ENGINE",
    title: "Semantic Intent Discovery",
    desc: "Interprets conversational constraints like 'under ₹6,000 for gaming' directly to latency specs and catalog filters with zero hallucination.",
    specs: ["45ms Ultra-Low Latency", "Multi-Turn Memory", "Deep Context Extraction"],
    badge: "98.6% MATCH",
    color: "from-orange-500/20 to-transparent",
  },
  {
    id: "02",
    tag: "POLICY ENGINE",
    title: "Deterministic Bounding",
    desc: "Guarantees the AI agent strictly obeys merchant financial rules: max 5% discount, price <= user budget, and verified stock limits.",
    specs: ["Mathematical Boundary", "Zero Hallucination", "Inventory Verified"],
    badge: "BOUNDED <= ₹6K",
    color: "from-cyan-500/20 to-transparent",
  },
  {
    id: "03",
    tag: "GROWTH AGENT",
    title: "Contextual Upsell Multiplier",
    desc: "Autonomous cross-selling bundles (e.g. 65W GaN Fast Charger at +₹499) that fit within remaining budget and expand merchant AOV.",
    specs: ["+28.4% AOV Lift", "34.8% Acceptance", "+₹499 Net Basket"],
    badge: "+28.4% AOV",
    color: "from-emerald-500/20 to-transparent",
  },
  {
    id: "04",
    tag: "RESCUE ENGINE",
    title: "15-Min Failure Recovery",
    desc: "Autonomous RF-REC-02 protocol catches 504 bank drops, locks inventory for 15 minutes, and generates bounded rescue incentives.",
    specs: ["15-Min Stock Lock", "RESCUE5 Voucher", "34.2% Rescued"],
    badge: "RECOVERY READY",
    color: "from-amber-500/20 to-transparent",
  },
  {
    id: "05",
    tag: "AUDIT LEDGER",
    title: "Cryptographic SHA-256 Ledger",
    desc: "Every reasoning step, pricing calculation, and checkout trigger is immutably stamped with a zero-knowledge cryptographic signature.",
    specs: ["SHA-256 Hash", "Trace ID #RF-9482", "Tamper-Proof"],
    badge: "SECURE VERIFIED",
    color: "from-violet-500/20 to-transparent",
  },
];

export default function HomePage() {
  const [activeAccordion, setActiveAccordion] = useState("01");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07080d] text-white selection:bg-[#FF5812]/30">
      {/* Ambient Radial Spotlight */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-[-10rem] top-[-10rem] h-[40rem] w-[40rem] rounded-full bg-[#FF5812]/8 blur-[140px]" />
        <div className="absolute right-[-10rem] top-1/4 h-[35rem] w-[35rem] rounded-full bg-cyan-400/8 blur-[140px]" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[40rem] w-[40rem] rounded-full bg-emerald-400/6 blur-[150px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* AVOORA HERO SECTION */}
        <section className="mx-auto max-w-7xl px-5 pt-12 pb-24 lg:px-8 lg:pt-20">
          {/* Top Capsule Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF5812] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#8e95a5] uppercase">
                Autonomous Commerce Intelligence Platform · Est. 2026
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[11px] font-mono text-[#FF5812] font-semibold">
              <span>Razorpay AI Buildathon</span>
              <span className="text-white/30">•</span>
              <span className="text-white">Track 01</span>
            </div>
          </div>

          {/* Massive Display Title (Avoora Style) */}
          <div className="mt-10">
            <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-4">
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-[-0.05em] uppercase text-white font-sans leading-[0.9]">
                RAFON<span className="text-[#FF5812] font-mono text-4xl sm:text-6xl align-top">®</span>
              </h1>
              <div className="text-xs font-mono text-[#8e95a5] uppercase tracking-widest max-w-xs text-right hidden lg:block">
                AI Growth, Bounded Actions, Failure Recovery & Auditability
              </div>
            </div>

            {/* Horizontal Divider Line */}
            <div className="my-6 h-[1px] w-full bg-gradient-to-r from-[#FF5812] via-white/20 to-transparent" />

            <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-8 items-end">
              <div className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Turn shopper intent into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5812] via-orange-400 to-amber-300">
                  bounded revenue.
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-base text-[#8e95a5] leading-relaxed">
                  RAFON AI interprets complex shopper intent in real-time, guarantees merchant bounding rules, autonomously expands cart value through smart bundles, and rescues dropped checkouts.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/assistant" className="avoora-btn avoora-btn-orange">
                    <div className="text-roll-wrapper">
                      <span className="text-roll-item text-roll-primary">Launch AI Console</span>
                      <span className="text-roll-item text-roll-secondary">Launch AI Console</span>
                    </div>
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                  >
                    <span>Merchant Governance</span>
                    <ArrowUpRight size={14} className="text-[#8e95a5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Live Metric Strip (Avoora Style) */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 border-y border-white/10 py-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a5]">Autonomous GMV</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white font-mono">₹18.4L</div>
              <div className="mt-0.5 text-[11px] font-semibold text-emerald-400">+28.4% via RAFON</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a5]">Upsell Acceptance</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white font-mono">34.8%</div>
              <div className="mt-0.5 text-[11px] font-semibold text-cyan-400">65W GaN (+₹499)</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a5]">Recovery Rate</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-white font-mono">34.2%</div>
              <div className="mt-0.5 text-[11px] font-semibold text-amber-400">15-Min Reservation</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8e95a5]">Decision Integrity</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <div className="mt-0.5 text-[11px] font-semibold text-slate-400">SHA-256 Verified</div>
            </div>
          </div>
        </section>

        {/* AVOORA SIGNATURE EXPANDABLE ACCORDION SECTION ("Our Expertise") */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF5812]">
                <span className="h-2 w-2 rounded-full bg-[#FF5812]" />
                System Architecture
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-white">
                Core Autonomous Capabilities
              </h2>
            </div>
            <div className="text-xs font-mono text-[#8e95a5]">
              (05) PROVEN ARCHITECTURAL PILLARS
            </div>
          </div>

          {/* Interactive Horizontal Accordion Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {accordionFeatures.map((feat) => {
              const isExpanded = activeAccordion === feat.id;

              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveAccordion(feat.id)}
                  className={`group relative cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden ${
                    isExpanded
                      ? "lg:col-span-2 border-[#FF5812]/50 bg-[#0e111d] shadow-2xl shadow-[#FF5812]/10"
                      : "border-white/10 bg-[#090b12]/80 hover:border-white/25 hover:bg-[#0c0e18]"
                  }`}
                >
                  <div className={`p-6 sm:p-7 flex flex-col justify-between h-full min-h-[360px] ${isExpanded ? "bg-gradient-to-b " + feat.color : ""}`}>
                    {/* Top Step Counter & Tag */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-xs font-mono font-bold text-[#8e95a5]">
                        ({feat.id})
                      </span>
                      <span className={`text-[10px] font-mono font-black uppercase tracking-wider rounded-full px-2.5 py-1 ${
                        isExpanded ? "bg-[#FF5812] text-white" : "border border-white/10 text-[#8e95a5]"
                      }`}>
                        {feat.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="my-6">
                      <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${
                        isExpanded ? "text-white" : "text-slate-200 group-hover:text-white"
                      }`}>
                        {feat.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-[#8e95a5] leading-relaxed">
                        {feat.desc}
                      </p>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 flex flex-wrap gap-2"
                        >
                          {feat.specs.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono font-medium text-slate-300"
                            >
                              <CheckCircle2 size={12} className="text-emerald-400" />
                              {s}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-[10px] font-mono font-bold text-emerald-400">
                        {feat.badge}
                      </span>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                        isExpanded ? "bg-white text-slate-950" : "bg-white/5 text-[#8e95a5] group-hover:text-white"
                      }`}>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE DEMO CONSOLE CALLOUT */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0d101a] via-[#090b14] to-[#0d101a] p-8 sm:p-12 relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#FF5812]/10 blur-[100px]" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/30 bg-[#FF5812]/10 px-3.5 py-1 text-xs font-mono font-bold text-[#FF5812] uppercase">
                  <Zap size={13} className="fill-[#FF5812]" />
                  Live Reactive Console
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Experience Agentic Commerce in Action
                </h2>

                <p className="mt-3 text-sm text-[#8e95a5] leading-relaxed">
                  Try the multi-turn conversational shopper, observe the Glass-Box cognitive decision stream, trigger 504 payment drop chaos tests, and inspect the real-time SHA-256 cryptographic audit logs.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <Link href="/assistant" className="avoora-btn avoora-btn-orange">
                    <div className="text-roll-wrapper">
                      <span className="text-roll-item text-roll-primary">Open 3-Pane Command Center</span>
                      <span className="text-roll-item text-roll-secondary">Open 3-Pane Command Center</span>
                    </div>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Code / Telemetry Showcase */}
              <div className="rounded-2xl border border-white/10 bg-[#05060a]/90 p-5 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-[#8e95a5]">
                  <span>AGENT TELEMETRY #RF-9482</span>
                  <span className="text-emerald-400 font-bold">LATENCY: 42ms</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-cyan-400">&gt; INGEST:</span> &quot;Gaming earbuds under ₹6000&quot;
                </div>
                <div className="text-slate-400">
                  <span className="text-emerald-400">&gt; BOUNDED:</span> Nothing Ear (a) · ₹5,499 &le; ₹6,000
                </div>
                <div className="text-slate-400">
                  <span className="text-[#FF5812]">&gt; UPSELL:</span> 65W GaN Charger (+₹499) · Total ₹5,998
                </div>
                <div className="text-slate-400">
                  <span className="text-purple-400">&gt; HASH:</span> e3b0c44298fc1c149afbf4c8996fb924...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVOORA STUDIO FOOTER */}
        <footer className="border-t border-white/10 bg-[#05060a] py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF5812] text-white font-bold">
                  <Zap size={16} className="fill-white" />
                </div>
                <span className="text-base font-black tracking-tight text-white">RAFON AI</span>
                <span className="text-xs font-mono text-[#8e95a5]">Autonomous Commerce Platform</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#8e95a5]">
                <Link href="/assistant" className="hover:text-white transition">(01) Shopping Console</Link>
                <Link href="/dashboard" className="hover:text-white transition">(02) Merchant Hub</Link>
                <Link href="/recommendations" className="hover:text-white transition">(03) Product Catalog</Link>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <div>© 2026 RAFON AI · Razorpay AI Buildathon (Track 01 — AI Growth & Agentic Commerce)</div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

