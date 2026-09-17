import type { HealthIndexResult } from "@/lib/health/healthIndex";
import type { WorkOrder } from "@/types/database";

const TONE_STYLES: Record<string, string> = {
  lolos: "bg-[#d1fae5] text-[#065f46]",
  perhatian: "bg-[#fef3c7] text-[#92400e]",
  selesai: "bg-[#e2e8f0] text-[#1e293b]",
  kosong: "bg-[#f2f4f6] text-[#45464d]",
};

export default function ComplianceMetricsTable({
  healthIndex,
  latestWorkOrder,
}: {
  healthIndex: HealthIndexResult;
  latestWorkOrder: WorkOrder | null;
}) {
  const p2hPct = Math.round(healthIndex.p2hComplianceRate * 100);
  const rows: { id: string; parameter: string; standard: string; measured: string; statusLabel: string; tone: string }[] = [
    {
      id: "p2h",
      parameter: "Tingkat Kepatuhan Checklist P2H",
      standard: "Min. 90.0% kelengkapan shift",
      measured: `${p2hPct}%`,
      statusLabel: p2hPct >= 90 ? "LOLOS" : "PERHATIAN",
      tone: p2hPct >= 90 ? "lolos" : "perhatian",
    },
    {
      id: "telemetri",
      parameter: "Integritas Riwayat Telemetri IoT & CAN-Bus",
      standard: "Zero temuan kritis tercatat",
      measured: `${Math.round(healthIndex.telemetryScore)}/100 (${healthIndex.criticalAnomalyCount} kritis, ${healthIndex.warningAnomalyCount} waspada)`,
      statusLabel: healthIndex.criticalAnomalyCount === 0 ? "LOLOS" : "PERHATIAN",
      tone: healthIndex.criticalAnomalyCount === 0 ? "lolos" : "perhatian",
    },
    {
      id: "wo",
      parameter: "Riwayat Perbaikan / Work Order Terakhir",
      standard: "WO ditutup & lolos re-inspeksi",
      measured: latestWorkOrder ? latestWorkOrder.problem_component : "Tidak ada Work Order tercatat",
      statusLabel: latestWorkOrder ? latestWorkOrder.ticket_status.toUpperCase() : "N/A",
      tone: !latestWorkOrder ? "kosong" : latestWorkOrder.ticket_status === "selesai" ? "selesai" : "perhatian",
    },
  ];

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
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#e6e8ea]">
                <td className="px-3 py-2 font-medium text-[#191c1e]">{row.parameter}</td>
                <td className="px-3 py-2 text-[#191c1e]">{row.standard}</td>
                <td className="px-3 py-2 font-bold text-[#065f46]">{row.measured}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-bold tracking-wide ${TONE_STYLES[row.tone]}`}>
                    {row.tone === "lolos" && <img src="/laporan/check-small.svg" alt="" className="h-[6px] w-[8.15px]" />}
                    {row.statusLabel}
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
