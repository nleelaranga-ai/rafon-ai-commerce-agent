export default function AssistantPage() {
  return (
    <main className="min-h-screen bg-[#06080f] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          RAFON AI
        </div>

        <h1 className="mt-4 text-5xl font-black">
          AI Shopping Assistant
        </h1>

        <p className="mt-5 max-w-2xl text-slate-400">
          Tell RAFON what you want to buy and the agent will understand your
          intent, recommend products and prepare the commerce journey.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-300">
            Try:
          </p>

          <p className="mt-3 font-semibold text-cyan-300">
            “I need wireless earbuds for gaming under ₹6000.”
          </p>
        </div>
      </div>
    </main>
  );
}
