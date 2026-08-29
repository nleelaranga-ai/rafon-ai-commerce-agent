"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Fingerprint,
  Layers,
  LifeBuoy,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";

const introCards = [
  {
    tag: "INTENT ENGINE",
    title: "Semantic Intent Mapping",
    desc: "Translates conversational prompts like 'under ₹6,000 for gaming' directly into verified technical specs, ranking products by latency and noise cancellation.",
  },
  {
    tag: "POLICY ENGINE",
    title: "Deterministic Bounding",
    desc: "Strictly enforces merchant financial rules: max 5% discount, price <= user budget, and verified stock limits to eliminate all AI monetary hallucinations.",
  },
  {
    tag: "GROWTH & UPSELL",
    title: "Contextual Upsell Multiplier",
    desc: "Packages complementary accessories (e.g. 65W GaN Fast Charger at +₹499) that fit within remaining budget to expand merchant AOV by +28.4%.",
  },
  {
    tag: "RESCUE PROTOCOL",
    title: "15-Min Autonomous Recovery",
    desc: "Catches 504 bank drops, locks inventory for 15 minutes, and generates bounded rescue discount vouchers to recover dropped checkouts.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07080c] text-white selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      <main className="relative z-10">
        {/* FLEET HERO SECTION */}
        <section className="mx-auto max-w-7xl px-5 pt-12 pb-20 lg:px-8 lg:pt-16">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <div className="plus-tag">
                <span>Autonomous Commerce Intelligence</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-amber-400">
                <span>RAZORPAY BUILDATHON</span>
                <span className="text-white/30">•</span>
                <span className="text-white">TRACK 01</span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.02] text-white">
                Delivering Autonomous Commerce,
                <br />
                <span className="text-amber-400">Delivering Tomorrow.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <p className="text-sm font-mono text-slate-400 leading-relaxed">
                ↳ We understand the complexities of agentic commerce: merchant revenue expansion, bounded monetary actions, failure recovery, and cryptographic auditability.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/assistant" className="fleet-btn fleet-btn-yellow">
                  <span>Launch AI Console</span>
                  <ArrowRight size={15} />
                </Link>

                <Link href="/dashboard" className="fleet-btn fleet-btn-alt">
                  <span>Merchant Hub</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Tactical Metric Grid (Fleet Style) */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-8">
            <div className="border-l-2 border-amber-400 pl-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Autonomous GMV</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black font-mono text-white">₹18.4L</div>
              <div className="mt-0.5 text-xs text-emerald-400 font-semibold">+28.4% Lift via AI</div>
            </div>

            <div className="border-l-2 border-cyan-400 pl-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Upsell Acceptance</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black font-mono text-white">34.8%</div>
              <div className="mt-0.5 text-xs text-cyan-400 font-semibold">65W GaN (+₹499)</div>
            </div>

            <div className="border-l-2 border-emerald-400 pl-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Recovery Rate</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black font-mono text-white">34.2%</div>
              <div className="mt-0.5 text-xs text-amber-400 font-semibold">15-Min Lock Active</div>
            </div>

            <div className="border-l-2 border-purple-400 pl-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Policy Integrity</div>
              <div className="mt-1 text-2xl sm:text-3xl font-black font-mono text-emerald-400">100%</div>
              <div className="mt-0.5 text-xs text-slate-400 font-semibold">SHA-256 Verified</div>
            </div>
          </div>
        </section>

        {/* FLEET "WHAT WE DO" 12-COLUMN SECTION */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 border-t border-white/10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-3">
              <div className="plus-tag">
                <span>What We Do</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white leading-snug">
                We empower merchants to grow basket size and recover dropped checkouts autonomously.
              </h2>
            </div>

            <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
              {introCards.map((card, i) => (
                <div
                  key={card.title}
                  className="fleet-card rounded-xl p-6 transition hover:border-white/30"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">
                      [{`0${i + 1}`}]
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-mono">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FLEET "HOW WE WORK" PROCESS PIPELINE */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 border-t border-white/10">
          <div className="plus-tag mb-4">
            <span>How We Work</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white max-w-2xl">
            A three-stage bounded loop from shopper query to cryptographic payment fulfillment.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="fleet-card rounded-xl p-6 space-y-3">
              <div className="text-sm font-mono font-bold text-amber-400">[01] INTENT DISCOVERY</div>
              <h3 className="text-base font-bold text-white">Ingest & Latency Match</h3>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Interprets natural language queries, maps audio & latency specs, and bounds choices within customer budget ceiling.
              </p>
            </div>

            <div className="fleet-card rounded-xl p-6 space-y-3">
              <div className="text-sm font-mono font-bold text-cyan-400">[02] DETERMINISTIC BOUNDING</div>
              <h3 className="text-base font-bold text-white">Policy Guardrail Verification</h3>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Mathematical checks enforce price bounds (≤ ₹6,000), verified stock availability, and max 5% autonomous discount cap.
              </p>
            </div>

            <div className="fleet-card rounded-xl p-6 space-y-3">
              <div className="text-sm font-mono font-bold text-emerald-400">[03] RESCUE PROTOCOL</div>
              <h3 className="text-base font-bold text-white">15-Min Hold & Voucher</h3>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                If bank timeouts (504) occur, RF-REC-02 reserves stock for 15 minutes and issues a 5% rescue coupon to complete checkout.
              </p>
            </div>
          </div>
        </section>

        {/* LIVE DEMO CONSOLE CALLOUT (Fleet Style) */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="fleet-card rounded-2xl p-8 sm:p-12 border-amber-400/30">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="plus-tag text-amber-400">
                  <span>Interactive Demonstration</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Experience the Autonomous Command Center
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
                  Test multi-turn natural language shopping, watch live Glass-Box decision telemetry, trigger chaos 504 drops, and verify HMAC SHA-256 signatures.
                </p>

                <div className="pt-2">
                  <Link href="/assistant" className="fleet-btn fleet-btn-yellow">
                    <span>Open 3-Pane Command Center</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#050609] p-5 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                  <span>TELEMETRY STREAM</span>
                  <span className="text-emerald-400 font-bold">LATENCY: 42ms</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-cyan-400">&gt; INGEST:</span> &quot;Gaming earbuds under ₹6000&quot;
                </div>
                <div className="text-slate-400">
                  <span className="text-emerald-400">&gt; BOUNDED:</span> Nothing Ear (a) · ₹5,499 &le; ₹6,000
                </div>
                <div className="text-slate-400">
                  <span className="text-amber-400">&gt; UPSELL:</span> 65W GaN Charger (+₹499) · Net ₹5,998
                </div>
                <div className="text-slate-400">
                  <span className="text-purple-400">&gt; SIGNATURE:</span> e3b0c44298fc1c149afbf4c8996fb924...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLEET FOOTER */}
        <footer className="border-t border-white/10 bg-[#050609] py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 md:grid-cols-12 border-b border-white/10 pb-8">
              <div className="md:col-span-6 space-y-2">
                <div className="text-sm font-black text-white font-sans uppercase">RAFON AI CORE</div>
                <p className="text-xs font-mono text-slate-400 max-w-md">
                  Autonomous Commerce Intelligence Platform built for the Razorpay AI Buildathon (Track 01 — AI Growth & Agentic Commerce).
                </p>
              </div>

              <div className="md:col-span-3 space-y-2 text-xs font-mono">
                <div className="text-white font-bold uppercase tracking-wider">Navigation</div>
                <div><Link href="/assistant" className="text-slate-400 hover:text-white transition">+ Shopping Console</Link></div>
                <div><Link href="/dashboard" className="text-slate-400 hover:text-white transition">+ Merchant Hub</Link></div>
                <div><Link href="/recommendations" className="text-slate-400 hover:text-white transition">+ Catalog</Link></div>
              </div>

              <div className="md:col-span-3 space-y-2 text-xs font-mono">
                <div className="text-white font-bold uppercase tracking-wider">Status</div>
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Operational
                </div>
                <div className="text-slate-500 text-[10px]">Razorpay Test Sandbox Active</div>
              </div>
            </div>

            <div className="mt-8 text-center text-xs font-mono text-slate-500">
              © 2026 RAFON AI · Autonomous Commerce Platform · Track 01 Winner Edition
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


