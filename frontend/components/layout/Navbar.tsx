"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-[#09090b]/85 px-6 backdrop-blur-2xl shadow-2xl shadow-purple-950/25">
        {/* Brand Logo with RAFON AI */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white font-black text-xs shadow-lg shadow-purple-500/25 group-hover:scale-105 transition">
            RF
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-base font-black tracking-tight text-white font-sans">
              RAFON
            </span>
            <span className="rounded-full bg-purple-500/20 border border-purple-500/40 px-1.5 py-0.2 text-[9px] font-black text-purple-300">
              AI
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
          <Link
            href="/assistant"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Shopping Console
          </Link>

          <Link
            href="/dashboard"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Merchant Governance
          </Link>

          <Link
            href="#features"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Features
          </Link>

          <Link
            href="#workflow"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Workflow
          </Link>

          <Link
            href="#pricing"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Pricing
          </Link>

          <Link
            href="#faq"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            FAQ
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link href="/assistant" className="fiilo-btn-primary py-2 px-5 text-xs">
            <span>Launch AI Console</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </header>
  );
}
