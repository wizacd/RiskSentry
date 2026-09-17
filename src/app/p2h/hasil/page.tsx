"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { P2HStatus } from "@/types/database";

const STATUS_COPY: Record<P2HStatus, { title: string; color: string }> = {
  hijau: { title: "Lolos — Surat Jalan Terbit", color: "text-status-aman" },
  kuning: { title: "Ada Komponen Minor Bermasalah", color: "text-status-waspada" },
  merah: { title: "Diblokir", color: "text-status-bahaya" },
};

// TODO(Person 1, Figma): ganti dengan 3 kartu status hasil sesuai desain (ikon + pesan).
function P2HResultContent() {
  const params = useSearchParams();
  const status = (params.get("status") as P2HStatus) ?? "hijau";
  const copy = STATUS_COPY[status];

  return (
    <main className="mx-auto max-w-md space-y-4 p-6 text-center">
      <h1 className={`text-2xl font-semibold ${copy.color}`}>{copy.title}</h1>
      <div className="space-x-2">
        <Link href="/p2h" className="rounded border px-4 py-2">
          Kembali
        </Link>
        {status === "hijau" && (
          <button className="rounded bg-gray-900 px-4 py-2 text-white" onClick={() => window.print()}>
            Cetak Surat Jalan
          </button>
        )}
      </div>
    </main>
  );
}

export default function P2HResultPage() {
  return (
    <Suspense>
      <P2HResultContent />
    </Suspense>
  );
}
