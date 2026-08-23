"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Sparkles, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import UpsellCard from "@/components/cart/UpsellCard";

interface CartItemData {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  quantity: number;
  icon: string;
}

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState<CartItemData[]>([
    {
      id: "nothing-ear-a",
      name: "Nothing Ear (a)",
      variant: "Black Edition · 45ms Low-Latency Gaming Mode",
      price: 5499,
      originalPrice: 7999,
      quantity: 1,
      icon: "🎧",
    },
  ]);

  const [upsellAdded, setUpsellAdded] = useState(false);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    [items],
  );

  const discount = upsellAdded ? 700 : 0;

  const total = Math.max(0, subtotal + (upsellAdded ? 499 : 0) - discount);

  const increase = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrease = (id: string) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const remove = (id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id),
    );
  };

  const addUpsell = () => {
    if (upsellAdded) return;

    setUpsellAdded(true);

    setItems((current) => [
      ...current,
      {
        id: "65w-gan",
        name: "65W GaN Fast Charger",
        variant: "Dual USB-C PD 3.0 · RAFON Bundle Perk",
        price: 499,
        originalPrice: 1199,
        quantity: 1,
        icon: "⚡",
      },
    ]);
  };

  return (
    <AppShell
      title="Smart Cart"
      subtitle="AI-assisted basket optimization"
    >
      <main className="min-h-screen bg-[#06080f] px-5 py-7 text-white lg:px-8 lg:py-9">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <button
              type="button"
              onClick={() => router.push("/recommendations")}
              className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to recommendations
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              <ShoppingBag size={14} />
              Smart cart
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Your commerce journey is ready.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              RAFON has prepared the basket and identified a contextual
              accessory without breaking the customer&apos;s purchase
              constraints.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.7fr]">
            <section className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center">
                  <ShoppingBag className="mx-auto text-slate-600" size={34} />

                  <h2 className="mt-4 font-bold">
                    Your smart cart is empty
                  </h2>

                  <button
                    type="button"
                    onClick={() => router.push("/assistant")}
                    className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950"
                  >
                    Ask RAFON AI
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onIncrease={() => increase(item.id)}
                    onDecrease={() => decrease(item.id)}
                    onRemove={() => remove(item.id)}
                  />
                ))
              )}

              {!upsellAdded && items.length > 0 && (
                <UpsellCard onAdd={addUpsell} />
              )}

              {upsellAdded && (
                <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                    <Sparkles size={16} />
                    RAFON bundle applied
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    The AI suggestion was accepted and the bundle discount
                    was applied within the configured guardrail.
                  </p>
                </div>
              )}
            </section>

            <aside className="h-fit">
              <CartSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                onCheckout={() => router.push("/checkout")}
              />
            </aside>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
