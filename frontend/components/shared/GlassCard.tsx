import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10",
        "bg-[rgba(13,19,36,0.72)]",
        "backdrop-blur-xl",
        "shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
