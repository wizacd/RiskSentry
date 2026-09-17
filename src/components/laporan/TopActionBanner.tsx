"use client";

import { DOCUMENT_META } from "./mockLaporanExport";

export default function TopActionBanner({ onDownload, downloading }: { onDownload: () => void; downloading: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm bg-white p-5 shadow-sm">
      <div className="flex max-w-xl flex-col gap-1">
        <span className="inline-flex w-fit items-center rounded-sm bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#047857]">
          {DOCUMENT_META.fastTrackBadge}
        </span>
        <h1 className="text-2xl font-bold leading-8 tracking-tight text-[#191c1e]">
          {DOCUMENT_META.title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h1>
        <p className="text-sm text-[#45464d]">
          {DOCUMENT_META.description.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-sm bg-white px-3 py-2 text-xs font-semibold tracking-wide text-[#191c1e] shadow-sm hover:bg-[#f2f4f6]"
        >
          <img src="/laporan/print.svg" alt="" className="h-3 w-[13px]" />
          Cetak Salinan
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={downloading}
          className="flex items-center gap-2 rounded-sm bg-[#131b2e] px-5 py-2 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-[#1f2a44] disabled:opacity-50"
        >
          <img src="/laporan/download.svg" alt="" className="size-[11px]" />
          {downloading ? "Membuat PDF..." : "Unduh Laporan Resmi (PDF)"}
        </button>
      </div>
    </div>
  );
}
