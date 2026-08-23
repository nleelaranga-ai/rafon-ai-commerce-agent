import { LucideIcon } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  accent?: "cyan" | "emerald" | "amber" | "blue";
}

const accentStyles = {
  cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-400/10",
  emerald: "text-emerald-300 bg-emerald-400/10 border-emerald-400/10",
  amber: "text-amber-300 bg-amber-400/10 border-amber-400/10",
  blue: "text-blue-300 bg-blue-400/10 border-blue-400/10",
};

export default function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
  accent = "cyan",
}: MetricCardProps) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </div>

          <div className="mt-3 text-3xl font-black tracking-tight">
            {value}
          </div>

          <div className="mt-2 text-[11px] font-semibold text-emerald-300">
            {trend}
          </div>
        </div>

        <div
          className={[
            "flex h-10 w-10 items-center justify-center rounded-xl border",
            accentStyles[accent],
          ].join(" ")}
        >
          <Icon size={18} />
        </div>
      </div>
    </GlassCard>
  );
}
