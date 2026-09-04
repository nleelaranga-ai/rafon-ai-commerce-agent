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
        "Hello! I'm **RAFON AI**, your autonomous commerce intelligence agent powered by Grok-2. Tell me what audio gear you're shopping for, your budget ceiling, or specific latency & noise cancellation requirements.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string>("conv_session_01");
  const [loading, setLoading] = useState(false);

  // Telemetry & Explainability state
  const [telemetry, setTelemetry] = useState<TelemetryStep[]>([]);
  const [currentIntent, setCurrentIntent] = useState<string>("GAMING_AUDIO");
  const [currentBudget, setCurrentBudget] = useState<number | null>(6000);
  const [confidence, setConfidence] = useState<number>(0.98);
  const [budgetPct, setBudgetPct] = useState<number>(91.6);
  const [modelUsed, setModelUsed] = useState<string>("Grok-2-Commerce");
  const [activeTraceId, setActiveTraceId] = useState<string>("trc_9a81");
  const [reasoningSummary, setReasoningSummary] = useState<string>(
    "Extracted gaming low-latency spec (<50ms) and matched Nothing Ear (a) at ₹5,499. The 65W GaN Charger (+₹499) was proposed as an upsell because the combined price ₹5,998 stays within the stated ₹6,000 budget ceiling."
  );
  const [rejectedProducts, setRejectedProducts] = useState<Array<{ id: string; name: string; reason: string }>>([
    { id: "boat-141", name: "boAt Airdopes 141", reason: "Latency 65ms exceeds gaming threshold (<=50ms)" },
    { id: "sony-wh", name: "Sony WH-1000XM5", reason: "Price ₹29,990 exceeds stated ₹6,000 budget cap" },
  ]);
  const [sessionMemory, setSessionMemory] = useState<Record<string, any>>({
    budget: 6000,
    preferred_brand: "Nothing",
    device_type: "Mobile/Laptop",
  });

  // Multimodal & Search Simulation
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"IDLE" | "ORDER_CREATED" | "OPENED" | "AUTHORIZED" | "CAPTURED" | "WEBHOOK_VERIFIED" | "AUDIT_COMMITTED">("IDLE");
  const [activePaymentMethod, setActivePaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");

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

  // Handle Voice Search Simulation
  const handleVoiceSearch = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      setInput("I need ultra-low latency earbuds under ₹6000 for gaming.");
      handleSendMessage("I need ultra-low latency earbuds under ₹6000 for gaming.");
    }, 2200);
  };

  // Handle Image Search Simulation
  const handleImageSearch = () => {
    setIsUploadingImage(true);
    setTimeout(() => {
      setIsUploadingImage(false);
      handleSendMessage("Find audio gear matching this yellow transparent earbud style.");
    }, 1500);
  };

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
      setModelUsed(res.model_used || "Grok-2-Commerce");
      if (res.reasoning_summary) setReasoningSummary(res.reasoning_summary);
      if (res.rejected_products && res.rejected_products.length > 0) setRejectedProducts(res.rejected_products);
      if (res.memory_updates) setSessionMemory((prev) => ({ ...prev, ...res.memory_updates }));
      setActiveTraceId(`trc_${Math.random().toString(36).substring(2, 8)}`);

      let productObj: Product | null = null;
      if (res.recommended_product_id === "nothing-ear-a" || !res.recommended_product_id) {
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
        <div className="lg:col-span-5 flex flex-col rounded-3xl border border-white/10 bg-[#0c0d16]/90 p-5 shadow-2xl backdrop-blur-xl min-h-[620px]">
          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-black shadow-md">
                <Bot size={18} />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>AI Shopping Console</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Grok-2 Multi-Agent Active
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetAll}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition active:scale-95"
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
                  className={`rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-[92%] ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md"
                      : "border border-white/10 bg-white/[0.04] text-slate-200 backdrop-blur-md"
                  }`}
                >
                  <p className="whitespace-pre-line font-sans">{m.content}</p>

                  {/* Render Product Pick Card if present */}
                  {m.recommendedProduct && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-purple-500/30 bg-purple-950/30 p-3.5 shadow-lg">
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-purple-300 border-b border-purple-500/20 pb-2">
                        <span className="flex items-center gap-1">
                          <Sparkles size={13} className="text-purple-400" />
                          Top Autonomous Match
                        </span>
                        <span className="text-emerald-400 font-bold font-mono">
                          {m.recommendedProduct.match_score}% MATCH
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20 text-2xl shadow-sm border border-purple-500/30">
                            🎧
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white font-sans">
                              {m.recommendedProduct.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium">
                              45ms Gaming Mode · 45dB Smart ANC
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-extrabold text-white font-mono">
                            ₹{m.recommendedProduct.price.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-500 line-through font-mono">
                            ₹{m.recommendedProduct.original_price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-purple-500/20 pt-2.5">
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono font-semibold">
                          <CheckCircle2 size={12} /> Bounded ≤ ₹6,000 Budget
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
                          className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 text-[11px] font-bold text-white transition hover:opacity-90 shadow-md active:scale-95"
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
                <span className="mt-1 text-[9px] font-mono text-slate-500 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-purple-400 font-medium font-mono">
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                <span>Grok-2 reasoning & deterministic policy check in progress...</span>
              </div>
            )}

            {isRecordingVoice && (
              <div className="flex items-center gap-2 text-xs text-rose-400 font-medium font-mono animate-pulse">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Listening to voice query (Audio Stream active)...</span>
              </div>
            )}

            {isUploadingImage && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium font-mono animate-pulse">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>Analyzing uploaded image attributes & visual embeddings...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts & Semantic Filter Chips */}
          <div className="border-t border-white/10 pt-3">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {[
                { label: "🎮 Gaming <50ms", prompt: "I need wireless gaming earbuds under ₹6000 with under 50ms latency" },
                { label: "✈️ Travel ANC >40dB", prompt: "Recommend noise-cancelling headphones for flight travel under ₹9000" },
                { label: "💰 Under ₹4000", prompt: "Best affordable earbuds with great battery under ₹4000" },
                { label: "🎁 Bundle Upsell", prompt: "Add high-margin fast charger upsell within budget" },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleSendMessage(chip.prompt)}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono font-semibold text-slate-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300 transition active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input form with Voice & Image buttons */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 focus-within:border-purple-500 focus-within:bg-white/[0.07] transition"
            >
              {/* Voice Search Button */}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition ${
                  isRecordingVoice
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
                title="Voice Search"
              >
                🎙️
              </button>

              {/* Image Search Button */}
              <button
                type="button"
                onClick={handleImageSearch}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition ${
                  isUploadingImage
                    ? "bg-cyan-500 text-white animate-pulse"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
                title="Image Search Upload"
              >
                📷
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RAFON (e.g. Earbuds for gaming under ₹6000)..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-white outline-none placeholder:text-slate-500 font-sans"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-bold transition hover:opacity-90 active:scale-95 disabled:opacity-50 shadow-md"
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
            reasoningSummary={reasoningSummary}
            rejectedProducts={rejectedProducts}
            sessionMemory={sessionMemory}
          />
        </div>

        {/* Pane 3: Reactive Smart Cart & Razorpay Checkout (3 cols) */}
        <div className="lg:col-span-3 flex flex-col rounded-3xl border border-white/10 bg-[#0c0d16]/90 p-5 shadow-2xl backdrop-blur-xl">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={17} className="text-purple-400" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Smart Basket</span>
              </div>
            </div>
            <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30 font-mono">
              {cart.length} ITEMS
            </span>
          </div>

          {/* Cart Items List */}
          <div className="mt-4 flex-1 space-y-2.5 overflow-y-auto pr-1 max-h-[220px]">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    {item.name}
                    {item.is_upsell && (
                      <span className="rounded bg-purple-500/30 px-1 py-0.2 text-[8px] font-bold text-purple-300 uppercase font-mono">
                        Upsell
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Qty: {item.quantity} × ₹{item.unit_price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-white font-mono">
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
            <div className="mt-3 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-3 text-xs">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-purple-300">
                <span className="flex items-center gap-1">
                  <Zap size={13} className="fill-purple-400 text-purple-400" /> Contextual Upsell
                </span>
                <span className="rounded bg-purple-500/30 px-1.5 py-0.5 text-[8px] font-bold text-purple-200 font-mono">
                  SAVE ₹700
                </span>
              </div>
              <div className="mt-2 text-xs font-bold text-white">65W GaN Fast Charger</div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-sans">
                Dual USB-C 65W PD (Laptop & Phone ready)
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-400 font-mono">+₹499</span>
                  <span className="text-[9px] text-slate-500 line-through ml-1.5 font-mono">₹1,199</span>
                </div>
                <button
                  type="button"
                  onClick={addUpsell}
                  className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white transition hover:opacity-90 active:scale-95 shadow-md"
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
              <span className="font-semibold text-white">₹{subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-400 font-semibold font-mono">
                <span>Rescue Code ({discountCode})</span>
                <span>- ₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm font-extrabold font-mono">
              <span className="text-slate-300">Total:</span>
              <span className="text-white text-lg font-extrabold">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Razorpay Launch Button */}
          <div className="mt-4">
            {checkoutSuccess ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 size={16} />
                  Payment Verified & Fulfilled
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Razorpay HMAC Signature: VALID (SHA-256)
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCleanCheckout}
                className="w-full fiilo-btn-primary justify-center py-3.5 text-xs shadow-lg"
              >
                <span>Pay via Razorpay (₹{total.toLocaleString()})</span>
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
