interface PromptChipsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "Gaming earbuds under ₹6000",
  "20,000mAh power bank for travel",
  "Accessories for Google Pixel",
];

export default function PromptChips({
  onSelect,
}: PromptChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
