import { VEHICLE } from "./mockVehicleDetail";

export default function IdentityCard() {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:col-span-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#45464d]">Spesifikasi Alat Berat</p>
          <h2 className="mt-1 text-2xl font-bold text-[#191c1e]">{VEHICLE.model}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-[#e6e8ea] px-2 py-0.5 text-base font-bold tracking-wide text-[#191c1e]">
              {VEHICLE.unitCode}
            </span>
            <span className="rounded-sm bg-[#f2f4f6] px-2 py-0.5 text-sm font-bold text-[#45464d]">{VEHICLE.policeNumber}</span>
            <span className="rounded-sm bg-[#001d31]/10 px-2 py-0.5 text-[11px] font-bold text-[#188ace]">
              {VEHICLE.classLabel}
            </span>
          </div>
        </div>
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f6]">
          <img src="/kendaraan/truck-badge.svg" alt="" className="h-6 w-[33px]" />
        </div>
      </div>

      <div className="mt-3 flex gap-8 rounded bg-[#f2f4f6]/50 px-2 pb-2 pt-3">
        <div>
          <p className="text-[11px] font-bold text-[#45464d]">Wilayah Operasional</p>
          <p className="text-xs font-bold text-[#191c1e]">{VEHICLE.region}</p>
          <p className="text-xs text-[#45464d]">{VEHICLE.location}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#45464d]">Odometer / HM</p>
          <p className="text-[13px] font-bold text-[#191c1e]">{VEHICLE.odometer}</p>
          <p className="text-xs text-[#45464d]">{VEHICLE.hourmeter}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <img src="/kendaraan/cert-badge.svg" alt="" className="h-[12px] w-[13px]" />
          <span className="text-[11px] font-bold text-[#45464d]">Sertifikasi SILO Kemenaker</span>
        </div>
        <span className="text-[11px] font-bold text-[#191c1e]">{VEHICLE.certExpiry}</span>
      </div>
    </div>
  );
}
