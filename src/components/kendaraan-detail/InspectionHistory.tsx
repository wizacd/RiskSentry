"use client";

import { useState } from "react";
import { INSPECTION_ARCHIVE, INSPECTION_HISTORY, InspectionItem, TONE_COLORS } from "./mockVehicleDetail";

function HistoryItem({ item }: { item: InspectionItem }) {
  const [open, setOpen] = useState(true);
  const tone = TONE_COLORS[item.tone];
  const strong = item.tone === "bahaya";

  return (
    <div className={`rounded ${strong ? "border border-[#ba1a1a]/20 bg-[#ba1a1a]/5" : "bg-[#f2f4f6]"} p-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded-sm px-2 py-0.5 text-[11px] font-black uppercase text-white ${tone.tagBg}`}>{item.tag}</span>
          <span className="text-xs font-bold text-[#191c1e]">{item.date}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Sembunyikan detail" : "Tampilkan detail"}
          className="rounded p-1 hover:bg-black/5"
        >
          <img src="/kendaraan/chevron-item.svg" alt="" className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <>
          <p className="mt-2 text-xs text-[#191c1e]">{item.desc}</p>
          <div className={`mt-2 flex items-center justify-between border-t pt-1.5 ${strong ? "border-[#ba1a1a]/20" : "border-[#c6c6cd]/30"}`}>
            <span className="text-[11px] font-bold text-[#45464d]">Inspektor: {item.inspector}</span>
            <span className={`text-[11px] font-bold ${strong ? "text-[#ba1a1a]" : "text-[#45464d]"}`}>{item.time}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function InspectionHistory() {
  const [showArchive, setShowArchive] = useState(false);
  const items = showArchive ? [...INSPECTION_HISTORY, ...INSPECTION_ARCHIVE] : INSPECTION_HISTORY;

  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-[#c6c6cd]/30 bg-white p-5 shadow-sm">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded bg-[#e6e8ea]">
              <img src="/kendaraan/clipboard-icon.svg" alt="" className="h-[15px] w-[17px]" />
            </span>
            <div>
              <p className="text-lg font-bold leading-tight text-[#191c1e]">Riwayat P2H &amp; Rampcheck Terpadu</p>
              <p className="text-[11px] font-bold text-[#45464d]">24 Item K3 Tambang &amp; Standar Rampcheck LLAJ</p>
            </div>
          </div>
          <span className="rounded-sm bg-[#f2f4f6] px-2 py-1 text-[11px] font-bold text-[#45464d]">Multi-Check</span>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#c6c6cd]/20 pt-2">
        <span className="text-[11px] font-bold text-[#45464d]">Menampilkan {items.length} audit multi-moda</span>
        <button
          type="button"
          onClick={() => setShowArchive((v) => !v)}
          className="flex items-center gap-1 text-xs font-bold text-[#188ace]"
        >
          {showArchive ? "Sembunyikan Arsip" : "Lihat Arsip Lengkap 14 Hari"}
          <img src="/kendaraan/chevron-right-blue.svg" alt="" className={`h-2 w-1 ${showArchive ? "-rotate-90" : "rotate-90"}`} />
        </button>
      </div>
    </div>
  );
}
