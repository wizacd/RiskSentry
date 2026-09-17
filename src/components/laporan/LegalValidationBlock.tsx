import { LEGAL_VALIDATION } from "./mockLaporanExport";

export default function LegalValidationBlock() {
  return (
    <div className="flex flex-col gap-1 pt-1">
      <div className="rounded-sm bg-[#e6e8ea] px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">III. Pengesahan Elektronik &amp; Jaminan Hukum</p>
      </div>
      <div className="grid grid-cols-1 gap-3 rounded-sm bg-[#f7f9fb] p-3 sm:grid-cols-12">
        <div className="flex flex-col items-center gap-1 rounded-sm bg-white p-2 shadow-sm sm:col-span-3">
          <img src="/laporan/qr-code.svg" alt="QR verifikasi dokumen" className="size-24" />
          <p className="text-center text-[11px] font-bold uppercase tracking-wide text-[#45464d]">{LEGAL_VALIDATION.qrCaption}</p>
          <p className="text-center text-xs text-[#45464d]">{LEGAL_VALIDATION.qrIssuer}</p>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">{LEGAL_VALIDATION.assessorLabel}</p>
              <p className="text-sm font-bold text-[#191c1e]">{LEGAL_VALIDATION.assessorName}</p>
              <p className="text-xs text-[#45464d]">
                {LEGAL_VALIDATION.assessorRole.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-sm bg-[#ecfdf5] p-2">
              <img src="/laporan/cert-badge.svg" alt="" className="size-[14px]" />
              <p className="text-[11px] font-bold tracking-wide text-[#065f46]">
                {LEGAL_VALIDATION.certifiedBadge.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="rounded-sm bg-[#f2f4f6] p-1">
            <p className="text-[11px] font-bold uppercase text-[#1e293b]">Cryptographic SHA-256 Digest:</p>
            <p className="break-all text-[10px] text-[#475569]">{LEGAL_VALIDATION.sha256}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#45464d]">
            <p>
              {LEGAL_VALIDATION.certRegistered.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <p>
              {LEGAL_VALIDATION.validity.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
