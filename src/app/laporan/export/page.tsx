"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";

// TODO(Person 3, Figma): sesuaikan layout PDF (logo, tabel) dengan template dari Figma.
function ExportLaporanContent() {
  const params = useSearchParams();
  const vehicleId = params.get("vehicleId") ?? "";
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    const res = await fetch(`/api/health-index/${vehicleId}`);
    const result = await res.json();

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SIGAP — Laporan Compliance Passport", 14, 20);
    doc.setFontSize(11);
    doc.text(`Kendaraan: ${vehicleId}`, 14, 32);
    doc.text(`Health Index Score: ${result.score}/100`, 14, 40);
    doc.text(`Kepatuhan P2H: ${(result.p2hComplianceRate * 100).toFixed(0)}%`, 14, 48);
    doc.text(`Anomali kritis: ${result.criticalAnomalyCount}`, 14, 56);
    doc.text(`Fast-track: ${result.fastTrackEligible ? "Ya" : "Tidak"}`, 14, 64);
    doc.save(`compliance-passport-${vehicleId}.pdf`);
    setLoading(false);
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Export Laporan KIR</h1>
      <button onClick={handleExport} disabled={loading} className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50">
        {loading ? "Membuat PDF..." : "Unduh PDF"}
      </button>
    </main>
  );
}

export default function ExportLaporanPage() {
  return (
    <Suspense>
      <ExportLaporanContent />
    </Suspense>
  );
}
