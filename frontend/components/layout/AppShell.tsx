"use client";

import { ReactNode, useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AppShell({
  children,
  title,
  subtitle,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06080f]/75 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-5 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Open navigation"
                  onClick={() => setMobileOpen(true)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 lg:hidden"
                >
                  <Menu size={18} />
                </button>

                <div>
                  <div className="text-sm font-bold text-white">
                    {title}
                  </div>

                  {subtitle && (
                    <div className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">
                      {subtitle}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 sm:flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Agent Active
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Sparkles size={16} className="text-cyan-300" />
                </div>
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
