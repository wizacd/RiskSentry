import { FleetCategory } from "./mockThresholdConfig";

export default function CategoryDirectiveBanner({ category }: { category: FleetCategory }) {
  return (
    <div className="flex items-center justify-between rounded bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-[#f2f4f6]">
          <img src="/pengaturan/category-icon.svg" alt="" className="h-[19px] w-4" />
        </span>
        <div>
          <div className="flex items-start gap-2">
            <h2 className="text-xl font-semibold leading-tight text-[#191c1e]">
              {category.bannerHeading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <span className="shrink-0 rounded-sm bg-[#ffdad6] px-2 py-0.5 text-[11px] font-bold uppercase leading-tight tracking-wide text-[#93000a]">
              {category.hazardBadge.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#45464d]">
            {category.bannerDesc.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 rounded-sm bg-[#f2f4f6] p-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">SLA Eskalasi Wajib</span>
        <span className="text-xs font-bold text-[#191c1e]">{category.slaLabel}</span>
      </div>
    </div>
  );
}
