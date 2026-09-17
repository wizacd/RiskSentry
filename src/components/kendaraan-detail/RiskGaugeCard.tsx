"use client";

import { RISK_SCORE } from "./mockVehicleDetail";
import RiskGauge from "./RiskGauge";

export default function RiskGaugeCard() {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:col-span-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#45464d]">Penilaian Matriks K3</p>
          <p className="text-lg font-bold text-[#191c1e]">Skor Risiko K3 Terpadu</p>
          <p className="text-[11px] font-bold text-[#92400e]">{RISK_SCORE.statusLabel}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#fef3c7] px-2.5 py-1 text-[11px] font-bold text-[#92400e]">
          <img src="/kendaraan/arrow-down-tiny.svg" alt="" className="h-3 w-[3px]" />
          {RISK_SCORE.levelLabel}
        </span>
      </div>

      <div className="my-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <RiskGauge value={RISK_SCORE.value} max={RISK_SCORE.max} color={RISK_SCORE.color} />
        <div className="w-full max-w-[220px] space-y-2">
          <p className="text-[11px] font-bold uppercase text-[#45464d]">Kontributor Utama Risiko:</p>
          {RISK_SCORE.contributors.map((c) => (
            <div key={c.label}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#191c1e]">{c.label}</span>
                <span className="font-bold" style={{ color: c.color }}>
                  {c.pct}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e6e8ea]">
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center pt-1">
        <button
          type="button"
          onClick={() => window.print()}
          title="Cetak laporan risiko"
          aria-label="Cetak laporan risiko"
          className="flex items-center justify-center rounded bg-[#f2f4f6] p-2 hover:bg-[#e6e8ea]"
        >
          <img src="/kendaraan/print.svg" alt="" className="h-[15px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
