export interface AnomaliCounts {
  totalActive: number;
  avgScore: number;
  bahaya: number;
  waspada: number;
}

export default function MetricKpiStrip({ counts }: { counts: AnomaliCounts }) {
  return (
    <div className="bg-[#f7f9fb] px-6 py-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative flex flex-col justify-between overflow-hidden rounded bg-white p-3 shadow-sm">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#545f73]" />
          <div className="flex items-center justify-between pl-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#45464d]">Total Potensi Risiko Aktif</span>
            <img src="/anomali/kpi-total.svg" alt="" className="h-[14.25px] w-[16.5px]" />
          </div>
          <div className="flex items-baseline gap-2 pl-1.5 pt-2">
            <span className="text-[28px] font-bold tracking-tight text-[#191c1e]">{counts.totalActive}</span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">UNIT KENDARAAN</span>
          </div>
          <div className="ml-1.5 mt-2 flex items-center justify-between rounded-sm bg-[#f2f4f6]/50 px-2 py-1">
            <span className="text-[11px] font-bold text-[#45464d]">Skor Risiko Rata-rata</span>
            <span className="text-[13px] font-bold text-[#191c1e]">{counts.totalActive > 0 ? `${counts.avgScore} / 100` : "—"}</span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded bg-white p-3 shadow-sm">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#ba1a1a]" />
          <div className="flex items-center justify-between pl-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-[#ba1a1a]">Bahaya (Grounded)</span>
            <img src="/anomali/kpi-bahaya.svg" alt="" className="h-[14.25px] w-[13.5px]" />
          </div>
          <div className="flex items-baseline gap-2 pl-1.5 pt-2 text-[#ba1a1a]">
            <span className="text-[28px] font-bold tracking-tight">{counts.bahaya}</span>
            <span className="text-[11px] font-bold uppercase tracking-wide">ENGINE CUT-OFF</span>
          </div>
          <div className="ml-1.5 mt-2 flex items-center justify-between rounded-sm bg-[#ffdad6]/40 px-2 py-1">
            <span className="text-[11px] font-bold text-[#93000a]">Kepatuhan Sanksi</span>
            <span className="text-[11px] font-bold text-[#93000a]">Kepmen ESDM 1827</span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded bg-white p-3 shadow-sm">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#d5e0f8]" />
          <div className="flex items-center justify-between pl-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-[#586377]">Waspada (SLA &lt; 24 Jam)</span>
            <img src="/anomali/kpi-waspada.svg" alt="" className="h-[15.75px] w-[14.25px]" />
          </div>
          <div className="flex items-baseline gap-2 pl-1.5 pt-2 text-[#586377]">
            <span className="text-[28px] font-bold tracking-tight">{counts.waspada}</span>
            <span className="text-[11px] font-bold uppercase tracking-wide">TIKET TERBIT</span>
          </div>
          <div className="ml-1.5 mt-2 flex items-center justify-between rounded-sm bg-[#d5e0f8]/40 px-2 py-1">
            <span className="text-[11px] font-bold text-[#111c2d]">Target Penyelesaian</span>
            <span className="text-[11px] font-bold text-[#111c2d]">≤ Shift 2 Besok</span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded bg-white p-3 shadow-sm">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#001d31]" />
          <div className="flex items-center justify-between pl-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#45464d]">MTTA (Mean Time Assess)</span>
            <img src="/anomali/kpi-mtta.svg" alt="" className="h-[15.75px] w-[13.5px]" />
          </div>
          <div className="flex items-baseline gap-2 pl-1.5 pt-2">
            <span className="text-[28px] font-bold tracking-tight text-[#191c1e]">—</span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">BELUM TEREKAM</span>
          </div>
          <div className="ml-1.5 mt-2 flex items-center justify-between rounded-sm bg-[#f2f4f6] px-2 py-1">
            <span className="text-[11px] font-bold text-[#191c1e]">Standar Sucofindo</span>
            <span className="text-[11px] font-bold text-[#188ace]">&lt; 15.0 Menit (Optimal)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
