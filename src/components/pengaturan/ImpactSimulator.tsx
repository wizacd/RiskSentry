import { CASE_STUDIES, IMPACT_STATS } from "./mockThresholdConfig";

function computeStatus(score: number, t1: number, t2: number) {
  if (score < t1) return { tone: "aman" as const, label: "AMAN (Beroperasi)" };
  if (score < t2) return { tone: "waspada" as const, label: "WASPADA (Tiket WO)" };
  return { tone: "bahaya" as const, label: "BAHAYA • GROUNDED" };
}

const NEW_STATUS_STYLE = {
  aman: { bg: "bg-[#ecfdf5]", dot: "bg-[#059669]", text: "text-[#065f46]" },
  waspada: { bg: "bg-[#d5e0f8]", dot: "bg-[#545f73]", text: "text-[#111c2d]" },
  bahaya: { bg: "bg-[#ffdad6]", dot: "bg-[#ba1a1a]", text: "text-[#93000a]" },
};

export default function ImpactSimulator({
  categoryId,
  categoryLabel,
  t1,
  t2,
}: {
  categoryId: string;
  categoryLabel: string;
  t1: number;
  t2: number;
}) {
  const showCaseStudies = categoryId === "bus";

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-[#191c1e]">Simulasi Dampak Real-Time</h2>
        <p className="text-xs text-[#45464d]">Pratinjau langsung efek perubahan ambang batas terhadap armada {categoryLabel}.</p>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded bg-[#f2f4f6] p-2">
        <div className="rounded-sm bg-white px-2 pb-4 pt-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Armada Terpantau</p>
          <p className="mt-1 text-2xl font-bold text-[#191c1e]">{IMPACT_STATS.monitored}</p>
          <p className="text-[10px] text-[#45464d]">{IMPACT_STATS.monitoredLabel}</p>
        </div>
        <div className="rounded-sm bg-white px-2 pb-4 pt-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Menjadi Waspada</p>
          <p className="mt-1 text-2xl font-bold text-[#111c2d]">{IMPACT_STATS.becameWaspada}</p>
          <p className="text-[10px] text-[#45464d]">{IMPACT_STATS.becameWaspadaNote}</p>
        </div>
        <div className="rounded-sm bg-white px-2 py-2 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Menjadi Grounded</p>
          <p className="mt-1 text-2xl font-bold text-[#ba1a1a]">{IMPACT_STATS.becameGrounded}</p>
          <p className="text-[10px] font-bold text-[#ba1a1a]">{IMPACT_STATS.becameGroundedNote.join(" ")}</p>
        </div>
      </div>

      {!showCaseStudies && (
        <p className="rounded bg-[#f2f4f6] p-4 text-center text-xs text-[#45464d]">
          Studi kasus simulasi unit untuk kategori {categoryLabel} belum tersedia — coba pilih kategori Bus Karyawan / Penumpang.
        </p>
      )}

      {showCaseStudies &&
        CASE_STUDIES.map((unit) => {
          const newStatus = computeStatus(unit.fieldScore, t1, t2);
          const style = NEW_STATUS_STYLE[newStatus.tone];
          return (
            <div key={unit.id} className="rounded bg-[#f2f4f6] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-sm bg-white">
                    <img src="/pengaturan/unit-icon.svg" alt="" className="h-3.5 w-3" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#191c1e]">{unit.name}</p>
                    <p className="text-xs text-[#45464d]">{unit.plateInfo.join(" ")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Skor Lapangan</p>
                  <p className="text-lg font-bold text-[#191c1e]">
                    {unit.fieldScore}
                    <span className="text-xs font-normal text-[#45464d]">/100</span>
                  </p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 rounded-sm bg-white p-2 text-[11px] text-[#45464d]">
                {unit.microIndicators.map((ind, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {ind.dot && <span className={`size-1.5 rounded-full ${ind.dot}`} />}
                    {ind.lines.join(" ")}
                    {i < unit.microIndicators.length - 1 && <span className="text-[#c6c6cd]">•</span>}
                  </span>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-sm bg-white p-2">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Status Lama (Ambang {unit.oldThreshold})</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#545f73]" />
                    <span className="text-[11px] font-bold text-[#191c1e]">{unit.oldStatusLabel.join(" ")}</span>
                  </div>
                </div>
                <div className={`rounded-sm p-2 ${style.bg}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-wide ${style.text} opacity-80`}>Status Baru (Ambang Saat Ini)</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className={`size-2 rounded-full ${style.dot}`} />
                    <span className={`text-[11px] font-bold uppercase ${style.text}`}>{newStatus.label}</span>
                  </div>
                </div>
              </div>

              <div className={`mt-2 flex items-start gap-1.5 ${unit.note.tone === "bahaya" ? "text-[#ba1a1a]" : "text-[#45464d]"}`}>
                <img src={unit.note.icon} alt="" className="mt-0.5 size-3 shrink-0" />
                <p className="text-xs">{unit.note.lines.join(" ")}</p>
              </div>
            </div>
          );
        })}

      <div className="flex items-center gap-3 rounded-sm bg-[#f2f4f6] p-3">
        <img src="/pengaturan/shield-lock.svg" alt="" className="h-5 w-4 shrink-0" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">IDSurvey Compliance Audit Trail</p>
          <p className="text-xs text-[#45464d]">
            Setiap perubahan threshold tercatat otomatis dalam log audit internal, lengkap dengan waktu dan nama asesor yang mengubah untuk transparansi
            dan penelusuran keputusan di kemudian hari.
          </p>
        </div>
      </div>
    </div>
  );
}
