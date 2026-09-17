import { DOCUMENT_HEADER } from "./mockLaporanExport";

export default function OfficialDocumentHeader() {
  return (
    <div className="flex flex-col gap-2 pb-3 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/laporan/sucofindo-logo.png" alt="PT Sucofindo" className="size-10 object-contain" />
          <div>
            <p className="text-lg font-bold tracking-tight text-[#191c1e]">PT SUCOFINDO (PERSERO)</p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Holding BUMN Jasa Survei • IDSurvey</p>
            <p className="text-xs text-[#45464d]">
              Divisi Inspeksi &amp; Sertifikasi Keselamatan
              <br />
              Pertambangan (K3)
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#45464d]">{DOCUMENT_HEADER.formCode}</p>
          <p className="text-lg font-bold tracking-tight text-[#0f172a]">
            {DOCUMENT_HEADER.bapNumber.map((l) => (
              <span key={l} className="block text-right">
                {l}
              </span>
            ))}
          </p>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">{DOCUMENT_HEADER.issuedDate}</p>
        </div>
      </div>

      <div className="flex flex-col border-t-2 border-[#0f172a] pt-3">
        <h2 className="text-center text-xl font-bold uppercase tracking-wide text-[#191c1e]">{DOCUMENT_HEADER.title}</h2>
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-[#45464d]">{DOCUMENT_HEADER.subtitle}</p>
      </div>
    </div>
  );
}
