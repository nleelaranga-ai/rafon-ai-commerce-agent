"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-[#09090b]/80 px-6 backdrop-blur-2xl shadow-2xl shadow-purple-950/20">
        {/* Brand Logo with Fiilo styling */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white font-black text-xs shadow-lg shadow-purple-500/25 group-hover:scale-105 transition">
            F
          </div>

          <div className="flex items-center gap-1">
            <span className="text-lg font-black tracking-tight text-white font-sans">
              Fiilo
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
          </div>
        </Link>

        {/* Clean Nav Links */}
        <nav className="hidden items-center gap-7 text-xs font-medium text-slate-300 md:flex">
          <Link
            href="#features"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Features
          </Link>

          <Link
            href="#automations"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Automations
          </Link>

          <Link
            href="#integrations"
            className="transition hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          >
            Integrations
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




