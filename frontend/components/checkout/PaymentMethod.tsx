"use client";

import { CreditCard, Landmark, Smartphone } from "lucide-react";

interface PaymentMethodProps {
  active: string;
  onSelect: (method: string) => void;
}

const methods = [
  {
    id: "upi",
    label: "UPI",
    icon: Smartphone,
  },
  {
    id: "card",
    label: "Card",
    icon: CreditCard,
  },
  {
    id: "netbanking",
    label: "Netbanking",
    icon: Landmark,
  },
];

export default function PaymentMethod({
  active,
  onSelect,
}: PaymentMethodProps) {
  return (
    <div className="space-y-2">
      {methods.map((method) => {
        const Icon = method.icon;

        const selected = active === method.id;

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={[
              "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition",
              selected
                ? "border-cyan-400/25 bg-cyan-400/[0.06]"
                : "border-white/10 bg-white/[0.025] hover:bg-white/[0.05]",
            ].join(" ")}
          >
            <div
              className={[
                "flex h-9 w-9 items-center justify-center rounded-lg",
                selected
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "bg-white/5 text-slate-500",
              ].join(" ")}
            >
              <Icon size={17} />
            </div>

            <span className="text-sm font-semibold text-white">
              {method.label}
            </span>

            {selected && (
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                Selected
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
