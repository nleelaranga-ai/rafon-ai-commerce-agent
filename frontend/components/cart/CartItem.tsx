"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({
  name,
  variant,
  price,
  originalPrice,
  quantity,
  icon,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-3xl">
            {icon}
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-white">{name}</h3>

            <p className="mt-1 text-xs text-slate-500">
              {variant}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-lg font-black">
                ₹{price.toLocaleString("en-IN")}
              </span>

              <span className="text-xs text-slate-600 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <button
              type="button"
              onClick={onDecrease}
              className="p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <Minus size={15} />
            </button>

            <span className="min-w-10 text-center text-sm font-bold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              className="p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <Plus size={15} />
            </button>
          </div>

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${name}`}
            className="rounded-xl border border-rose-400/10 bg-rose-400/[0.04] p-2.5 text-rose-300 transition hover:bg-rose-400/10"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
