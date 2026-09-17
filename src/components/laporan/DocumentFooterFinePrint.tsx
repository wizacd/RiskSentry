import { FOOTER } from "./mockLaporanExport";

export default function DocumentFooterFinePrint() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6e8ea] pt-1.5 text-[10px] text-[#45464d]">
      <p>
        {FOOTER.systemLine.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </p>
      <p className="text-right">
        {FOOTER.pageLine.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </p>
    </div>
  );
}
