import { FleetRow, toneStyles } from "./mockFleetData";

export default function FleetDetailModal({ row, onClose }: { row: FleetRow; onClose: () => void }) {
  const tone = toneStyles(row.tone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6" onClick={onClose}>
      <div
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-[4px] bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`flex size-8 items-center justify-center rounded-sm text-base ${tone.badgeIcon}`}>
              {row.categoryEmoji}
            </span>
            <div>
              <p className="text-base font-bold text-[#191c1e]">
                {row.unitCode} <span className="text-[#545f73]">({row.subCode})</span>
              </p>
              <p className={`text-[11px] font-bold uppercase tracking-tight ${tone.scoreText}`}>{row.client}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-sm px-2 py-1 text-sm font-bold text-[#45464d] hover:bg-[#f2f4f6]"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className={`flex flex-col items-center rounded-sm px-3 py-1.5 ${tone.scoreBg}`}>
            <span className={`text-xl font-bold ${tone.scoreText}`}>{row.score.value}</span>
            <span className={`text-[9px] font-bold uppercase tracking-wide ${tone.scoreText}`}>{row.score.label}</span>
          </div>
          <span className={`flex items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-tight ${tone.statusBg} ${tone.statusText}`}>
            <span className={`size-1.5 rounded-full ${tone.statusDot}`} />
            {row.status.label}
          </span>
        </div>

        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Operator / Pengemudi</dt>
            <dd className="font-bold text-[#191c1e]">{row.operator.name}</dd>
            <dd className="text-[#545f73]">{row.operator.license}</dd>
            {row.operator.note && <dd className={`text-xs font-semibold uppercase ${tone.scoreText}`}>{row.operator.note}</dd>}
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Legalitas Kelaikan (SIA/KIR)</dt>
            <dd className={`font-bold uppercase ${tone.scoreText}`}>{row.legalitas.title}</dd>
            {row.legalitas.lines.map((line) => (
              <dd key={line} className="text-[#545f73]">
                {line}
              </dd>
            ))}
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Hasil Checklist Fisik P2H &amp; Telemetri</dt>
            <dd className={`font-bold uppercase ${tone.scoreText}`}>{row.checklist.title}</dd>
            <dd className="text-[#45464d]">{row.checklist.note}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
