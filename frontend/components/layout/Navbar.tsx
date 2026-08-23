"use client";

import { Sparkles, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06080f]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-500 text-slate-950 shadow-lg shadow-cyan-400/20">
            <Sparkles size={18} />
          </div>

          <div>
            <div className="text-sm font-extrabold tracking-tight text-white">
              RAFON AI
            </div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              Agentic Commerce
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="/dashboard" className="transition hover:text-white">
            Dashboard
          </a>
          <a href="/assistant" className="transition hover:text-white">
            AI Assistant
          </a>
        </nav>

        <button
          type="button"
          aria-label="Open navigation"
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 md:hidden"
        >
          <Menu size={19} />
        </button>
      </div>
    </header>
  );
}
