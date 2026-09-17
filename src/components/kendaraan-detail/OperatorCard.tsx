import { OPERATOR } from "./mockVehicleDetail";

export default function OperatorCard() {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] lg:col-span-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#45464d]">Operator Kabin</p>
          <span className="rounded-sm bg-[#d1fae5] px-2 py-0.5 text-[11px] font-bold text-[#065f46]">Fit To Work</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-14 w-[53px] shrink-0 rounded-xl bg-[#e6e8ea] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          <div>
            <p className="text-lg font-bold leading-tight text-[#191c1e]">{OPERATOR.name}</p>
            <p className="text-[11px] font-bold text-[#45464d]">
              NIK: {OPERATOR.nik} • {OPERATOR.shift}
            </p>
            <p className="text-[11px] font-medium text-[#191c1e]">SIMPER: {OPERATOR.simper}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 rounded bg-[#f2f4f6] p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src="/kendaraan/clock.svg" alt="" className="size-[15px]" />
            <span className="text-[11px] font-bold text-[#45464d]">Lama Mengemudi</span>
          </div>
          <span className="text-[13px] font-bold text-[#065f46]">{OPERATOR.fatigue}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src="/kendaraan/sleep.svg" alt="" className="h-[9px] w-[14px]" />
            <span className="text-[11px] font-bold text-[#45464d]">Sleep Sensor</span>
          </div>
          <span className="text-[13px] font-bold text-[#b45309]">{OPERATOR.sleepAlerts}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src="/kendaraan/calendar.svg" alt="" className="h-[13px] w-[11px]" />
            <span className="text-[11px] font-bold text-[#45464d]">Masa SIMPER</span>
          </div>
          <span className="text-[13px] font-medium text-[#191c1e]">{OPERATOR.simperExpiry}</span>
        </div>
      </div>
    </div>
  );
}
