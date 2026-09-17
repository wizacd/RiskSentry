import type { HealthIndexResult } from "@/lib/health/healthIndex";

function grade(score: number) {
  if (score >= 90) return "KONDISI PRIMA (GRADE A+)";
  if (score >= 80) return "KONDISI LAYAK (GRADE A)";
  if (score >= 65) return "PERLU PENGAWASAN (GRADE B)";
  return "PERLU TINDAK LANJUT (GRADE C)";
}

export default function HealthScoreBanner({ healthIndex }: { healthIndex: HealthIndexResult }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm bg-[#ecfdf5] p-3">
      <div className="flex items-center gap-3">
        <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-sm bg-[#059669] shadow-sm">
          <span className="text-3xl font-bold tracking-tight text-white">{healthIndex.score}</span>
          <span className="text-[11px] font-bold uppercase tracking-tight text-[#d1fae5]">/ 100</span>
        </div>
        <div className="max-w-md">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold tracking-tight text-[#022c22]">{grade(healthIndex.score)}</p>
            <img src="/laporan/badge-check.svg" alt="" className="h-[15.75px] w-[16.5px]" />
          </div>
          <p className="text-xs text-[#065f46]">
            {healthIndex.criticalAnomalyCount} temuan kritis &amp; {healthIndex.warningAnomalyCount} temuan waspada tercatat pada riwayat
            telemetri unit.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#065f46]">KESIMPULAN REKOMENDASI:</p>
        <div className="rounded-sm bg-[#a7f3d0]/60 px-2.5 py-1">
          <p className="text-sm font-bold uppercase tracking-wide text-[#022c22]">
            {healthIndex.fastTrackEligible ? "LAYAK FAST-TRACK PERPANJANGAN KIR" : "BELUM LAYAK FAST-TRACK"}
          </p>
        </div>
      </div>
    </div>
  );
}
