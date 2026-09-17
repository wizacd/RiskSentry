import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RiskSentry",
  description: "Sistem Informasi Gawat & Antisipasi Pengemudi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
