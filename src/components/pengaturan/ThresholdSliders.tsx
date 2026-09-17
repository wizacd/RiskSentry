import { FleetCategory } from "./mockThresholdConfig";

export default function ThresholdSliders({
  category,
  t1,
  t2,
  onT1Change,
  onT2Change,
}: {
  category: FleetCategory;
  t1: number;
  t2: number;
  onT1Change: (value: number) => void;
  onT2Change: (value: number) => void;
}) {
  const amanPct = t1;
  const waspadaPct = t2 - t1;
  const bahayaPct = 100 - t2;

  return (
    <div className="flex flex-col gap-5 rounded bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#191c1e]">1. Ambang Batas Transisi Skor Risiko K3</h3>
          <p className="text-xs text-[#45464d]">Tentukan titik batas transisi status armada dari skala 0 (Sempurna) hingga 100 (Kritis).</p>
        </div>
        <span className="rounded-sm bg-[#f2f4f6] px-2 py-1 text-[13px] font-medium text-[#191c1e]">Metrik Standar Indeks Sucofindo (SIS-K3)</span>
      </div>

      <div className="rounded bg-[#f2f4f6] p-3">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">
          <span>Visualisasi Spektrum Zona K3 Terkalibrasi</span>
          <span>Total Spektrum: 100 Poin</span>
        </div>
        <div className="mt-2 flex h-6 overflow-hidden rounded-sm shadow-inner">
          <div className="flex items-center justify-center bg-[#e6e8ea] text-[13px] font-bold text-[#191c1e]" style={{ width: `${amanPct}%` }}>
            {amanPct > 12 ? `AMAN (0-${t1})` : ""}
          </div>
          <div className="flex items-center justify-center bg-[#d5e0f8] text-[13px] font-bold text-[#111c2d]" style={{ width: `${waspadaPct}%` }}>
            {waspadaPct > 14 ? `WASPADA (${t1 + 1}-${t2 - 1})` : ""}
          </div>
          <div className="flex items-center justify-center bg-[#131b2e] text-[13px] font-bold text-white" style={{ width: `${bahayaPct}%` }}>
            {bahayaPct > 14 ? `BAHAYA / CUT-OFF (≥${t2})` : ""}
          </div>
        </div>
        <div className="mt-1 flex justify-between text-[11px] font-bold text-[#45464d]">
          <span>0 (Kondisi Ideal)</span>
          <span>50 (Ambang Menengah)</span>
          <span>100 (Grounded Total)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded bg-[#f2f4f6] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#545f73]" />
              <span className="text-sm font-bold text-[#191c1e]">Batas Aman → Waspada</span>
            </span>
            <span className="rounded-sm bg-white px-2 py-1.5 text-[13px] font-bold text-[#191c1e]">{t1}</span>
          </div>
          <p className="mt-1 text-xs text-[#45464d]">
            Skor di atas batas ini menerbitkan <span className="font-bold text-[#191c1e]">Tiket Waspada 24 Jam</span> dan peringatan buzzer kabin ke
            pengemudi.
          </p>
          <input
            type="range"
            min={category.bounds.t1Min}
            max={Math.min(category.bounds.t1Max, t2 - 1)}
            value={t1}
            onChange={(e) => onT1Change(Number(e.target.value))}
            className="mt-3 w-full accent-[#545f73]"
          />
          <div className="mt-1 flex justify-between text-[13px] font-medium text-[#45464d]">
            <span>Min: {category.bounds.t1Min}</span>
            <span>
              {category.t1Recommendation.label}: {category.t1Recommendation.value}
            </span>
            <span>Maks: {category.bounds.t1Max}</span>
          </div>
        </div>

        <div className="rounded bg-[#f2f4f6] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#ba1a1a]" />
              <span className="text-sm font-bold text-[#191c1e]">Batas Waspada → Bahaya</span>
            </span>
            <span className="rounded-sm bg-white px-2 py-1.5 text-[13px] font-bold text-[#191c1e]">{t2}</span>
          </div>
          <p className="mt-1 text-xs text-[#45464d]">
            Skor melampaui batas ini memicu <span className="font-bold text-[#ba1a1a]">Engine Cut-Off Otomatis</span> dan pembekuan izin jalan operasi
            secara digital.
          </p>
          <input
            type="range"
            min={Math.max(category.bounds.t2Min, t1 + 1)}
            max={category.bounds.t2Max}
            value={t2}
            onChange={(e) => onT2Change(Number(e.target.value))}
            className="mt-3 w-full accent-[#ba1a1a]"
          />
          <div className="mt-1 flex justify-between text-[13px] font-medium text-[#45464d]">
            <span>Min: {category.bounds.t2Min}</span>
            {category.t2References.map((ref) => (
              <span key={ref.label}>
                {ref.label}: {ref.value}
              </span>
            ))}
            <span>Maks: {category.bounds.t2Max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
