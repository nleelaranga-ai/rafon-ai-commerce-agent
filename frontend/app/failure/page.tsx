import AppShell from "@/components/layout/AppShell";
import RecoveryAgent from "@/components/checkout/RecoveryAgent";

export default function FailurePage() {
  return (
    <AppShell
      title="Payment Recovery"
      subtitle="Autonomous failure handling and bounded rescue workflow"
    >
      <main className="min-h-screen bg-[#06080f] px-5 py-7 text-white lg:px-8 lg:py-9">
        <div className="mx-auto max-w-6xl">
          <RecoveryAgent />
        </div>
      </main>
    </AppShell>
  );
}
