"use client";

import { useState } from "react";
import type { P2HRecord } from "@/types/database";
import { TONE_COLORS } from "./toneColors";

const STATUS_TAG: Record<P2HRecord["final_status"], { tag: string; tone: "aman" | "waspada" | "bahaya" }> = {
  hijau: { tag: "Lolos P2H", tone: "aman" },
  kuning: { tag: "Bersyarat", tone: "waspada" },
  merah: { tag: "Gagal P2H", tone: "bahaya" },
};

function formatDateTimeID(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    time: `${d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`,
  };
}

function HistoryItem({ record }: { record: P2HRecord }) {
  const [open, setOpen] = useState(true);
  const { tag, tone: toneKey } = STATUS_TAG[record.final_status];
  const tone = TONE_COLORS[toneKey];
  const strong = record.final_status === "merah";
  const { date, time } = formatDateTimeID(record.submitted_at);

  return (
    <div className={`rounded ${strong ? "border border-[#ba1a1a]/20 bg-[#ba1a1a]/5" : "bg-[#f2f4f6]"} p-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded-sm px-2 py-0.5 text-[11px] font-black uppercase text-white ${tone.tagBg}`}>{tag}</span>
          <span className="text-xs font-bold text-[#191c1e]">{date}</span>
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
          <p className="mt-2 text-xs text-[#191c1e]">{record.notes ?? "Tidak ada catatan tambahan."}</p>
          {record.surat_jalan_id && (
            <p className="mt-1 font-mono text-[11px] text-[#065f46]">No. Surat Jalan: {record.surat_jalan_id}</p>
          )}
          <div className={`mt-2 flex items-center justify-between border-t pt-1.5 ${strong ? "border-[#ba1a1a]/20" : "border-[#c6c6cd]/30"}`}>
            <span className="text-[11px] font-bold text-[#45464d]">
              SIM/SIO: {record.sim_valid ? "Valid" : "Kedaluwarsa"} • KIR/SILO: {record.unit_valid ? "Valid" : "Kedaluwarsa"}
            </span>
            <span className={`text-[11px] font-bold ${strong ? "text-[#ba1a1a]" : "text-[#45464d]"}`}>{time}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function InspectionHistory({ records }: { records: P2HRecord[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? records : records.slice(0, 4);

  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-[#c6c6cd]/30 bg-white p-5 shadow-sm">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded bg-[#e6e8ea]">
              <img src="/kendaraan/clipboard-icon.svg" alt="" className="h-[15px] w-[17px]" />
            </span>
            <div>
              <p className="text-lg font-bold leading-tight text-[#191c1e]">Riwayat P2H Terpadu</p>
              <p className="text-[11px] font-bold text-[#45464d]">3-Pass Validation: Operator → Unit → Checklist Fisik</p>
            </div>
          </div>
          <span className="rounded-sm bg-[#f2f4f6] px-2 py-1 text-[11px] font-bold text-[#45464d]">{records.length} Total</span>
        </div>
        {records.length === 0 ? (
          <p className="rounded bg-[#f2f4f6] p-4 text-center text-xs text-[#45464d]">Belum ada riwayat P2H tercatat untuk unit ini.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {visible.map((record) => (
              <HistoryItem key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
      {records.length > 4 && (
        <div className="mt-3 flex items-center justify-between border-t border-[#c6c6cd]/20 pt-2">
          <span className="text-[11px] font-bold text-[#45464d]">Menampilkan {visible.length} dari {records.length} riwayat</span>
          <button type="button" onClick={() => setShowAll((v) => !v)} className="flex items-center gap-1 text-xs font-bold text-[#188ace]">
            {showAll ? "Sembunyikan" : "Lihat Semua"}
            <img src="/kendaraan/chevron-right-blue.svg" alt="" className={`h-2 w-1 ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>
      )}
    </div>
  );
}
