"use client";

import Link from "next/link";
import { ArrowRight, Bot, Layers, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080c]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand Logo with Fleet layout */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-950 font-black text-sm group-hover:bg-amber-400 transition">
            RF
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-sm font-black tracking-tight text-white font-sans uppercase">
              <span>RAFON</span>
              <span className="text-[10px] text-amber-400 font-mono">CORE</span>
            </div>
            <div className="plus-tag text-[9px] text-slate-400">
              Autonomous Commerce
            </div>
          </div>
        </Link>

        {/* Tactical Fleet Navigation with Plus Tags */}
        <nav className="hidden items-center gap-8 text-xs font-mono md:flex">
          <Link
            href="/assistant"
            className="flex items-center gap-1.5 text-slate-300 transition hover:text-white group"
          >
            <span className="text-white/40 font-bold group-hover:text-amber-400">+</span>
            <span className="font-sans font-semibold">Shopping Console</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-slate-300 transition hover:text-white group"
          >
            <span className="text-white/40 font-bold group-hover:text-amber-400">+</span>
            <span className="font-sans font-semibold">Merchant Governance</span>
          </Link>

          <Link
            href="/recommendations"
            className="flex items-center gap-1.5 text-slate-300 transition hover:text-white group"
          >
            <span className="text-white/40 font-bold group-hover:text-amber-400">+</span>
            <span className="font-sans font-semibold">Catalog</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AGENT ONLINE · TRACK 01
          </div>
        </nav>

        {/* Fleet Tactical Button */}
        <div className="flex items-center gap-3">
          <Link href="/assistant" className="fleet-btn fleet-btn-yellow">
            <span>Launch AI Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}


