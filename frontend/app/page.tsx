export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
        RAFON AI
      </h1>

      <p className="mt-6 max-w-2xl text-center text-slate-300 text-lg">
        Autonomous Commerce Intelligence Platform built for Razorpay AI Buildathon
        2026.
      </p>

      <button className="mt-10 rounded-full bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-500 transition">
        Launch Demo
      </button>
    </main>
  );
}
