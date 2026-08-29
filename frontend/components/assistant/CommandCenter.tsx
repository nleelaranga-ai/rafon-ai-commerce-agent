"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Fingerprint,
  Headphones,
  History,
  LayoutDashboard,
  Lock,
  Plus,
  RefreshCcw,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import {
  AuditEvent,
  ChatResponse,
  OrderItem,
  Product,
  RecoveryOffer,
  SpecComparison,
  TelemetryStep,
  createOrder,
  fetchAuditData,
  sendChatMessage,
  triggerPaymentRecovery,
  verifyPayment,
} from "@/lib/api";
import ChaosController from "./ChaosController";
import CognitiveStream from "./CognitiveStream";
import ProductComparisonCard from "./ProductComparisonCard";
import RecoveryDrawer from "./RecoveryDrawer";

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendedProduct?: Product | null;
  comparison?: SpecComparison | null;
  timestamp: string;
}

export default function CommandCenter() {
  // Conversation & AI state
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        "Hello! I'm **RAFON AI**, your autonomous commerce intelligence agent. Tell me what you're shopping for, your budget ceiling, or specific latency & audio requirements.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string>("conv_session_01");
  const [loading, setLoading] = useState(false);

  // Telemetry state
  const [telemetry, setTelemetry] = useState<TelemetryStep[]>([]);
  const [currentIntent, setCurrentIntent] = useState<string>("GREETING");
  const [currentBudget, setCurrentBudget] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number>(0.98);
  const [budgetPct, setBudgetPct] = useState<number>(0);
  const [modelUsed, setModelUsed] = useState<string>("gemini-2.5-flash");
  const [activeTraceId, setActiveTraceId] = useState<string>("trc_9a81");

  // Cart state
  const [cart, setCart] = useState<OrderItem[]>([
    {
      product_id: "nothing-ear-a",
      name: "Nothing Ear (a) TWS",
      quantity: 1,
      unit_price: 5499,
      is_upsell: false,
    },
  ]);
  const [upsellAdded, setUpsellAdded] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  // Recovery & Chaos state
  const [recoveryOffer, setRecoveryOffer] = useState<RecoveryOffer | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isMerchantView, setIsMerchantView] = useState(false);
  const [auditDockOpen, setAuditDockOpen] = useState(false);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    fetchAuditData().then((data) => setAuditEvents(data.events));
  }, [checkoutSuccess, recoveryOffer]);

  // Handle User Message Submission
  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim() || loading) return;

    const userMsg: MessageItem = {
      id: `u_${Date.now()}`,
      role: "user",
      content: msgText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res: ChatResponse = await sendChatMessage(msgText, conversationId, cart);

      setConversationId(res.conversation_id);
      setCurrentIntent(res.intent);
      setCurrentBudget(res.budget);
      setConfidence(res.confidence);
      setTelemetry(res.telemetry);
      setBudgetPct(res.budget_utilized_percentage);
      setModelUsed(res.model_used);
      setActiveTraceId(`trc_${Math.random().toString(36).substring(2, 8)}`);

      let productObj: Product | null = null;
      if (res.recommended_product_id === "nothing-ear-a") {
        productObj = {
          id: "nothing-ear-a",
          name: "Nothing Ear (a) TWS",
          category: "Audio",
          price: 5499,
          original_price: 7999,
          match_score: 98.6,
          specs: ["45ms Low Latency Gaming Mode", "45dB Smart ANC", "42.5 hrs battery"],
          icon: "headphones",
        };
      } else if (res.recommended_product_id === "boat-immortal-131") {
        productObj = {
          id: "boat-immortal-131",
          name: "boAt Immortal 131 Gaming",
          category: "Audio",
          price: 1499,
          original_price: 3490,
          match_score: 92.1,
          specs: ["BEAST Mode 40ms", "RGB Gaming LEDs", "40 hrs battery"],
          icon: "gamepad-2",
        };
      }

      const assistantMsg: MessageItem = {
        id: `a_${Date.now()}`,
        role: "assistant",
        content: res.reply,
        recommendedProduct: productObj,
        comparison: res.comparison,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If action is add to cart, ensure items are present
      if (res.action === "CART_ACTION" || msgText.toLowerCase().includes("add")) {
        if (!cart.some((i) => i.product_id === "nothing-ear-a")) {
          setCart((prev) => [
            ...prev,
            {
              product_id: "nothing-ear-a",
              name: "Nothing Ear (a) TWS",
              quantity: 1,
              unit_price: 5499,
              is_upsell: false,
            },
          ]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cart Handlers
  const addUpsell = () => {
    if (!upsellAdded) {
      setCart((prev) => [
        ...prev,
        {
          product_id: "fast-charger-65w",
          name: "65W GaN Fast Charger",
          quantity: 1,
          unit_price: 499,
          is_upsell: true,
        },
      ]);
      setUpsellAdded(true);
    }
  };

  const removeCartItem = (productId: string) => {
    setCart((prev) => prev.filter((it) => it.product_id !== productId));
    if (productId === "fast-charger-65w") {
      setUpsellAdded(false);
    }
  };

  const switchProductInCart = (newProductId: string) => {
    if (newProductId === "boat-immortal-131") {
      setCart([
        {
          product_id: "boat-immortal-131",
          name: "boAt Immortal 131 Gaming",
          quantity: 1,
          unit_price: 1499,
          is_upsell: false,
        },
        ...(upsellAdded
          ? [
              {
                product_id: "fast-charger-65w",
                name: "65W GaN Fast Charger",
                quantity: 1,
                unit_price: 499,
                is_upsell: true,
              },
            ]
          : []),
      ]);
    }
  };

  // Pricing calculations
  const subtotal = cart.reduce((acc, it) => acc + it.unit_price * it.quantity, 0);
  const discountAmount = discountCode === "RESCUE5" ? Math.floor(subtotal * 0.05) : 0;
  const total = Math.max(0, subtotal - discountAmount);

  // Execution: Clean Razorpay Checkout
  const handleCleanCheckout = async () => {
    const orderRes = await createOrder(cart, conversationId, discountCode || undefined);
    const verifyRes = await verifyPayment(
      orderRes.id,
      orderRes.razorpay_order_id,
      "pay_live_test_84719",
      "sig_valid_hash_9824"
    );
    if (verifyRes.success) {
      setCheckoutSuccess(true);
    }
  };

  // Execution: Chaos 504 Timeout simulation
  const handleSimulate504 = async () => {
    const orderRes = await createOrder(cart, conversationId, undefined);
    const offer = await triggerPaymentRecovery(
      orderRes.id,
      "ERR_BANK_504_TIMEOUT",
      "Bank gateway timed out during UPI authorization",
      "UPI"
    );
    setRecoveryOffer(offer);
  };

  // Recovery accepted
  const handleRecoverySuccess = async () => {
    if (recoveryOffer) {
      setDiscountCode(recoveryOffer.rescue_code);
      const verifyRes = await verifyPayment(
        recoveryOffer.order_id,
        "order_rescue_applied",
        "pay_rescue_verified",
        "sig_rescue_verified"
      );
      if (verifyRes.success) {
        setRecoveryOffer(null);
        setCheckoutSuccess(true);
      }
    }
  };

  const resetAll = () => {
    setMessages([
      {
        id: "m0",
        role: "assistant",
        content:
          "Hello! I'm **RAFON AI**, your autonomous commerce intelligence agent. Tell me what you're shopping for, your budget ceiling, or specific latency & audio requirements.",
        timestamp: "Just now",
      },
    ]);
    setCart([
      {
        product_id: "nothing-ear-a",
        name: "Nothing Ear (a) TWS",
        quantity: 1,
        unit_price: 5499,
        is_upsell: false,
      },
    ]);
    setUpsellAdded(false);
    setDiscountCode(null);
    setCheckoutSuccess(false);
    setRecoveryOffer(null);
    setBudgetPct(0);
    setTelemetry([]);
  };

  return (
    <div className="flex flex-col gap-5 min-h-[calc(100vh-100px)]">
      {/* Top Chaos & Demo Controller */}
      <ChaosController
        onCleanCheckout={handleCleanCheckout}
        onSimulate504Timeout={handleSimulate504}
        isMerchantView={isMerchantView}
        onToggleMerchantView={() => setIsMerchantView(!isMerchantView)}
      />

      {/* 3-Pane Unified Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 flex-1">
        {/* Pane 1: Adaptive Conversational Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-white/10 bg-[#090b12]/95 backdrop-blur-2xl p-5 shadow-2xl min-h-[620px]">
          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black">
                <Bot size={18} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5 font-mono">
                  <span className="text-amber-400 font-bold">+</span>
                  <span>SHOPPING CONSOLE</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AUTONOMOUS AGENT ACTIVE
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetAll}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white transition active:scale-95"
              title="Reset conversation session"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 space-y-4 overflow-y-auto py-4 pr-1 max-h-[460px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-xl px-4 py-3 text-xs leading-relaxed max-w-[92%] ${
                    m.role === "user"
                      ? "bg-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-400/20"
                      : "border border-white/10 bg-white/[0.03] text-slate-200 font-mono"
                  }`}
                >
                  <p className="whitespace-pre-line font-sans">{m.content}</p>

                  {/* Render Product Pick Card if present */}
                  {m.recommendedProduct && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-amber-400/30 bg-gradient-to-b from-amber-400/10 to-transparent p-3.5">
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-amber-400 border-b border-white/10 pb-2 font-mono">
                        <span className="flex items-center gap-1">
                          <Sparkles size={13} />
                          Top Autonomous Match
                        </span>
                        <span className="text-emerald-300 font-mono font-black">
                          {m.recommendedProduct.match_score}% MATCH
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-2xl">
                            🎧
                          </div>
                          <div>
                            <div className="text-sm font-black text-white font-sans">
                              {m.recommendedProduct.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              45ms Latency · 45dB ANC
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black font-mono text-amber-400">
                            ₹{m.recommendedProduct.price.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-500 line-through font-mono">
                            ₹{m.recommendedProduct.original_price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                        <span className="text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                          <CheckCircle2 size={12} /> Bounded $\le$ ₹6,000
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (!cart.some((i) => i.product_id === m.recommendedProduct?.id)) {
                              setCart((prev) => [
                                ...prev,
                                {
                                  product_id: m.recommendedProduct!.id,
                                  name: m.recommendedProduct!.name,
                                  quantity: 1,
                                  unit_price: m.recommendedProduct!.price,
                                  is_upsell: false,
                                },
                              ]);
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-1 text-[11px] font-black text-slate-950 transition hover:bg-amber-400"
                        >
                          <ShoppingCart size={12} />
                          Add to Basket
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Render Spec Comparison Card if present */}
                  {m.comparison && (
                    <ProductComparisonCard
                      comparison={m.comparison}
                      onSwitchProduct={switchProductInCart}
                    />
                  )}
                </div>
                <span className="mt-1 text-[9px] font-mono text-slate-600 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span>RAFON reasoning & policy checks in progress...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="border-t border-white/10 pt-3">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {[
                "Gaming earbuds under ₹6000",
                "Anything cheaper?",
                "Add to smart cart",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono font-semibold text-slate-300 hover:border-amber-400/50 hover:text-amber-400 transition active:scale-95"
                >
                  + {chip}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 p-1.5 focus-within:border-amber-400"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RAFON (e.g. Earbuds for gaming under ₹6000)..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 font-sans"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-bold transition hover:bg-amber-300 active:scale-95 disabled:opacity-50"
              >
                <ArrowUp size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Pane 2: Cognitive Decision Stream (4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <CognitiveStream
            telemetry={telemetry}
            intent={currentIntent}
            budget={currentBudget}
            confidence={confidence}
            budgetPct={budgetPct}
            modelUsed={modelUsed}
            traceId={activeTraceId}
          />
        </div>

        {/* Pane 3: Reactive Smart Cart & Razorpay Checkout (3 cols) */}
        <div className="lg:col-span-3 flex flex-col rounded-2xl border border-white/10 bg-[#090b12]/95 backdrop-blur-2xl p-5 shadow-2xl">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={17} className="text-amber-400" />
              <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5 font-mono">
                <span className="text-amber-400 font-bold">+</span>
                <span>SMART BASKET</span>
              </div>
            </div>
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-400">
              {cart.length} ITEMS
            </span>
          </div>

          {/* Cart Items List */}
          <div className="mt-4 flex-1 space-y-2.5 overflow-y-auto pr-1 max-h-[220px]">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    {item.name}
                    {item.is_upsell && (
                      <span className="rounded bg-amber-400/20 px-1 py-0.2 text-[8px] font-mono font-bold text-amber-300 uppercase">
                        Bundle
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Qty: {item.quantity} × ₹{item.unit_price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-slate-200">
                    ₹{(item.unit_price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.product_id)}
                    className="text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contextual Upsell Card */}
          {!upsellAdded && (
            <div className="mt-3 rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-400/10 to-transparent p-3 text-xs">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-amber-400 font-mono">
                <span className="flex items-center gap-1">
                  <Zap size={13} className="fill-amber-400" /> Contextual Upsell
                </span>
                <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[8px] font-black text-amber-400 font-mono">
                  SAVE ₹700
                </span>
              </div>
              <div className="mt-2 text-xs font-bold text-white">65W GaN Fast Charger</div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                Dual USB-C 65W PD (Laptop & Phone ready)
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-emerald-400">+₹499</span>
                  <span className="text-[9px] text-slate-500 line-through ml-1.5 font-mono">₹1,199</span>
                </div>
                <button
                  type="button"
                  onClick={addUpsell}
                  className="inline-flex items-center gap-1 rounded-md bg-amber-400 px-2.5 py-1 text-[10px] font-black text-slate-950 transition hover:bg-amber-300 active:scale-95"
                >
                  <Plus size={12} /> Add +₹499
                </button>
              </div>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="mt-4 border-t border-white/10 pt-3 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 font-mono">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-400 font-mono font-medium">
                <span>Rescue Code ({discountCode})</span>
                <span>- ₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm font-black">
              <span className="text-white">Total:</span>
              <span className="font-mono text-amber-400 text-lg font-black">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Razorpay Launch Button */}
          <div className="mt-4">
            {checkoutSuccess ? (
              <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-bold text-xs">
                  <CheckCircle2 size={16} />
                  Payment Verified & Fulfilled
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Razorpay HMAC Signature: VALID
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCleanCheckout}
                className="w-full fleet-btn fleet-btn-yellow justify-center py-3.5"
              >
                <span>Checkout via Razorpay (₹{total.toLocaleString()})</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>


      {/* Collapsible Immutable Audit & Trace Inspector Dock */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070b14]/90 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setAuditDockOpen(!auditDockOpen)}
          className="w-full flex items-center justify-between px-5 py-3 text-xs font-mono font-bold text-slate-400 hover:text-slate-200 transition"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-cyan-400" />
            <span>IMMUTABLE AUDIT & GOVERNANCE DOCK ({auditEvents.length} TRACE EVENTS)</span>
          </div>
          {auditDockOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        <AnimatePresence>
          {auditDockOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="border-t border-white/10 p-4 max-h-[260px] overflow-y-auto"
            >
              <div className="space-y-2 font-mono text-[11px]">
                {auditEvents.slice(0, 8).map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-slate-300"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          evt.severity === "SUCCESS"
                            ? "bg-emerald-400/20 text-emerald-300"
                            : evt.severity === "WARN"
                            ? "bg-amber-400/20 text-amber-300"
                            : "bg-cyan-400/20 text-cyan-300"
                        }`}
                      >
                        {evt.event_type}
                      </span>
                      <span className="text-slate-400 text-[10px]">{evt.actor}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500">
                      <span>{evt.hash_signature}</span>
                      <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Autonomous Failure Recovery Drawer */}
      <AnimatePresence>
        {recoveryOffer && (
          <RecoveryDrawer
            offer={recoveryOffer}
            onClose={() => setRecoveryOffer(null)}
            onRetrySuccess={handleRecoverySuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
