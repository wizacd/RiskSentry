import { FleetRow, toneStyles } from "./mockFleetData";

const GRID_TEMPLATE = "300px 190px 190px 200px 90px 110px 170px 140px";

const HEADERS = [
  "Unit & No. Lambung / Polisi",
  "Operator/Pengemudi & Lisensi",
  "Legalitas Kelaikan (SIA/KIR)",
  "Hasil Checklist Fisik P2H & Telemetri",
  "Tren Kepatuhan",
  "Skor Kelaikan",
  "Status Operasi",
  "Aksi Asesor",
];

const ACTION_STYLES: Record<string, string> = {
  neutral: "bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]",
  bahaya: "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
  waspada: "bg-[#fef3c7] text-[#78350f] hover:bg-[#fde68a]",
  aman: "bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]",
};

function actionKey(rowId: string, label: string) {
  return `${rowId}:${label}`;
}

function FleetTableRow({
  row,
  submittedKeys,
  onDetail,
  onAction,
}: {
  row: FleetRow;
  submittedKeys: Set<string>;
  onDetail: (row: FleetRow) => void;
  onAction: (rowId: string, label: string) => void;
}) {
  const tone = toneStyles(row.tone);

  return (
    <div
      className={`grid items-center border-t border-[#f2f4f6] px-0 py-3 ${tone.row}`}
      style={{ gridTemplateColumns: GRID_TEMPLATE }}
    >
      <div className={`flex items-center gap-2 border-l-4 pl-3 pr-2 ${tone.border}`}>
        <div className={`flex size-7 shrink-0 items-center justify-center rounded-sm ${tone.badgeIcon} text-sm`}>
          {row.categoryEmoji}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[13px] font-bold text-[#191c1e]">{row.unitCode}</span>
            <span className="rounded-sm bg-[#eceef0] px-1 text-[10px] font-bold text-[#545f73]">{row.subCode}</span>
            <span className={`rounded-sm px-1 text-[9px] font-bold uppercase tracking-tight ${tone.badge}`}>
              {row.category === "alat_berat" ? "Alat Berat" : "Darat"}
            </span>
          </div>
          <p className={`truncate text-[10px] font-bold uppercase tracking-tight ${tone.scoreText}`}>{row.client}</p>
        </div>
      </div>

      <div className="pr-2">
        <p className="text-[13px] font-bold text-[#191c1e]">{row.operator.name}</p>
        <p className="text-[11px] font-bold text-[#545f73]">{row.operator.license}</p>
        {row.operator.note && (
          <p className={`text-[10px] font-semibold uppercase ${tone.scoreText}`}>{row.operator.note}</p>
        )}
      </div>

      <div className="pr-2">
        <div className="flex items-start gap-1">
          <img src={row.legalitas.icon} alt="" className="mt-0.5 size-3 shrink-0" />
          <p className={`text-xs font-bold uppercase leading-tight ${tone.scoreText}`}>{row.legalitas.title}</p>
        </div>
        {row.legalitas.lines.map((line) => (
          <p key={line} className="text-[11px] text-[#545f73]">
            {line}
          </p>
        ))}
      </div>

      <div className="pr-2">
        <div className="flex items-start gap-1">
          <img src={row.checklist.icon} alt="" className="mt-0.5 size-3 shrink-0" />
          <p className={`text-[11px] font-bold uppercase leading-tight tracking-tight ${tone.scoreText}`}>
            {row.checklist.title}
          </p>
        </div>
        <p className="truncate text-[11px] text-[#45464d]">{row.checklist.note}</p>
      </div>

      <div className="flex justify-center">
        <img src={row.trendIcon} alt="" className="h-6 w-16" />
      </div>

      <div className="flex justify-center">
        <div className={`flex flex-col items-center rounded-sm px-2.5 py-1 ${tone.scoreBg}`}>
          <span className={`text-[15px] font-bold ${tone.scoreText}`}>{row.score.value}</span>
          <span className={`text-[9px] font-bold uppercase tracking-wide ${tone.scoreText}`}>{row.score.label}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className={`flex items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-tight ${tone.statusBg} ${tone.statusText}`}>
          <span className={`size-1.5 rounded-full ${tone.statusDot}`} />
          {row.status.label}
        </span>
      </div>

      <div className="flex items-center justify-end gap-1 pr-3">
        {row.actions.map((action) => {
          if (action.label === "Detail") {
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onDetail(row)}
                className={`rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-tight ${ACTION_STYLES[action.tone]}`}
              >
                {action.label}
              </button>
            );
          }
          const key = actionKey(row.id, action.label);
          const done = submittedKeys.has(key);
          return (
            <button
              key={action.label}
              type="button"
              disabled={done}
              onClick={() => onAction(row.id, action.label)}
              className={`rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-tight ${
                done ? "bg-[#eceef0] text-[#94a3b8]" : ACTION_STYLES[action.tone]
              }`}
            >
              {done ? "✓ Terkirim" : action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FleetTable({
  rows,
  totalCount,
  submittedKeys,
  onDetail,
  onAction,
}: {
  rows: FleetRow[];
  totalCount: number;
  submittedKeys: Set<string>;
  onDetail: (row: FleetRow) => void;
  onAction: (rowId: string, label: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[4px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="overflow-x-auto">
        <div className="min-w-[1380px]">
          <div className="grid bg-[#eceef0] px-0 py-4" style={{ gridTemplateColumns: GRID_TEMPLATE }}>
            {HEADERS.map((header, i) => {
              const align = i === HEADERS.length - 1 ? "text-right" : i >= 4 ? "text-center" : "text-left";
              return (
                <span key={header} className={`px-3 text-[11px] font-bold uppercase tracking-wide text-[#45464d] ${align}`}>
                  {header}
                </span>
              );
            })}
          </div>
          {rows.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-[#45464d]">Tidak ada unit yang cocok dengan filter ini.</p>
          ) : (
            rows.map((row) => (
              <FleetTableRow key={row.id} row={row} submittedKeys={submittedKeys} onDetail={onDetail} onAction={onAction} />
            ))
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f4f6] px-3 py-2">
        <p className="text-[13px] font-semibold tracking-tight text-[#191c1e]">
          Menampilkan {rows.length} dari {totalCount} Unit Armada Terpadu (74 Alat Berat Tambang • 112 Angkutan Darat)
          <span className="mx-1 text-[#c6c6cd]">•</span>
          <span className="font-medium text-[#45464d]">
            Regulasi: Kepmen ESDM No. 1827 K/30/MEM/2018 (K3 Minerba) &amp; UU No. 22 Tahun 2009 / Permenhub Rampcheck
          </span>
        </p>
        <div className="flex items-center gap-1">
          <button type="button" aria-current="page" className="rounded-sm bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[#191c1e] shadow-sm">
            Halaman 1
          </button>
          <button
            type="button"
            disabled
            title="Data contoh (mock) hanya mencakup halaman 1"
            className="cursor-not-allowed rounded-sm bg-white px-2 py-1 text-[11px] font-bold text-[#c6c6cd] shadow-sm"
          >
            2
          </button>
          <button
            type="button"
            disabled
            title="Data contoh (mock) hanya mencakup halaman 1"
            className="cursor-not-allowed rounded-sm bg-white px-2 py-1 text-[11px] font-bold text-[#c6c6cd] shadow-sm"
          >
            3
          </button>
        </div>
      </div>
    </div>
  );
}
