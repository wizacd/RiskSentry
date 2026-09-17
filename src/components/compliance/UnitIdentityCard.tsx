import { UNIT } from "./mockCompliancePassport";

const SPECS = [
  { label: "Nomor Rangka (VIN)", value: UNIT.vin, mono: true },
  { label: "Nomor Mesin", value: UNIT.engineNumber, mono: true },
  { label: "Perusahaan Pemegang IUP", value: UNIT.iupHolder },
  { label: "Odometer Kumulatif", value: UNIT.odometer },
  { label: "Hour Meter (HM Engine)", value: UNIT.hourMeter },
  { label: "Subkontraktor / Pool", value: UNIT.pool },
];

export default function UnitIdentityCard() {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-sm lg:col-span-7">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-t-lg bg-[#f2f4f6]/50 p-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-[#ba1a1a] text-lg font-bold text-white">
              DT
            </span>
            <div>
              <p className="text-xl font-bold text-[#191c1e]">Unit {UNIT.code}</p>
              <p className="text-xs text-[#45464d]">{UNIT.model}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Masa Berlaku Uji KIR</p>
            <p className="flex items-center justify-end gap-1.5 text-sm font-bold text-[#b45309]">
              <img src="/compliance/calendar-kir.svg" alt="" className="size-3.5" />
              {UNIT.kirExpiry}
            </p>
            <p className="text-[11px] font-medium text-[#ba1a1a]">Sisa {UNIT.kirDaysLeft} Hari Operasional</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {SPECS.map((spec) => (
            <div key={spec.label} className="rounded-sm bg-[#f2f4f6] p-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">{spec.label}</p>
              <p className={`text-[13px] font-bold text-[#191c1e] ${spec.mono ? "font-mono" : ""}`}>{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-sm bg-[#e6e8ea]">
              <img src="/compliance/unit-photo.png" alt="Foto inspeksi unit" className="size-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#191c1e]">Visual Stamp: Inspeksi Terakhir Lapangan</p>
              <p className="text-xs text-[#45464d]">{UNIT.photoCaption}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-sm bg-[#d1fae5] px-2 py-1 text-[11px] font-bold text-[#065f46]">
              <img src="/compliance/check-mini.svg" alt="" className="size-3" />
              {UNIT.emissionTest}
            </span>
            <span className="flex items-center gap-1.5 rounded-sm bg-[#d1fae5] px-2 py-1 text-[11px] font-bold text-[#065f46]">
              <img src="/compliance/check-mini.svg" alt="" className="size-3" />
              {UNIT.brakeEfficiency}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-sm bg-[#f2f4f6]/40 p-3 font-mono text-[11px] text-[#45464d]">
        <p>
          SHA256:
          <br />
          {UNIT.sha256}
        </p>
        <p className="text-right font-sans font-medium text-[#191c1e]">
          Digital Signature
          <br />
          Sucofindo ID: {UNIT.digitalSignatureId}
        </p>
      </div>
    </div>
  );
}
