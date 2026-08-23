"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, Bot, RotateCcw } from "lucide-react";

import ChatMessage from "./ChatMessage";
import IntentPanel from "./IntentPanel";
import ProductRecommendation from "./ProductRecommendation";
import PromptChips from "./PromptChips";

interface ChatWindowProps {
  onAddToCart: () => void;
}

export default function ChatWindow({
  onAddToCart,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [activated, setActivated] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const runDemo = (message = "Gaming earbuds under ₹6000") => {
    setInput("");
    setActivated(true);
    setShowRecommendation(false);

    window.setTimeout(() => {
      setShowRecommendation(true);
    }, 500);

    void message;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    const shouldUseFeaturedDemo =
      input.toLowerCase().includes("earbud") ||
      input.toLowerCase().includes("gaming") ||
      input.includes("6000");

    if (shouldUseFeaturedDemo) {
      runDemo(input);
    } else {
      setActivated(true);
      setShowRecommendation(false);
    }
  };

  const reset = () => {
    setInput("");
    setActivated(false);
    setShowRecommendation(false);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-500 text-slate-950">
              <Bot size={17} />
            </div>

            <div>
              <div className="text-sm font-bold">
                RAFON AI Shopping Assistant
              </div>

              <div className="text-[10px] uppercase tracking-wider text-emerald-300">
                Autonomous commerce agent
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-500 transition hover:text-white"
            title="Reset conversation"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        <div className="min-h-[520px] space-y-5 p-5">
          <ChatMessage role="assistant">
            Hello! I&apos;m <strong>RAFON AI</strong>, your autonomous
            shopping assistant. Tell me what you&apos;re looking for,
            your budget, or specific requirements.
          </ChatMessage>

          {activated && (
            <>
              <ChatMessage role="user">
                I need wireless earbuds for gaming under ₹6000.
              </ChatMessage>

              <ChatMessage role="assistant">
                I&apos;ve parsed your request. I&apos;m prioritizing gaming
                audio, low latency and a ₹6,000 budget ceiling.
                {showRecommendation && (
                  <ProductRecommendation
                    onAddToCart={onAddToCart}
                  />
                )}
              </ChatMessage>
            </>
          )}
        </div>

        <div className="border-t border-white/10 p-5">
          {!activated && (
            <div className="mb-4">
              <PromptChips onSelect={runDemo} />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-2"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tell RAFON what you want to buy..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600"
            />

            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-500 text-slate-950 transition hover:scale-105"
              aria-label="Send message"
            >
              <ArrowUp size={17} />
            </button>
          </form>
        </div>
      </div>

      <IntentPanel active={activated} />
    </div>
  );
}
