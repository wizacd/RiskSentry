"use client";

import { VEHICLE } from "./mockVehicleDetail";

export default function VehicleHeader({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-[#e6e8ea] bg-white/80 px-6 py-3 backdrop-blur-md">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
        aria-pressed={sidebarOpen}
        className="flex size-8 flex-col items-center justify-center gap-[3px] rounded-sm hover:bg-[#f2f4f6]"
      >
        <span className="h-[2px] w-4 rounded-full bg-[#191c1e]" />
        <span className="h-[2px] w-4 rounded-full bg-[#191c1e]" />
        <span className="h-[2px] w-4 rounded-full bg-[#191c1e]" />
      </button>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <img src="/kendaraan/logo-mark.svg" alt="" className="h-[17px] w-[13px]" />
          <span className="text-lg font-semibold capitalize text-[#191c1e]">RiskSentry</span>
        </div>
        <div className="h-4 w-px bg-[#c6c6cd]" />
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
          IDSurvey • Sucofindo Safety System
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-sm bg-[#f2f4f6] px-2 py-1">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34d399] opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#059669]" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">Live Telemetry Active</span>
      </div>
      <div className="flex items-center gap-2">
        <img src="/kendaraan/location-pin.svg" alt="" className="h-3 w-[13px]" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Wilayah Operasional</p>
          <p className="text-xs font-bold text-[#191c1e]">{VEHICLE.siteName}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1 rounded-sm border border-[#c6c6cd] bg-[#f2f4f6] px-[9px] py-[5px]">
        <span className="size-[6px] rounded-full bg-[#065f46]" />
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">K3 Certified Gateway</span>
      </div>
    </header>
  );
}
