"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bot,
  CreditCard,
  LayoutDashboard,
  Package,
  ReceiptText,
  Settings,
  ShoppingBag,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    section: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "AI Assistant",
        href: "/assistant",
        icon: Bot,
      },
    ],
  },
  {
    section: "Commerce",
    items: [
      {
        label: "Recommendations",
        href: "/recommendations",
        icon: Sparkles,
      },
      {
        label: "Smart Cart",
        href: "/cart",
        icon: ShoppingBag,
      },
      {
        label: "Checkout",
        href: "/checkout",
        icon: CreditCard,
      },
    ],
  },
  {
    section: "Intelligence",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        label: "AI Audit",
        href: "/audit",
        icon: ReceiptText,
      },
      {
        label: "Catalog",
        href: "/catalog",
        icon: Package,
      },
    ],
  },
  {
    section: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col",
          "border-r border-white/10 bg-[#090d18]/95 backdrop-blur-2xl",
          "transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-500 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Bot size={18} />
            </div>

            <div>
              <div className="text-sm font-black tracking-tight text-white">
                RAFON AI
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Agentic Commerce
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          {navigation.map((group) => (
            <div key={group.section} className="mb-6">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                {group.section}
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={[
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "border border-cyan-400/20 bg-cyan-400/[0.07] text-white shadow-[0_0_20px_rgba(0,242,254,0.06)]"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
                      ].join(" ")}
                    >
                      <Icon
                        size={17}
                        className={
                          active ? "text-cyan-300" : "text-slate-500"
                        }
                      />

                      <span>{item.label}</span>

                      {item.label === "Dashboard" && (
                        <span className="ml-auto rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                          LIVE
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl border border-blue-400/10 bg-blue-400/[0.04] p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
              <WalletCards size={14} />
              Razorpay Buildathon
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              AI Growth & Agentic Commerce
            </p>

            <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-emerald-300">
              <Activity size={12} />
              Agent system online
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
