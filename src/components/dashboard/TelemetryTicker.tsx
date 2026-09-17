import Link from "next/link";

export default function TelemetryTicker() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-[4px] bg-[#f2f4f6] p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 rounded-sm bg-white px-2 py-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#059669]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">Integrasi GPS Fleet</span>
          <span className="text-[11px] text-[#c6c6cd]">•</span>
          <span className="text-[13px] font-semibold tracking-tight text-[#545f73]">Realtime Telemetri</span>
          <span className="text-[11px] text-[#c6c6cd]">•</span>
        </div>
        <div className="flex items-center gap-1 rounded-sm bg-white px-2 py-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <img src="/dashboard/bell.svg" alt="" className="h-[12px] w-[12px]" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#545f73]">Alarm Audio Aktif</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/demo-simulator"
          className="flex items-center gap-1 rounded-sm bg-[#dc2626] px-3 py-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
        >
          <img src="/dashboard/siren.svg" alt="" className="h-[14px] w-[16px]" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-white">Simulasikan Anomali Kritis</span>
        </Link>
        <div className="flex items-center gap-1 border-l border-[#e0e3e5] pl-2">
          <img
            src="/dashboard/auditor-headshot.png"
            alt=""
            className="size-8 rounded-xl shadow-[0px_0px_0px_1px_#e0e3e5,0px_1px_2px_rgba(0,0,0,0.05)]"
          />
          <span className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">Ir. Hendra Gunawan, S.Si.T</span>
            <span className="text-[10px] font-semibold uppercase text-[#545f73]">
              Inspektur Senior Armada &amp; K3 Tambang
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
