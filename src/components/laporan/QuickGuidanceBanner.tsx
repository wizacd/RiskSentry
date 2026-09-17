import Link from "next/link";
import { GUIDANCE } from "./mockLaporanExport";

export default function QuickGuidanceBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-[#d5e0f8]">
          <img src="/laporan/help.svg" alt="" className="size-[16.7px]" />
        </span>
        <div>
          <p className="text-lg font-semibold text-[#191c1e]">{GUIDANCE.title}</p>
          <p className="text-xs text-[#45464d]">
            {GUIDANCE.description.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </div>
      <Link
        href="/potensi-resiko"
        title="Lihat daftar seluruh unit yang terdaftar"
        className="shrink-0 rounded-sm bg-[#f2f4f6] px-3 py-2 text-xs font-semibold text-[#191c1e] hover:bg-[#e6e8ea]"
      >
        {GUIDANCE.linkLabel}
      </Link>
    </div>
  );
}
