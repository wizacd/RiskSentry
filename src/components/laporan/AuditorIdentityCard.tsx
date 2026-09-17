import { AUDITOR } from "./mockLaporanExport";

export default function AuditorIdentityCard() {
  return (
    <div className="flex flex-col gap-2 rounded-sm bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Asesor Penanggung Jawab Teknis</p>
        <img src="/laporan/verified-badge.svg" alt="" className="size-[14px]" />
      </div>
      <div className="flex items-center gap-3">
        <img src={AUDITOR.photo} alt={AUDITOR.name} className="size-12 rounded-sm object-cover shadow-sm" />
        <div className="flex flex-col">
          <p className="text-xs font-bold text-[#191c1e]">{AUDITOR.name}</p>
          <p className="text-xs text-[#45464d]">{AUDITOR.role}</p>
          <p className="text-[11px] font-bold tracking-wide text-[#188ace]">{AUDITOR.reg}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-sm bg-[#f2f4f6] p-1">
        <img src="/laporan/esign-badge.svg" alt="" className="h-[11.6px] w-[10.5px]" />
        <p className="truncate text-xs text-[#45464d]">{AUDITOR.eSignNote}</p>
      </div>
    </div>
  );
}
