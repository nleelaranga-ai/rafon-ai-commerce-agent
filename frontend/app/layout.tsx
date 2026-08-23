import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAFON AI — Autonomous Commerce Intelligence",
  description:
    "RAFON AI helps merchants turn customer conversations into verified revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
