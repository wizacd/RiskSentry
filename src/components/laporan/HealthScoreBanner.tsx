import { HEALTH_SCORE } from "./mockLaporanExport";

export default function HealthScoreBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm bg-[#ecfdf5] p-3">
      <div className="flex items-center gap-3">
        <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-sm bg-[#059669] shadow-sm">
          <span className="text-3xl font-bold tracking-tight text-white">{HEALTH_SCORE.score}</span>
          <span className="text-[11px] font-bold uppercase tracking-tight text-[#d1fae5]">/ {HEALTH_SCORE.max}</span>
        </div>
        <div className="max-w-md">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold tracking-tight text-[#022c22]">{HEALTH_SCORE.grade}</p>
            <img src="/laporan/badge-check.svg" alt="" className="h-[15.75px] w-[16.5px]" />
          </div>
          <p className="text-xs text-[#065f46]">
            {HEALTH_SCORE.note.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#065f46]">{HEALTH_SCORE.recommendationLabel}</p>
        <div className="rounded-sm bg-[#a7f3d0]/60 px-2.5 py-1">
          <p className="text-sm font-bold uppercase tracking-wide text-[#022c22]">
            {HEALTH_SCORE.recommendation.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
