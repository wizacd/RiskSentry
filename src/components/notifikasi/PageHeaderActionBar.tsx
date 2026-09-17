"use client";

export default function PageHeaderActionBar({
  counts,
  onSimulate,
  simulating,
  onMarkAllRead,
  onToggleSort,
  sortOldestFirst,
  onExportCsv,
}: {
  counts: { total: number; unresolved: number; grounded: number; avgResponse: string };
  onSimulate: () => void;
  simulating: boolean;
  onMarkAllRead: () => void;
  onToggleSort: () => void;
  sortOldestFirst: boolean;
  onExportCsv: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="text-[32px] font-bold tracking-tight text-[#191c1e]">Log Notifikasi &amp; Audit Peringatan K3</h1>
          <p className="text-sm text-[#45464d]">
            Pusat jejak audit kronologis seluruh alarm peringatan otomatis CAN-Bus, gagal P2H, intervensi engine cut-off, dan
            disposisi bengkel untuk penelusuran kepatuhan hukum Kepmen ESDM 1827 K/30/MEM/2018.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onSimulate}
            disabled={simulating}
            className="flex items-center gap-1.5 rounded bg-[#ba1a1a] px-3 py-2 text-xs font-bold text-white shadow-sm disabled:opacity-50"
          >
            <img src="/notifikasi/megaphone.svg" alt="" className="h-[11px] w-[13px] invert" />
            {simulating ? "Mengirim Skenario..." : "Simulasikan Bahaya Masuk (Demo Juri)"}
          </button>
          <button
            type="button"
            onClick={onMarkAllRead}
            className="flex items-center gap-1.5 rounded bg-[#e6e8ea] px-3 py-2 text-xs font-bold text-[#191c1e]"
          >
            <img src="/notifikasi/check-all.svg" alt="" className="h-2 w-[15px]" />
            Tandai Semua Dibaca
          </button>
          <button
            type="button"
            onClick={onToggleSort}
            aria-pressed={sortOldestFirst}
            title={sortOldestFirst ? "Urutkan: terlama dulu" : "Urutkan: terbaru dulu"}
            className="flex size-9 items-center justify-center rounded bg-[#f2f4f6] hover:bg-[#e6e8ea]"
          >
            <img src="/notifikasi/sliders.svg" alt="" className="size-3" />
          </button>
          <button
            type="button"
            onClick={onExportCsv}
            className="flex items-center gap-1.5 rounded bg-[#f2f4f6] px-3 py-2 text-xs font-bold text-[#191c1e] hover:bg-[#e6e8ea]"
          >
            <img src="/notifikasi/download.svg" alt="" className="size-[11px]" />
            Ekspor Log Audit (PDF/CSV)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-lg bg-[#f2f4f6] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Total Peringatan Hari Ini</p>
              <p className="text-[28px] font-bold text-[#191c1e]">{counts.total}</p>
              <p className="text-xs text-[#45464d]">Shift 1 &amp; Shift 2 Terakumulasi</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded bg-[#e0e3e5] text-xl">🔔</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black" />
        </div>
        <div className="relative overflow-hidden rounded-lg bg-[#f2f4f6] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Belum Ditindaklanjuti</p>
              <div className="flex items-end gap-2">
                <p className="text-[28px] font-bold text-[#ba1a1a]">{counts.unresolved}</p>
                <span className="rounded-sm bg-[#ffdad6] px-1.5 py-0.5 text-[11px] font-bold text-[#ba1a1a]">Perlu Respon</span>
              </div>
              <p className="text-xs text-[#45464d]">Prioritas Tinggi Asesor K3</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded bg-[#ffdad6] text-xl">⚠️</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ba1a1a]" />
        </div>
        <div className="relative overflow-hidden rounded-lg bg-[#f2f4f6] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Armada Grounded K3</p>
              <p className="text-[28px] font-bold text-[#191c1e]">{counts.grounded}</p>
              <p className="text-xs text-[#45464d]">Engine Cut-Off &amp; Kartu Merah</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded bg-[#e0e3e5] text-xl">🚫</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ba1a1a]" />
        </div>
        <div className="relative overflow-hidden rounded-lg bg-[#f2f4f6] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Rata-Rata Respon Asesor</p>
              <p className="flex items-baseline gap-1">
                <span className="text-[28px] font-bold text-[#191c1e]">{counts.avgResponse}</span>
                <span className="text-xs font-bold text-[#45464d]">Menit</span>
              </p>
              <p className="text-xs text-[#45464d]">SLA Regulasi &lt; 15.0 Menit</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded bg-[#e0e3e5] text-xl">⏱️</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black" />
        </div>
      </div>
    </div>
  );
}
