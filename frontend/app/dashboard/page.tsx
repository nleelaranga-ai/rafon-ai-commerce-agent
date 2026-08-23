import {
  Activity,
  ArrowUpRight,
  IndianRupee,
  LifeBuoy,
  Sparkles,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import MetricCard from "@/components/dashboard/MetricCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import GlassCard from "@/components/shared/GlassCard";

const activity = [
  {
    title: "Upsell bundle accepted",
    description:
      "Nothing Ear (a) + 65W GaN Charger",
    impact: "+₹499 incremental value",
    tone: "emerald",
  },
  {
    title: "Intent matched",
    description:
      "Gaming audio · budget ₹6,000 · low latency",
    impact: "98.6% product match",
    tone: "cyan",
  },
  {
    title: "Payment recovery started",
    description:
      "Bank timeout detected on checkout",
    impact: "Recovery workflow active",
    tone: "amber",
  },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Merchant Control Center"
      subtitle="Real-time telemetry on autonomous commerce and revenue"
    >
      <div className="relative min-h-screen overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Merchant intelligence
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Revenue & Agent Performance
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Monitor how RAFON AI influences conversion, order value and
                payment recovery.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2 text-xs font-semibold text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Autonomous agent active
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Autonomous GMV"
              value="₹18.4L"
              trend="+28.4% via AI"
              icon={IndianRupee}
              accent="cyan"
            />

            <MetricCard
              label="AI Upsell Conversion"
              value="34.8%"
              trend="+12.2% vs standard cart"
              icon={Sparkles}
              accent="emerald"
            />

            <MetricCard
              label="Cart Recovery Rate"
              value="72.4%"
              trend="₹4.12L rescued"
              icon={LifeBuoy}
              accent="amber"
            />

            <MetricCard
              label="AOV Expansion"
              value="+₹840"
              trend="Per completed checkout"
              icon={ArrowUpRight}
              accent="blue"
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
            <RevenueChart />

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold">
                    Live Agent Stream
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Recent autonomous events
                  </p>
                </div>

                <Activity
                  size={18}
                  className="text-emerald-300"
                />
              </div>

              <div className="mt-5 space-y-4">
                {activity.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/5 bg-white/[0.025] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.title}
                        </div>

                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </div>
                      </div>

                      <span
                        className={[
                          "rounded-full px-2 py-1 text-[9px] font-bold uppercase",
                          item.tone === "emerald"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : item.tone === "cyan"
                              ? "bg-cyan-400/10 text-cyan-300"
                              : "bg-amber-400/10 text-amber-300",
                        ].join(" ")}
                      >
                        Agent
                      </span>
                    </div>

                    <div className="mt-3 text-xs font-semibold text-slate-300">
                      {item.impact}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <GlassCard className="p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                AI assisted orders
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div className="text-3xl font-black">892</div>
                <div className="text-xs font-semibold text-emerald-300">
                  +18.7%
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Active carts
              </div>

              <div className="mt-3 text-3xl font-black">146</div>

              <div className="mt-2 text-xs text-slate-500">
                23 currently inside AI recovery flow
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Audit events
              </div>

              <div className="mt-3 text-3xl font-black">12.8K</div>

              <div className="mt-2 text-xs text-slate-500">
                Every decision recorded
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
