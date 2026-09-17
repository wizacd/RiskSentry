export type CategoryFilter = "semua" | "alat_berat" | "darat";

export default function Toolbar({
  query,
  onQueryChange,
  client,
  onClientChange,
  clientOptions,
  unitType,
  onUnitTypeChange,
  unitTypeOptions,
  category,
  onCategoryChange,
  sortByRisk,
  onToggleSortByRisk,
  bapOnly,
  onToggleBapOnly,
  onExportCsv,
  counts,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  client: string;
  onClientChange: (value: string) => void;
  clientOptions: string[];
  unitType: string;
  onUnitTypeChange: (value: string) => void;
  unitTypeOptions: string[];
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  sortByRisk: boolean;
  onToggleSortByRisk: () => void;
  bapOnly: boolean;
  onToggleBapOnly: () => void;
  onExportCsv: () => void;
  counts: { total: number; alatBerat: number; darat: number; grounded: number; waspada: number; laik: number };
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[4px] bg-white p-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <img
              src="/dashboard/search.svg"
              alt=""
              className="pointer-events-none absolute left-3 top-1/2 h-[13px] w-[13px] -translate-y-1/2"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Cari No. Lambung/Polisi, Alat/Unit, Operator..."
              className="w-60 rounded-sm bg-[#f2f4f6] py-1.5 pl-8 pr-3 text-sm text-[#191c1e] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] placeholder:text-[#76777d] focus:outline-none focus:ring-2 focus:ring-[#131b2e]/20"
            />
          </div>
          <div className="relative">
            <select
              value={client}
              onChange={(e) => onClientChange(e.target.value)}
              className="appearance-none rounded-sm bg-[#f2f4f6] py-1.5 pl-3 pr-8 text-[11px] font-bold uppercase tracking-wide text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#131b2e]/20"
            >
              <option value="semua">{`Semua Klien Tambang, PO Bus & Logistik (${counts.total})`}</option>
              {clientOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <img
              src="/dashboard/chevron-down.svg"
              alt=""
              className="pointer-events-none absolute right-3 top-1/2 h-[5px] w-[8px] -translate-y-1/2"
            />
          </div>
          <div className="relative">
            <select
              value={unitType}
              onChange={(e) => onUnitTypeChange(e.target.value)}
              className="appearance-none rounded-sm bg-[#f2f4f6] py-1.5 pl-3 pr-8 text-[11px] font-bold uppercase tracking-wide text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#131b2e]/20"
            >
              <option value="semua">Semua Tipe Unit Multi-Moda</option>
              {unitTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <img
              src="/dashboard/chevron-down.svg"
              alt=""
              className="pointer-events-none absolute right-3 top-1/2 h-[5px] w-[8px] -translate-y-1/2"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSortByRisk}
            aria-pressed={sortByRisk}
            className="flex items-center gap-1 rounded-sm bg-[#f2f4f6] px-2.5 py-1.5"
          >
            <span className={`flex h-4 w-7 items-center rounded-full transition-colors ${sortByRisk ? "bg-[#131b2e] justify-end" : "bg-[#c6c6cd] justify-start"} px-0.5`}>
              <span className="size-3 rounded-full bg-white" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-tight text-[#191c1e]">Triage Risiko Teratas</span>
          </button>
          <button
            type="button"
            onClick={onExportCsv}
            className="flex items-center gap-1 rounded-sm bg-[#eceef0] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#191c1e] hover:bg-[#e0e3e5]"
          >
            <img src="/dashboard/csv.svg" alt="" className="size-3" />
            CSV
          </button>
          <button
            type="button"
            onClick={onToggleBapOnly}
            aria-pressed={bapOnly}
            className={`flex items-center gap-1 rounded-sm px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide ${
              bapOnly ? "bg-[#dc2626] text-white" : "bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]"
            }`}
          >
            <img src="/dashboard/bap.svg" alt="" className="size-[13px]" style={bapOnly ? { filter: "invert(1)" } : undefined} />
            BAP K3 / Dishub
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f2f4f6] pt-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#545f73]">Kategori Armada:</span>
          <button
            type="button"
            onClick={() => onCategoryChange("semua")}
            className={`rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
              category === "semua" ? "bg-black text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : "bg-[#f2f4f6] text-[#45464d]"
            }`}
          >
            {`Semua Armada (${counts.total})`}
          </button>
          <button
            type="button"
            onClick={() => onCategoryChange("alat_berat")}
            className={`rounded-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              category === "alat_berat" ? "bg-black text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : "bg-[#f2f4f6] text-[#45464d]"
            }`}
          >
            {`🚜 Alat Berat Tambang & Konstruksi (${counts.alatBerat})`}
          </button>
          <button
            type="button"
            onClick={() => onCategoryChange("darat")}
            className={`rounded-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              category === "darat" ? "bg-black text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : "bg-[#f2f4f6] text-[#45464d]"
            }`}
          >
            {`🚛 Transportasi Darat: Truk & Bus (${counts.darat})`}
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#dc2626]" />
          <span className="text-[11px] font-bold uppercase text-[#b91c1c]">{`Grounded (${counts.grounded})`}</span>
          <span className="size-2 rounded-full bg-[#f59e0b]" />
          <span className="text-[11px] font-bold uppercase text-[#b45309]">{`Waspada (${counts.waspada})`}</span>
          <span className="size-2 rounded-full bg-[#059669]" />
          <span className="text-[11px] font-bold uppercase text-[#047857]">{`Layak (${counts.laik})`}</span>
        </div>
      </div>
    </div>
  );
}
