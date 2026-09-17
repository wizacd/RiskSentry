import { VEHICLE } from "./mockVehicleDetail";

export default function GroundedAlertStrip() {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-[#f59e0b] p-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded bg-white/20">
          <img src="/kendaraan/alert-siren.svg" alt="" className="h-[22px] w-[17px] brightness-0 invert" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-white">🟡 STATUS ARMADA: WASPADA / DALAM PENGAWASAN</span>
            <span className="rounded-sm bg-white px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-[#92400e]">
              Pengawasan Ketat Aktif
            </span>
          </div>
          <p className="mt-0.5 text-xs text-white/90">
            Unit masih diizinkan beroperasi dengan pengawasan real-time oleh Sistem K3 Core Sucofindo. Perhatian:
            Tekanan Angin Rem Mendekati Ambang Minimum ESDM 1827 — perlu pemeriksaan lanjutan.
          </p>
        </div>
      </div>
      <div className="w-fit rounded-sm bg-white/15 px-3 py-1.5">
        <span className="text-[13px] font-bold tracking-wide text-white">ID PENGAWASAN: {VEHICLE.monitoringId}</span>
      </div>
    </div>
  );
}
