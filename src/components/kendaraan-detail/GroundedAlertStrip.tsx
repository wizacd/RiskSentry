import type { Vehicle } from "@/types/database";

const TONE_STYLE = {
  aman: { bg: "bg-[#059669]", chip: "text-[#065f46]", label: "🟢 STATUS ARMADA: AMAN / LAYAK OPERASI", chipLabel: "Layak Operasi Resmi" },
  waspada: { bg: "bg-[#f59e0b]", chip: "text-[#92400e]", label: "🟡 STATUS ARMADA: WASPADA / DALAM PENGAWASAN", chipLabel: "Pengawasan Ketat Aktif" },
  bahaya: { bg: "bg-[#ba1a1a]", chip: "text-[#93000a]", label: "🔴 STATUS ARMADA: BAHAYA / GROUNDED", chipLabel: "Engine Cut-off Aktif" },
} as const;

export default function GroundedAlertStrip({ vehicle }: { vehicle: Vehicle }) {
  const tone = TONE_STYLE[vehicle.status];
  const message =
    vehicle.status === "aman"
      ? "Unit memenuhi seluruh ambang batas keselamatan statis & dinamis. Tidak ada temuan aktif yang perlu ditindaklanjuti."
      : `${vehicle.legalitas_title ?? "Temuan legalitas"} — ${vehicle.checklist_title ?? "temuan checklist"}.`;

  return (
    <div className={`flex flex-col gap-3 rounded-lg ${tone.bg} p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`}>
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded bg-white/20">
          <img src="/kendaraan/alert-siren.svg" alt="" className="h-[22px] w-[17px] brightness-0 invert" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-white">{tone.label}</span>
            <span className={`rounded-sm bg-white px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${tone.chip}`}>
              {tone.chipLabel}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-white/90">{message}</p>
        </div>
      </div>
      <div className="w-fit rounded-sm bg-white/15 px-3 py-1.5">
        <span className="text-[13px] font-bold tracking-wide text-white">
          UNIT: {vehicle.unit_code} • SKOR KELAIKAN: {Math.round((100 - vehicle.risk_score) * 10) / 10}/100
        </span>
      </div>
    </div>
  );
}
