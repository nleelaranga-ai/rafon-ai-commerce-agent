import {
  BrainCircuit,
  CircleCheck,
  Gauge,
  IndianRupee,
  Target,
} from "lucide-react";

interface IntentPanelProps {
  active: boolean;
}

export default function IntentPanel({
  active,
}: IntentPanelProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-2">
        <BrainCircuit size={18} className="text-cyan-300" />

        <div>
          <div className="text-sm font-bold text-white">
            Intent Inspector
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500">
            RAFON semantic parser
          </div>
        </div>
      </div>

      {active ? (
        <div className="mt-5 space-y-3">
          <IntentRow
            icon={Target}
            label="Intent"
            value="Gaming Audio"
          />

          <IntentRow
            icon={IndianRupee}
            label="Budget"
            value="≤ ₹6,000"
          />

          <IntentRow
            icon={Gauge}
            label="Latency"
            value="< 45ms"
          />

          <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Intent confidence
              </span>
              <span className="text-xs font-black text-emerald-300">
                98.6%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[98.6%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-white/10 p-4 text-xs leading-5 text-slate-500">
          Send a shopping request to activate the intent inspector.
        </div>
      )}
    </div>
  );
}

function IntentRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3">
      <Icon size={16} className="text-cyan-300" />

      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-slate-600">
          {label}
        </div>
        <div className="mt-1 text-sm font-semibold text-slate-200">
          {value}
        </div>
      </div>

      <CircleCheck size={15} className="text-emerald-300" />
    </div>
  );
}
