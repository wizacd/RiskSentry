import { METRICS } from "./mockLaporanExport";

const TONE_STYLES: Record<string, string> = {
  prima: "bg-[#d1fae5] text-[#065f46]",
  lolos: "bg-[#d1fae5] text-[#065f46]",
  selesai: "bg-[#e2e8f0] text-[#1e293b]",
};

export default function ComplianceMetricsTable() {
  return (
    <div className="flex flex-col gap-1">
      <div className="rounded-sm bg-[#e6e8ea] px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">II. Hasil Audit Teknis &amp; Pengujian Komponen Kritis</p>
      </div>
      <div className="overflow-x-auto rounded-sm">
        <table className="w-full min-w-[640px] border-collapse text-xs">
          <thead className="bg-[#f2f4f6]">
            <tr>
              <th className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Parameter Pemeriksaan</th>
              <th className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Standar Regulasi</th>
              <th className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Nilai Terukur (Riil)</th>
              <th className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Status Evaluasi</th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map((row) => (
              <tr key={row.id} className="border-t border-[#e6e8ea]">
                <td className="px-3 py-2 font-medium text-[#191c1e]">{row.parameter.join(" ")}</td>
                <td className="px-3 py-2 text-[#191c1e]">{row.standard.join(" ")}</td>
                <td className="px-3 py-2 font-bold text-[#065f46]">{row.measured.join(" ")}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-bold tracking-wide ${TONE_STYLES[row.statusTone]}`}>
                    {row.statusTone !== "selesai" && <img src="/laporan/check-small.svg" alt="" className="h-[6px] w-[8.15px]" />}
                    {row.statusLabel.join(" ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
