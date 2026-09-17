"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HealthIndexResult } from "@/lib/health/healthIndex";

// TODO(Person 3, Figma): ganti dengan ringkasan visual Health Index Score +
// timeline riwayat P2H & anomali sesuai desain.
export default function CompliancePassportPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<HealthIndexResult | null>(null);

  useEffect(() => {
    fetch(`/api/health-index/${params.id}`)
      .then((res) => res.json())
      .then(setResult);
  }, [params.id]);

  if (!result) return <main className="p-6">Memuat...</main>;

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-xl font-semibold">Compliance Passport</h1>
      <p className="text-3xl font-bold">{result.score}/100</p>
      <p>Kepatuhan P2H: {(result.p2hComplianceRate * 100).toFixed(0)}%</p>
      <p>Anomali kritis: {result.criticalAnomalyCount}</p>
      <p className={result.fastTrackEligible ? "text-status-aman" : "text-status-waspada"}>
        {result.fastTrackEligible ? "Layak fast-track verifikasi KIR" : "Belum memenuhi syarat fast-track"}
      </p>
      <Link href={`/laporan/export?vehicleId=${params.id}`} className="inline-block rounded bg-gray-900 px-4 py-2 text-white">
        Export Laporan
      </Link>
    </main>
  );
}
