import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RAFON AI",
  description: "Autonomous Commerce Intelligence Platform for Razorpay AI Buildathon 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
