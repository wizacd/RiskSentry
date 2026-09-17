export default function OperationalHeaderArea({
  simulating,
  onSimulate,
  zeroMode,
  onToggleZeroMode,
  onExport,
}: {
  simulating: boolean;
  onSimulate: () => void;
  zeroMode: boolean;
  onToggleZeroMode: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 bg-white px-6 pb-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex max-w-2xl flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-[#e6e8ea] px-1 py-0.5 text-[11px] font-bold uppercase tracking-widest text-[#45464d]">
            K3-DISPATCH • PROTOKOL 1827
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-[#ba1a1a]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ba1a1a] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#ba1a1a]" />
            </span>
            STREAM DATA REAL-TIME
          </span>
        </div>
        <h1 className="text-[32px] font-bold leading-10 tracking-tight text-[#191c1e]">
          Pusat Triage Potensi Risiko &amp; Insiden K3 Armada
        </h1>
        <p className="max-w-2xl text-sm text-[#45464d]">
          Penyaringan terpusat seluruh temuan P2H gagal dan telemetri CAN-BUS kritis. Diurutkan berdasarkan indeks
          keparahan risiko K3 tertinggi untuk tindakan koreksi instan.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onSimulate}
          disabled={simulating}
          className="flex items-center gap-1.5 rounded-sm bg-[#131b2e] px-3 py-2 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-[#1f2a44] disabled:opacity-50"
        >
          <img src="/anomali/header-simulate.svg" alt="" className="h-[13.3px] w-[10.7px]" />
          {simulating ? "Mengirim Skenario..." : "Simulasikan Potensi Risiko Baru (Demo Juri)"}
        </button>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggleZeroMode}
            aria-pressed={zeroMode}
            className={`flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs font-semibold tracking-wide ${
              zeroMode ? "bg-[#191c1e] text-white" : "bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e6e8ea]"
            }`}
          >
            <img src="/anomali/header-zero-mode.svg" alt="" className="size-[13.3px]" />
            {zeroMode ? "Kembali ke Mode Normal" : "Simulasi Mode 0 Potensi Risiko"}
          </button>
          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-sm bg-[#f2f4f6] px-3 py-2 text-xs font-semibold tracking-wide text-[#191c1e] hover:bg-[#e6e8ea]"
          >
            <img src="/anomali/header-export.svg" alt="" className="h-[13.3px] w-[10.7px]" />
            Export Rekap BA-K3
          </button>
        </div>
      </div>
    </div>
  );
}
