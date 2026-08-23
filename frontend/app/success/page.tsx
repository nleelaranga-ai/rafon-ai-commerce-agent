import AppShell from "@/components/layout/AppShell";
import PaymentSuccess from "@/components/checkout/PaymentSuccess";

export default function SuccessPage() {
  return (
    <AppShell
      title="Payment Success"
      subtitle="Verified payment and completed commerce journey"
    >
      <main className="min-h-screen bg-[#06080f] px-5 py-7 text-white lg:px-8 lg:py-9">
        <div className="mx-auto max-w-6xl">
          <PaymentSuccess />
        </div>
      </main>
    </AppShell>
  );
}
