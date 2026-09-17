import { CREDENTIAL } from "./mockCompliancePassport";

export default function CredentialBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-white via-white to-[#f2f4f6] p-5 shadow-sm">
      <div className="absolute inset-y-0 left-0 w-2.5 bg-[#059669]" />
      <img src="/compliance/watermark.svg" alt="" className="pointer-events-none absolute -bottom-8 -right-8 h-[139px] w-[107px] opacity-60" />
      <div className="flex flex-wrap items-center justify-between gap-4 pl-2">
        <div className="flex gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center rounded bg-[#ecfdf5]">
            <img src="/compliance/medal.svg" alt="" className="h-[26px] w-5" />
          </span>
          <div className="max-w-2xl space-y-2">
            <span className="inline-block rounded-sm bg-[#d1fae5] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#065f46]">
              Terakreditasi: Layak Fast-Track Verifikasi KIR 2025
            </span>
            <p className="font-mono text-[13px] text-[#45464d]">
              REG ID: <span className="font-bold text-[#191c1e]">{CREDENTIAL.regId}</span>
            </p>
            <p className="text-sm text-[#45464d]">
              Berdasarkan pemenuhan <span className="font-semibold text-[#191c1e]">{CREDENTIAL.complianceRate} kepatuhan P2H harian</span> tanpa
              catatan potensi risiko fatal selama 180 hari operasional (Periode Audit: 01 Mei – 31 Oktober 2024). Sesuai standar{" "}
              <span className="font-bold text-[#191c1e]">Kepmen No. 1827 K/30/MEM/2018 (Lampiran II K3 Armada)</span> dan{" "}
              <span className="font-bold text-[#191c1e]">SNI ISO 39001:2012</span> Keselamatan Lalu Lintas Jalan.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[11px] font-bold text-[#45464d]">
              <span className="flex items-center gap-1">
                <img src="/compliance/calendar-issue.svg" alt="" className="size-3" />
                Terbit: {CREDENTIAL.issuedAt}
              </span>
              <span className="flex items-center gap-1">
                <img src="/compliance/auditor-org.svg" alt="" className="h-3 w-[13px]" />
                Auditor Terdaftar: {CREDENTIAL.auditorOrg}
              </span>
              <span className="flex items-center gap-1 text-[#188ace]">
                <img src="/compliance/ledger-lock.svg" alt="" className="h-3 w-2.5" />
                {CREDENTIAL.ledgerStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="flex min-w-[200px] flex-col items-end gap-1 rounded bg-[#e6e8ea]/40 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Fast-Track Status</p>
          <p className="flex items-center gap-2 text-lg font-bold text-[#047857]">
            <img src="/compliance/check-badge.svg" alt="" className="h-5 w-4" />
            {CREDENTIAL.fastTrackStatus}
          </p>
          <p className="text-xs text-[#45464d]">{CREDENTIAL.fastTrackNote}</p>
        </div>
      </div>
    </div>
  );
}
