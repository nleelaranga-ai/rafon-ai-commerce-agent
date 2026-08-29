"use client";

import Link from "next/link";
import { Sparkles, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080d]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand Logo with Avoora styling */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5812] to-[#FF7A3D] text-white shadow-lg shadow-[#FF5812]/25 group-hover:scale-105 transition">
            <Zap size={20} className="fill-white" />
          </div>

          <div>
            <div className="flex items-center gap-1 text-base font-black tracking-tight text-white font-sans">
              <span>RAFON</span>
              <span className="text-[10px] text-[#FF5812] font-mono">®</span>
            </div>
            <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#8e95a5]">
              Autonomous Commerce
            </div>
          </div>
        </Link>

        {/* Numbered Navigation Menu (Avoora Style) */}
        <nav className="hidden items-center gap-8 text-xs font-mono text-[#8e95a5] md:flex">
          <Link
            href="/assistant"
            className="flex items-center gap-1.5 transition hover:text-white group"
          >
            <span className="text-white/40 group-hover:text-[#FF5812] transition font-bold">(01)</span>
            <span className="font-sans font-semibold text-slate-300 group-hover:text-white">AI Console</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 transition hover:text-white group"
          >
            <span className="text-white/40 group-hover:text-[#FF5812] transition font-bold">(02)</span>
            <span className="font-sans font-semibold text-slate-300 group-hover:text-white">Merchant Hub</span>
          </Link>

          <Link
            href="/recommendations"
            className="flex items-center gap-1.5 transition hover:text-white group"
          >
            <span className="text-white/40 group-hover:text-[#FF5812] transition font-bold">(03)</span>
            <span className="font-sans font-semibold text-slate-300 group-hover:text-white">Catalog</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE AGENT ONLINE
          </div>
        </nav>

        {/* Kinetic Rolling CTA Button */}
        <div className="flex items-center gap-3">
          <Link href="/assistant" className="avoora-btn avoora-btn-orange">
            <div className="text-roll-wrapper">
              <span className="text-roll-item text-roll-primary">Launch Agent</span>
              <span className="text-roll-item text-roll-secondary">Launch Agent</span>
            </div>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

