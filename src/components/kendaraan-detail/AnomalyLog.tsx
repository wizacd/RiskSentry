import type { AppNotification } from "@/types/database";
import { TONE_COLORS } from "./toneColors";

function formatTimeID(iso: string) {
  return `${new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} WIB`;
}

export default function AnomalyLog({
  notifications,
  expandedId,
  onToggle,
}: {
  notifications: AppNotification[];
  expandedId: string;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-lg border border-[#c6c6cd]/30 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded bg-[#ba1a1a]/10">
            <img src="/kendaraan/warning-icon.svg" alt="" className="h-4 w-[18px]" />
          </span>
          <div>
            <p className="text-lg font-bold leading-tight text-[#191c1e]">Log Potensi Risiko Gabungan (Alat Berat &amp; Angkutan Jalan)</p>
            <p className="text-[11px] font-bold text-[#45464d]">Audit sensor telemetri in-line Sucofindo &amp; laporan visual inspektur</p>
          </div>
        </div>
        <span className="shrink-0 rounded-sm bg-[#e6e8ea] px-2 py-1 text-[11px] font-bold text-[#45464d]">
          {notifications.length} Kejadian Terdaftar
        </span>
      </div>

      {notifications.length === 0 ? (
        <p className="rounded bg-[#f2f4f6] p-4 text-center text-xs text-[#45464d]">Belum ada notifikasi potensi risiko untuk unit ini.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((entry) => {
            const tone = TONE_COLORS[entry.severity];
            const open = expandedId === entry.id;
            return (
              <div key={entry.id} id={`anomaly-${entry.id}`} className="overflow-hidden rounded bg-[#f2f4f6]">
                <button
                  type="button"
                  onClick={() => onToggle(entry.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-2 p-3 text-left"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase text-white ${tone.tagBg}`}>
                      {entry.severity}
                    </span>
                    <span className="text-[13px] font-bold text-[#191c1e]">{formatTimeID(entry.created_at)}</span>
                    <span className={`text-xs font-bold ${tone.text}`}>{entry.message}</span>
                  </span>
                  <img
                    src="/kendaraan/chevron-down-small.svg"
                    alt=""
                    className={`h-[7px] w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && entry.recommended_action && (
                  <div className="space-y-2 px-3 pb-3">
                    <div className="rounded bg-white p-2 text-xs text-[#191c1e]">
                      <span className="font-bold">Rekomendasi Tindakan:</span> {entry.recommended_action}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-bold text-[#45464d]">Status: {entry.is_read ? "Sudah Ditindaklanjuti" : "Belum Ditindaklanjuti"}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
