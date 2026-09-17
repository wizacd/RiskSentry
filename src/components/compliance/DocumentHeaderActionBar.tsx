"use client";

import { useState } from "react";

export default function DocumentHeaderActionBar({ onCompare }: { onCompare: () => void }) {
  const [verified, setVerified] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="max-w-xl space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#191c1e]">
          Digital Compliance Passport — Rekam Jejak Kepatuhan &amp; Kelaikan Unit
        </h1>
        <span className="inline-block rounded-sm bg-[#001d31] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#188ace]">
          Regulasi Resmi Dishub
        </span>
        <p className="text-sm text-[#45464d]">
          Paspor Terverifikasi Sucofindo &amp; IDSurvey untuk Fast-Track Rekomendasi Perpanjangan Uji Berkala KIR
          &amp; Dishub RI
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setVerified((v) => !v)}
          aria-pressed={verified}
          className={`flex items-center gap-2 rounded px-3 py-2.5 text-xs font-semibold ${
            verified ? "bg-[#d1fae5] text-[#065f46]" : "bg-[#f2f4f6] text-[#191c1e]"
          }`}
        >
          <img src="/compliance/hash-verify.svg" alt="" className="size-3" />
          {verified ? "✓ Hash Terverifikasi" : "Verifikasi SHA-256"}
        </button>
        <button
          type="button"
          onClick={onCompare}
          className="flex items-center gap-2 rounded bg-[#f2f4f6] px-3 py-2.5 text-xs font-semibold text-[#191c1e]"
        >
          <img src="/compliance/compare.svg" alt="" className="h-[11px] w-[13px]" />
          Bandingkan Audit
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded bg-[#ba1a1a] px-5 py-2.5 text-xs font-semibold text-white shadow-sm"
        >
          <img src="/compliance/export-doc.svg" alt="" className="h-[14px] w-[15px] invert" />
          Export Laporan Resmi (BAP PDF)
        </button>
      </div>
    </div>
  );
}
