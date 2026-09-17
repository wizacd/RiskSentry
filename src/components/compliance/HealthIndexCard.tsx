import RiskGauge from "@/components/kendaraan-detail/RiskGauge";
import type { HealthIndexResult } from "@/lib/health/healthIndex";

function grade(score: number) {
  if (score >= 90) return "GRADE A+ PRIMA";
  if (score >= 80) return "GRADE A LAYAK";
  if (score >= 65) return "GRADE B WASPADA";
  return "GRADE C PERLU TINDAK LANJUT";
}

export default function HealthIndexCard({ healthIndex }: { healthIndex: HealthIndexResult }) {
  const pillars = [
    { label: "Kepatuhan Checklist P2H", pct: Math.round(healthIndex.p2hComplianceRate * 100) },
    { label: "Kebersihan Riwayat Telemetri", pct: Math.round(healthIndex.telemetryScore) },
  ];

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-white p-5 shadow-sm lg:col-span-5">
      <div className="absolute right-0 top-0 size-48 rounded-xl bg-[#ecfdf5] blur-3xl" />
      <div className="relative space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#45464d]">Metrik Akumulasi Kelaikan</p>
            <p className="text-lg font-bold text-[#191c1e]">Health Index Score Kendaraan</p>
          </div>
          <span className="rounded-sm bg-[#d1fae5] px-2 py-0.5 text-[11px] font-bold text-[#065f46]">{grade(healthIndex.score)}</span>
        </div>

        <div className="flex items-center gap-5 rounded-lg bg-[#f2f4f6]/50 p-3">
          <RiskGauge value={healthIndex.score} max={100} color="#059669" size={112} />
          <div>
            <p className="text-xs font-bold uppercase text-[#065f46]">
              {healthIndex.fastTrackEligible ? "LAYAK FAST-TRACK PERPANJANGAN KIR" : "BELUM LAYAK FAST-TRACK"}
            </p>
            <p className="text-xs text-[#45464d]">
              {healthIndex.criticalAnomalyCount} temuan kritis &amp; {healthIndex.warningAnomalyCount} temuan waspada tercatat pada
              riwayat telemetri unit.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {pillars.map((pillar) => (
            <div key={pillar.label}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-[#191c1e]">
                  <span className="size-2 rounded-full bg-[#059669]" />
                  {pillar.label}
                </span>
                <span className="font-bold text-[#191c1e]">{pillar.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-sm bg-[#e6e8ea]">
                <div className="h-full rounded-sm bg-[#059669]" style={{ width: `${pillar.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-3 flex items-center justify-between border-t border-[#e6e8ea] pt-2 text-[11px] font-bold text-[#45464d]">
        <span>Evaluasi Algoritma Sucofindo v4.2</span>
        <span className="text-[#047857]">Skor: 60% P2H + 40% Telemetri</span>
      </div>
    </div>
  );
}
