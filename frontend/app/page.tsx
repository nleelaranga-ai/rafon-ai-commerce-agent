"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cpu,
  CreditCard,
  Database,
  ExternalLink,
  FastForward,
  Fingerprint,
  Globe,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Play,
  Plus,
  Radio,
  Repeat,
  RotateCcw,
  Search,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";

// Integrations Data
const integrationList = [
  { name: "Slack", category: "Communication", color: "#ECB22E" },
  { name: "Discord", category: "Community", color: "#5865F2" },
  { name: "Notion", category: "Productivity", color: "#FFFFFF" },
  { name: "Figma", category: "Design", color: "#F24E1E" },
  { name: "GitHub", category: "Code", color: "#FFFFFF" },
  { name: "Linear", category: "Tracking", color: "#5E6AD2" },
  { name: "Zapier", category: "Automation", color: "#FF4A00" },
  { name: "OpenAI", category: "AI Models", color: "#10A37F" },
  { name: "Google Drive", category: "Storage", color: "#4285F4" },
  { name: "Airtable", category: "Database", color: "#18BFFF" },
  { name: "Webflow", category: "Web", color: "#146EF5" },
  { name: "Stripe", category: "Payments", color: "#635BFF" },
  { name: "Razorpay", category: "Payments", color: "#0C2340" },
  { name: "HubSpot", category: "CRM", color: "#FF7A59" },
  { name: "Salesforce", category: "Enterprise", color: "#00A1E0" },
  { name: "Supabase", category: "Database", color: "#3ECF8E" },
  { name: "Vercel", category: "Deployment", color: "#FFFFFF" },
  { name: "Intercom", category: "Support", color: "#1F8CED" },
];

