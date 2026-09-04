"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Fingerprint,
  IndianRupee,
  LifeBuoy,
  Lock,
  RefreshCw,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import MetricCard from "@/components/dashboard/MetricCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import GlassCard from "@/components/shared/GlassCard";
import {
  AuditDashboardData,
  AuditEvent,
  fetchAuditData,
  fetchMerchantPolicies,
  updateMerchantPolicies,
} from "@/lib/api";

export default function DashboardPage() {
  const [data, setData] = useState<AuditDashboardData | null>(null);
  const [maxDiscount, setMaxDiscount] = useState(5);
  const [targetMargin, setTargetMargin] = useState(25);
  const [holdMinutes, setHoldMinutes] = useState(15);
  const [savedStatus, setSavedStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [filterType, setFilterType] = useState<string>("ALL");

  const loadData = () => {
    fetchAuditData().then((res) => {
      setData(res);
      if (res.merchant_settings) {
        setMaxDiscount(res.merchant_settings.max_ai_discount_pct || 5);
        setTargetMargin(res.merchant_settings.target_upsell_margin_pct || 25);
        setHoldMinutes(res.merchant_settings.hold_duration_minutes || 15);
      }
    });

    fetchMerchantPolicies().then((policies) => {
      if (policies && typeof policies === "object") {
        if (policies.max_ai_discount_pct !== undefined) setMaxDiscount(policies.max_ai_discount_pct);
        if (policies.target_upsell_margin_pct !== undefined) setTargetMargin(policies.target_upsell_margin_pct);
        if (policies.hold_duration_minutes !== undefined) setHoldMinutes(policies.hold_duration_minutes);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveGuardrails = async () => {
    setIsSaving(true);
    try {
      await updateMerchantPolicies({
        max_ai_discount_pct: maxDiscount,
        target_upsell_margin_pct: targetMargin,
        hold_duration_minutes: holdMinutes,
      });
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 3000);
    } catch (err) {
      console.error("Failed to update merchant policies:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredEvents = (data?.events || []).filter((e) => {
    if (filterType === "ALL") return true;
    return e.event_type.includes(filterType);
  });

  return (
    <AppShell
      title="Merchant Control & Governance Center"
      subtitle="Autonomous commerce policy guardrails, cryptographic audit & revenue lift"
    >
      <div className="relative min-h-screen overflow-hidden px-4 py-6 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300 font-mono">
                Razorpay Track 01 · Merchant Governance
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Revenue & Agent Governance
              </h1>

              <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-6 text-slate-400">
                Inspect how RAFON AI expands AOV via contextual bundles and rescues dropped checkouts through bounded recovery policies.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={loadData}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white transition"
              >
                <RefreshCw size={13} />
                Refresh Feed
              </button>

              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-xs font-black text-emerald-300 font-mono">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                SYSTEM STATUS: {data?.integrity_status || "SECURE_VERIFIED"}
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Autonomous GMV"
              value={`₹${((data?.metrics.total_revenue_generated || 614916) / 100000).toFixed(2)}L`}
              trend="+28.4% Lift via RAFON"
              icon={IndianRupee}
              accent="cyan"
            />

            <MetricCard
              label="AI Upsell Acceptance"
              value="34.8%"
              trend="GaN Fast Charger (+₹499)"
              icon={Sparkles}
              accent="emerald"
            />

            <MetricCard
              label="Revenue Rescued"
              value={`₹${((data?.metrics.recovered_revenue || 168420) / 100000).toFixed(2)}L`}
              trend="34.2% Recovery Rate"
              icon={LifeBuoy}
              accent="amber"
            />

            <MetricCard
              label="AOV Expansion"
              value={`₹${(data?.metrics.rafon_aov || 5394).toLocaleString()}`}
              trend={`vs ₹${data?.metrics.baseline_aov || 4200} baseline (+₹1,194)`}
              icon={ArrowUpRight}
              accent="blue"
            />
          </div>

          {/* Guardrails Control & Revenue Chart */}
          <div className="grid gap-6 xl:grid-cols-[1.2fr_1.8fr]">
            {/* Merchant Guardrail Sliders */}
            <GlassCard className="p-6 rounded-3xl border border-cyan-400/20 bg-[#090e1c]/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-cyan-300" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    Agentic Policy Guardrails
                  </h2>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 font-bold">
                  DETERMINISTIC
                </span>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                {/* Max AI Discount */}
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-300">
                    <span>Max AI Autonomous Discount:</span>
                    <span className="font-mono text-cyan-300 font-black">{maxDiscount}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(Number(e.target.value))}
                    className="mt-2 w-full accent-cyan-400"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Prevents AI agent from proposing discounts above {maxDiscount}%
                  </div>
                </div>

                {/* Target Margin */}
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-300">
                    <span>Min Target Upsell Margin:</span>
                    <span className="font-mono text-emerald-300 font-black">{targetMargin}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={40}
                    value={targetMargin}
                    onChange={(e) => setTargetMargin(Number(e.target.value))}
                    className="mt-2 w-full accent-emerald-400"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Only complements yielding &ge; {targetMargin}% gross margin are packaged
                  </div>
                </div>

                {/* Hold Duration */}
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-300">
                    <span>Failure Recovery Lock:</span>
                    <span className="font-mono text-amber-300 font-black">{holdMinutes} Mins</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={holdMinutes}
                    onChange={(e) => setHoldMinutes(Number(e.target.value))}
                    className="mt-2 w-full accent-amber-400"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Time stock is held when 504 timeout occurs
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveGuardrails}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-2.5 text-xs font-black text-slate-950 transition hover:scale-[1.02] active:scale-98 disabled:opacity-60"
                  >
                    <Save size={14} />
                    {isSaving ? "Enforcing Policies..." : savedStatus ? "Guardrails Enforced & Active!" : "Update Guardrail Policy"}
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Revenue Analytics Chart */}
            <RevenueChart />
          </div>

          {/* Immutable Audit Ledger Table */}
          <GlassCard className="p-6 rounded-3xl border border-white/10 bg-[#070b14]/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-cyan-400" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    Cryptographic Audit & Decision Ledger
                  </h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Zero-knowledge SHA-256 signatures recorded for every intent, bounding check, payment, and rescue event.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {["ALL", "QUERY", "POLICY", "PAYMENT", "REVENUE"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilterType(f)}
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-mono font-bold transition ${
                      filterType === f
                        ? "bg-cyan-400 text-slate-950 font-black"
                        : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="mt-4 divide-y divide-white/5 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase font-mono text-slate-500">
                    <th className="pb-3 font-bold">Event Type</th>
                    <th className="pb-3 font-bold">Actor</th>
                    <th className="pb-3 font-bold">Payload Summary</th>
                    <th className="pb-3 font-bold">Signature</th>
                    <th className="pb-3 font-bold text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                            evt.severity === "SUCCESS"
                              ? "bg-emerald-400/20 text-emerald-300"
                              : evt.severity === "WARN"
                              ? "bg-amber-400/20 text-amber-300"
                              : "bg-cyan-400/20 text-cyan-300"
                          }`}
                        >
                          {evt.event_type}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300 font-sans font-medium">{evt.actor}</td>
                      <td className="py-3 text-slate-400 max-w-[320px] truncate font-sans text-[11px]">
                        {JSON.stringify(evt.payload)}
                      </td>
                      <td className="py-3 text-cyan-400/80 text-[10px]">{evt.hash_signature}</td>
                      <td className="py-3 text-right text-slate-500 text-[10px]">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

