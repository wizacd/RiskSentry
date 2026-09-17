import type { HealthIndexResult } from "@/lib/health/healthIndex";
import type { P2HRecord, Vehicle } from "@/types/database";

function formatDateID(d: Date) {
  return `${d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ${d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;
}

export default function CredentialBanner({
  vehicle,
  healthIndex,
  p2hRecords,
}: {
  vehicle: Vehicle;
  healthIndex: HealthIndexResult;
  p2hRecords: P2HRecord[];
}) {
  const regId = `PASS-K3-SCF-${new Date().getFullYear()}-${vehicle.unit_code}-${vehicle.id.slice(0, 5).toUpperCase()}`;
  const compliancePct = p2hRecords.length > 0 ? `${Math.round(healthIndex.p2hComplianceRate * 100)}%` : "Belum ada data P2H";

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-white via-white to-[#f2f4f6] p-5 shadow-sm">
      <div className={`absolute inset-y-0 left-0 w-2.5 ${healthIndex.fastTrackEligible ? "bg-[#059669]" : "bg-[#f59e0b]"}`} />
      <img src="/compliance/watermark.svg" alt="" className="pointer-events-none absolute -bottom-8 -right-8 h-[139px] w-[107px] opacity-60" />
      <div className="flex flex-wrap items-center justify-between gap-4 pl-2">
        <div className="flex gap-3">
          <span className={`flex size-14 shrink-0 items-center justify-center rounded ${healthIndex.fastTrackEligible ? "bg-[#ecfdf5]" : "bg-[#fef3c7]"}`}>
            <img src="/compliance/medal.svg" alt="" className="h-[26px] w-5" />
          </span>
          <div className="max-w-2xl space-y-2">
            <span
              className={`inline-block rounded-sm px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                healthIndex.fastTrackEligible ? "bg-[#d1fae5] text-[#065f46]" : "bg-[#fef3c7] text-[#92400e]"
              }`}
            >
              {healthIndex.fastTrackEligible ? "Terakreditasi: Layak Fast-Track Verifikasi KIR" : "Belum Layak Fast-Track — Perlu Tindak Lanjut"}
            </span>
            <p className="font-mono text-[13px] text-[#45464d]">
              REG ID: <span className="font-bold text-[#191c1e]">{regId}</span>
            </p>
            <p className="text-sm text-[#45464d]">
              Berdasarkan <span className="font-semibold text-[#191c1e]">{compliancePct} kepatuhan P2H tercatat</span> dan{" "}
              <span className="font-semibold text-[#191c1e]">{healthIndex.criticalAnomalyCount} temuan kritis</span> pada riwayat
              telemetri unit. Sesuai standar{" "}
              <span className="font-bold text-[#191c1e]">Kepmen No. 1827 K/30/MEM/2018 (Lampiran II K3 Armada)</span> dan{" "}
              <span className="font-bold text-[#191c1e]">SNI ISO 39001:2012</span> Keselamatan Lalu Lintas Jalan.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[11px] font-bold text-[#45464d]">
              <span className="flex items-center gap-1">
                <img src="/compliance/calendar-issue.svg" alt="" className="size-3" />
                Terbit: {formatDateID(new Date())}
              </span>
              <span className="flex items-center gap-1">
                <img src="/compliance/auditor-org.svg" alt="" className="h-3 w-[13px]" />
                Auditor Terdaftar: PT Sucofindo Divisi SBU Mineral &amp; Batubara
              </span>
            </div>
          </div>
        </div>
        <div className="flex min-w-[200px] flex-col items-end gap-1 rounded bg-[#e6e8ea]/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Fast-Track Status</p>
          <p className={`flex items-center gap-2 text-lg font-bold ${healthIndex.fastTrackEligible ? "text-[#047857]" : "text-[#92400e]"}`}>
            <img src="/compliance/check-badge.svg" alt="" className="h-5 w-4" />
            {healthIndex.fastTrackEligible ? "DIREKOMENDASIKAN" : "BELUM MEMENUHI"}
          </p>
          <p className="text-xs text-[#45464d]">Skor Health Index: {healthIndex.score}/100</p>
        </div>
      </div>
    </div>
  );
}