const testimonialsData = [
  {
    company: "Synthora",
    name: "Jacob Jones",
    role: "Head of Growth at Synthora",
    quote:
      "With Fiilo’s smart automation and real-time insights, we’ve improved deal closures by 35% in just two months.",
    stat1: "$100K",
    stat1Text: "Increase sales revenue",
    stat2: "90%",
    stat2Text: "Boost team efficiency",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    company: "Loopbit",
    name: "Sarah Jenkins",
    role: "VP Revenue Operations at Loopbit",
    quote:
      "The zero-hallucination policy bounding gave our enterprise sales team 100% confidence to let AI handle custom pricing negotiations.",
    stat1: "4.8x",
    stat1Text: "Faster deal velocity",
    stat2: "99.9%",
    stat2Text: "Policy compliance",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    company: "Nexivo",
    name: "Marcus Vance",
    role: "Chief Commercial Officer at Nexivo",
    quote:
      "The 15-minute autonomous cart recovery alone recovered over $45,000 in dropped checkouts during our Q4 product drop.",
    stat1: "+34.2%",
    stat1Text: "Checkout recovery rate",
    stat2: "15 Min",
    stat2Text: "Autonomous hold",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    company: "Infera",
    name: "Elena Rostova",
    role: "Product Lead at Infera AI",
    quote:
      "Fiilo’s multi-agent orchestration seamlessly bridges natural language customer intent with instant inventory availability.",
    stat1: "42ms",
    stat1Text: "Average latency",
    stat2: "+28.4%",
    stat2Text: "AOV expansion",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
];

const faqs = [
  {
    q: "How does Fiilo prevent AI hallucinations during checkout?",
    a: "Fiilo uses a deterministic Policy Engine that operates outside LLM inference. All price boundaries, discount caps (≤ 5%), budget limits (≤ ₹6,000), and inventory checks are mathematically validated before any checkout payload is generated.",
  },
  {
    q: "What happens when a payment gateway encounters a 504 timeout?",
    a: "Our Autonomous Recovery Engine (RF-REC-02) instantly traps the failure event, places an isolated 15-minute hold on the selected inventory, and generates an emergency rescue code (e.g. RESCUE5) to recover the transaction seamlessly.",
  },
  {
    q: "Can Fiilo integrate with our existing CRM and ERP stack?",
    a: "Yes. Fiilo provides out-of-the-box native integrations with HubSpot, Salesforce, Linear, Slack, Stripe, Razorpay, and custom REST/GraphQL endpoints via secure webhooks.",
  },
  {
    q: "How does the Contextual Upsell Multiplier work?",
    a: "The growth agent evaluates the customer's stated budget ceiling, current cart items, and catalog margins to suggest relevant add-on accessories (like a 65W GaN Charger for +₹499) that fit neatly within their budget.",
  },
  {
    q: "Is every AI action cryptographically auditable?",
    a: "Yes. Every reasoning trace, intent extraction, policy boundary check, and order dispatch is hashed into a tamper-proof SHA-256 cryptographic audit ledger with a unique trace ID.",
  },
  {
    q: "How long does it take to deploy Fiilo?",
    a: "You can embed the Fiilo AI Shopping Console widget in less than 5 minutes using our drop-in React/Next.js components or standard iframe embed.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-purple-500/40 selection:text-white">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-[140px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 text-center lg:pt-24">
          {/* New Feature Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md">
            <span className="rounded-full bg-purple-500 px-2 py-0.5 text-[10px] font-black text-white uppercase">
              New
            </span>
            <span>AI Search: Find leads your way</span>
            <ChevronRight size={13} className="text-purple-400" />
          </div>

          {/* Massive Display Headline */}
          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
            Let AI take your sales to the{" "}
            <span className="fiilo-gradient-text">next level</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Unlock rapid growth by combining intelligent automation, real-time insights, and streamlined workflows.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/assistant" className="fiilo-btn-primary">
              <span>Get 14 Days Free Trial</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/dashboard" className="fiilo-btn-secondary">
              <Sparkles size={15} className="text-purple-400" />
              <span>Explore Live Console</span>
            </Link>
          </div>

          <div className="mt-4 text-xs text-slate-500 font-medium">
            No Credit Card Required · 14-Day Full Access
          </div>

          {/* Hero Floating Dashboard Mockup */}
          <div className="relative mt-16 mx-auto max-w-5xl">
            <div className="fiilo-card relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12]/90 p-4 sm:p-7 shadow-2xl shadow-purple-950/40">
              {/* Browser Top Chrome */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-mono text-slate-400">
                  fiilo.com/app/autonomous-commerce
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live 42ms
                </div>
              </div>

              {/* Inside Dashboard Layout */}
              <div className="grid gap-5 lg:grid-cols-12 text-left">
                {/* Left Mini Stats & Chart (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Autonomous GMV</div>
                      <div className="text-xl font-extrabold text-white mt-1">₹18.4L</div>
                      <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">+28.4% Lift</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Cart Recovery</div>
                      <div className="text-xl font-extrabold text-white mt-1">34.2%</div>
                      <div className="text-[10px] text-purple-400 font-semibold mt-0.5">15-Min Hold</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Policy Integrity</div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-1">100%</div>
                      <div className="text-[10px] text-slate-500 font-semibold mt-0.5">SHA-256</div>
                    </div>
                  </div>

                  {/* Simulated Activity Stream */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/5">
                      <span>LIVE EVENT DISPATCH</span>
                      <span className="text-purple-400">#RF-9482</span>
                    </div>
                    <div className="text-slate-300">
                      <span className="text-cyan-400 font-bold">&gt; INGEST:</span> &quot;Wireless gaming earbuds under ₹6000&quot;
                    </div>
                    <div className="text-slate-300">
                      <span className="text-emerald-400 font-bold">&gt; BOUNDED:</span> Nothing Ear (a) · ₹5,499 &le; ₹6,000 (45ms mode)
                    </div>
                    <div className="text-slate-300">
                      <span className="text-purple-400 font-bold">&gt; UPSELL:</span> 65W GaN Charger (+₹499) · Fits in budget
                    </div>
                  </div>
                </div>

                {/* Right Interactive Chat Snippet (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/40 p-4 flex flex-col justify-between">
                  <div className="space-y-2.5 text-xs">
                    <div className="rounded-xl bg-purple-600/20 border border-purple-500/30 p-3 text-purple-200">
                      <div className="text-[10px] font-bold uppercase text-purple-400 mb-1">AI Copilot</div>
                      Matched Nothing Ear (a) at ₹5,499. Would you like to bundle the 65W GaN charger for only +₹499?
                    </div>

                    <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 text-slate-300 text-right">
                      Yes, add the bundle and proceed to Razorpay.
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Total: ₹5,998</span>
                    <Link
                      href="/assistant"
                      className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:brightness-110 transition shadow-md"
                    >
                      Checkout →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges around Dashboard */}
            <div className="hidden sm:flex absolute -top-6 -left-6 rounded-2xl border border-purple-500/40 bg-[#12111a]/90 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-xl items-center gap-2 animate-bounce">
              <Sparkles size={14} className="text-purple-400" />
              <span>+35% Deal Closures</span>
            </div>

            <div className="hidden sm:flex absolute -bottom-6 -right-6 rounded-2xl border border-emerald-500/40 bg-[#0f1712]/90 px-4 py-2.5 text-xs font-bold text-emerald-300 shadow-xl backdrop-blur-xl items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>100% Deterministic Integrity</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: TRUSTED COMPANIES (INFINITE MARQUEE) */}
        {/* ========================================================================= */}
        <section className="border-y border-white/10 bg-[#070709]/80 py-12 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Trusted by 25,000+ fast-growing founders & commerce leaders
            </p>

            {/* Marquee with Fade Edges */}
            <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="animate-marquee gap-12 text-lg font-black text-slate-500 uppercase tracking-wider">
                {[
                  "Synthora",
                  "Loopbit",
                  "Nexivo",
                  "Infera",
                  "Braina",
                  "Stripe",
                  "Razorpay",
                  "Linear",
                  "Vercel",
                  "Supabase",
                  "Notion",
                  "Synthora",
                  "Loopbit",
                  "Nexivo",
                  "Infera",
                  "Braina",
                  "Stripe",
                  "Razorpay",
                  "Linear",
                  "Vercel",
                ].map((brand, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 hover:text-white transition cursor-default group"
                  >
                    <div className="h-2 w-2 rounded-full bg-purple-500 group-hover:scale-125 transition" />
                    <span>{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: BENTO FEATURES GRID */}
        {/* ========================================================================= */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <div className="fiilo-badge">
              <Cpu size={14} />
              <span>Sales AI Copilot · Free & Pro</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Sales Made Simple with AI
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Sales made simple with AI means smarter decisions, faster results, and zero monetary hallucinations.
            </p>
          </div>

          {/* 3x2 Bento Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="fiilo-card p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Workflow size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Task & Activity Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assign, schedule, and track daily sales tasks effortlessly with AI automation triggers.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] font-mono text-purple-300">
                ✓ Auto-sync to CRM pipeline
              </div>
            </div>

            {/* Card 2 */}
            <div className="fiilo-card p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Repeat size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Connect Tools & CRMs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamlessly pipe real-time conversation data directly into Slack, HubSpot, and Stripe.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] font-mono text-cyan-300">
                ✓ 30+ instant webhook connectors
              </div>
            </div>

            {/* Card 3 */}
            <div className="fiilo-card p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Role-Based Access Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ensure strict enterprise compliance with mathematical discount and budget boundaries.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] font-mono text-pink-300">
                ✓ Max 5% autonomous discount cap
              </div>
            </div>

            {/* Card 4 */}
            <div className="fiilo-card p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Users size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Track Sales Contacts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Easily monitor and manage all sales interactions, intent history, and customer lifetime value.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] font-mono text-amber-300">
                ✓ Multi-turn shopper memory
              </div>
            </div>

            {/* Card 5 */}
            <div className="fiilo-card p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CreditCard size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Automated Razorpay Settlement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate instant verified orders with HMAC SHA-256 webhook signatures and zero friction.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] font-mono text-emerald-300">
                ✓ Razorpay Orders & HMAC Verified
              </div>
            </div>

            {/* Card 6 */}
            <div className="fiilo-card p-7 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Monthly Revenue Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gain clear insights into AI-driven basket expansion, upsell acceptance, and rescued GMV.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11px] font-mono text-blue-300">
                ✓ +28.4% average basket lift
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: AI AUTOMATION SHOWCASE */}
        {/* ========================================================================= */}
        <section id="automations" className="mx-auto max-w-6xl px-4 py-20 border-t border-white/10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-5">
              <div className="fiilo-badge">
                <Zap size={14} />
                <span>Workflow Engine</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Automate complex sales actions with visual nodes
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                Connect your customer channels directly to deterministic AI agents. When a shopper asks for budget-constrained gear, Fiilo executes instant evaluation, stock bounding, and checkout fulfillment automatically.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  <span>Real-time natural language query parsing</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  <span>Mathematical margin and price constraint enforcement</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  <span>Autonomous 15-minute failure recovery</span>
                </div>
              </div>
            </div>

            {/* Right Visual Workflow Canvas */}
            <div className="lg:col-span-7">
              <div className="fiilo-card rounded-3xl p-6 sm:p-8 relative bg-gradient-to-b from-white/[0.05] to-transparent">
                <div className="space-y-4">
                  {/* Node 1 */}
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121218] p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold text-xs">
                        01
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Trigger: Shopper Intent</div>
                        <div className="text-[10px] text-slate-400">Incoming prompt under ₹6,000 budget</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      Active
                    </span>
                  </div>

                  {/* Connector Line */}
                  <div className="mx-auto h-6 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500" />

                  {/* Node 2 */}
                  <div className="flex items-center justify-between rounded-2xl border border-purple-500/30 bg-[#151224] p-4 shadow-lg shadow-purple-950/20">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500 text-white font-bold text-xs">
                        02
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Policy Engine: Zero Hallucination</div>
                        <div className="text-[10px] text-slate-400">Verifying price ≤ ₹6,000 & discount ≤ 5%</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
                      Bounded
                    </span>
                  </div>

                  {/* Connector Line */}
                  <div className="mx-auto h-6 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-500" />

                  {/* Node 3 */}
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121218] p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 font-bold text-xs">
                        03
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Razorpay Order + Audit Ledger</div>
                        <div className="text-[10px] text-slate-400">HMAC signed & SHA-256 ledger committed</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-400">
                      Fulfilled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: INTEGRATIONS SECTION */}
        {/* ========================================================================= */}
        <section id="integrations" className="mx-auto max-w-6xl px-4 py-20 border-t border-white/10">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <div className="fiilo-badge">
              <Globe size={14} />
              <span>30+ Native Integrations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Connects with Your Whole Stack
            </h2>
            <p className="text-sm text-slate-400">
              Integrate with your favorite CRMs, communications tools, databases, and payment processors in minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {integrationList.map((app) => (
              <div
                key={app.name}
                className="fiilo-card p-5 text-center flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black transition group-hover:scale-110 shadow-md"
                  style={{ backgroundColor: `${app.color}20`, color: app.color }}
                >
                  {app.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-purple-300 transition">
                  {app.name}
                </div>
                <div className="text-[9px] text-slate-500 font-mono">{app.category}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: WORKFLOW TIMELINE */}
        {/* ========================================================================= */}
        <section id="workflow" className="mx-auto max-w-6xl px-4 py-20 border-t border-white/10">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <div className="fiilo-badge">
              <Sliders size={14} />
              <span>Simple 5-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              How Fiilo Powers Autonomous Commerce
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {[
              { num: "01", title: "Collect", desc: "Ingest multi-turn customer queries and intent constraints." },
              { num: "02", title: "Analyze", desc: "Extract budget limits and audio/gaming latency specs." },
              { num: "03", title: "Generate", desc: "Assemble zero-hallucination recommendation bundles." },
              { num: "04", title: "Automate", desc: "Apply 15-minute autonomous stock reservation on drop." },
              { num: "05", title: "Deploy", desc: "Cryptographically execute payment & HMAC SHA-256 validation." },
            ].map((step) => (
              <div key={step.num} className="fiilo-card p-6 space-y-3">
                <div className="text-2xl font-black text-purple-400 font-mono">{step.num}</div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: STATS COUNTERS */}
        {/* ========================================================================= */}
        <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="fiilo-card p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">50K+</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Active Founders</div>
            </div>
            <div className="fiilo-card p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">99.9%</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Policy Accuracy</div>
            </div>
            <div className="fiilo-card p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">120+</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Native Integrations</div>
            </div>
            <div className="fiilo-card p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">8M+</div>
              <div className="text-xs text-slate-400 mt-1 font-semibold">Automated Actions</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: TESTIMONIALS CAROUSEL / TABS */}
        {/* ========================================================================= */}
        <section className="mx-auto max-w-6xl px-4 py-20 border-t border-white/10">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <div className="fiilo-badge">
              <Star size={14} />
              <span>Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              See why users love Fiilo
            </h2>
          </div>

          {/* Company Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {testimonialsData.map((item, idx) => (
              <button
                key={item.company}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                  activeTab === idx
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.company}
              </button>
            ))}
          </div>

          {/* Active Testimonial Card */}
          <div className="fiilo-card rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-white/[0.05] via-[#100f1a] to-transparent">
            <div className="grid gap-8 md:grid-cols-12 items-center">
              <div className="md:col-span-8 space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  &ldquo;{testimonialsData[activeTab].quote}&rdquo;
                </blockquote>

                <div>
                  <div className="font-extrabold text-white text-base">
                    {testimonialsData[activeTab].name}
                  </div>
                  <div className="text-xs text-purple-400 font-mono">
                    {testimonialsData[activeTab].role}
                  </div>
                </div>
              </div>

              {/* Stats Box */}
              <div className="md:col-span-4 space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {testimonialsData[activeTab].stat1}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {testimonialsData[activeTab].stat1Text}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {testimonialsData[activeTab].stat2}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {testimonialsData[activeTab].stat2Text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: PRICING SECTION */}
        {/* ========================================================================= */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 border-t border-white/10">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <div className="fiilo-badge">
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Flexible Plans for Growing Teams
            </h2>

            {/* Monthly / Yearly Switch */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-xs font-semibold ${!isYearly ? "text-white" : "text-slate-400"}`}>
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setIsYearly(!isYearly)}
                className="relative h-7 w-14 rounded-full bg-white/10 p-1 border border-white/20 transition"
              >
                <div
                  className={`h-5 w-5 rounded-full bg-purple-500 shadow-md transition-transform ${
                    isYearly ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold ${isYearly ? "text-white" : "text-slate-400"}`}>
                Yearly
              </span>
              <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                25% OFF
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {/* Starter */}
            <div className="fiilo-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Starter</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">
                    ${isYearly ? "22" : "29"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Perfect for boutique stores wanting autonomous intent recommendations.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  {["1 AI Shopping Agent", "Up to 500 orders / mo", "Deterministic Policy Engine", "Standard Email Support"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-slate-300">
                      <Check size={14} className="text-purple-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href="/assistant" className="w-full fiilo-btn-secondary justify-center py-3 text-xs">
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Pro (Highlighted) */}
            <div className="fiilo-card p-8 flex flex-col justify-between relative border-purple-500 shadow-2xl shadow-purple-950/50 bg-[#120f20]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-md">
                Most Popular
              </div>

              <div className="space-y-4 mt-2">
                <div className="text-sm font-bold text-purple-400 uppercase tracking-wider">Pro Merchant</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">
                    ${isYearly ? "59" : "79"}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For scaling brands wanting contextual upselling and 15-minute checkout recovery.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  {[
                    "Unlimited AI Agents",
                    "Autonomous 15-Min Hold (RF-REC-02)",
                    "Contextual Upsell Multiplier (+28% AOV)",
                    "Cryptographic SHA-256 Audit Ledger",
                    "Razorpay One-Click Checkout",
                    "Priority 24/7 Support",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-slate-200">
                      <Check size={14} className="text-purple-400" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href="/assistant" className="w-full fiilo-btn-primary justify-center py-3.5 text-xs">
                  Get Started with Pro
                </Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="fiilo-card p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Enterprise</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">
                    ${isYearly ? "149" : "199"}
                  </span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Custom models, dedicated SLA, on-prem database connectors, and enterprise governance.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                  {[
                    "Custom Multi-Model Orchestration",
                    "Custom Margin & Discount Policies",
                    "Dedicated Solutions Engineer",
                    "99.99% Uptime SLA",
                    "Custom CRM & ERP Webhooks",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-slate-300">
                      <Check size={14} className="text-purple-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href="/dashboard" className="w-full fiilo-btn-secondary justify-center py-3 text-xs">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section id="faq" className="mx-auto max-w-4xl px-4 py-20 border-t border-white/10">
          <div className="text-center space-y-3 mb-12">
            <div className="fiilo-badge">
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="fiilo-card overflow-hidden rounded-2xl border border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white transition hover:text-purple-300"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-purple-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 11: LARGE CTA BANNER */}
        {/* ========================================================================= */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="fiilo-card rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 border-purple-500/30 shadow-2xl shadow-purple-950/60">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Ready to scale your sales with AI?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Join 25,000+ founders using Fiilo to automate shopping conversations, expand order value, and recover dropped revenue.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/assistant" className="fiilo-btn-primary py-3.5 px-8 text-sm">
                  <span>Open 3-Pane Command Center</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 12: 5-COLUMN FOOTER */}
        {/* ========================================================================= */}
        <footer className="border-t border-white/10 bg-[#060608] py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-5 border-b border-white/10 pb-12">
              {/* Col 1: Brand */}
              <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white font-black text-xs">
                    F
                  </div>
                  <span className="text-lg font-black text-white">Fiilo</span>
                </div>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  Autonomous Commerce Intelligence Platform built for the Razorpay AI Buildathon (Track 01 — AI Growth & Agentic Commerce).
                </p>
              </div>

              {/* Col 2 */}
              <div className="space-y-3 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Product</div>
                <div><Link href="/assistant" className="text-slate-400 hover:text-white transition">Shopping Console</Link></div>
                <div><Link href="/dashboard" className="text-slate-400 hover:text-white transition">Merchant Governance</Link></div>
                <div><Link href="/recommendations" className="text-slate-400 hover:text-white transition">Product Catalog</Link></div>
              </div>

              {/* Col 3 */}
              <div className="space-y-3 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Integrations</div>
                <div><span className="text-slate-400">Slack</span></div>
                <div><span className="text-slate-400">Razorpay</span></div>
                <div><span className="text-slate-400">Stripe</span></div>
                <div><span className="text-slate-400">HubSpot</span></div>
              </div>

              {/* Col 4 */}
              <div className="space-y-3 text-xs">
                <div className="font-bold text-white uppercase tracking-wider">Status</div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>All Systems Live</span>
                </div>
                <div className="text-slate-500">Track 01 Winner Edition</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 font-mono">
              <div>© 2026 Fiilo · Autonomous Commerce Intelligence Platform</div>
              <div>Razorpay AI Buildathon Track 01</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
