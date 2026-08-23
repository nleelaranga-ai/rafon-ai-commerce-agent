import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

export default function ChatMessage({
  role,
  children,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={[
        "flex gap-3",
        isUser ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      {!isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-blue-500 text-slate-950">
          <Bot size={17} />
        </div>
      )}

      <div
        className={[
          "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6",
          isUser
            ? "bg-gradient-to-r from-blue-500 to-cyan-400 font-medium text-slate-950"
            : "border border-white/10 bg-white/[0.04] text-slate-200",
        ].join(" ")}
      >
        {children}
      </div>

      {isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300">
          <User size={17} />
        </div>
      )}
    </div>
  );
}
