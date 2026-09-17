"use client";

import type { Severity } from "./anomaliTypes";

export type SortOrder = "tertinggi" | "terendah";

export default function FilterToolbar({
  severityFilter,
  onSeverityFilter,
  counts,
  category,
  onCategory,
  categoryOptions,
  vehicleType,
  onVehicleType,
  vehicleTypeOptions,
  search,
  onSearch,
  sortOrder,
  onToggleSort,
  visibleCount,
  totalCount,
}: {
  severityFilter: Severity | "semua";
  onSeverityFilter: (v: Severity | "semua") => void;
  counts: { semua: number; bahaya: number; waspada: number };
  category: string;
  onCategory: (v: string) => void;
  categoryOptions: string[];
  vehicleType: string;
  onVehicleType: (v: string) => void;
  vehicleTypeOptions: string[];
  search: string;
  onSearch: (v: string) => void;
  sortOrder: SortOrder;
  onToggleSort: () => void;
  visibleCount: number;
  totalCount: number;
}) {
  return (
    <div className="bg-[#f7f9fb] px-6 py-2">
      <div className="flex flex-col gap-3 rounded bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-md bg-[#f2f4f6] p-1">
            <button
              type="button"
              onClick={() => onSeverityFilter("semua")}
              className={`rounded-sm px-3 py-1.5 text-[11px] font-bold tracking-wide ${
                severityFilter === "semua" ? "bg-white text-[#191c1e] shadow-sm" : "text-[#45464d] hover:text-[#191c1e]"
              }`}
            >
              Semua Potensi Risiko ({counts.semua})
            </button>
            <button
              type="button"
              onClick={() => onSeverityFilter("bahaya")}
              className={`flex items-center gap-1 rounded-sm px-3 py-1.5 text-[11px] font-bold tracking-wide ${
                severityFilter === "bahaya" ? "bg-white text-[#191c1e] shadow-sm" : "text-[#45464d] hover:text-[#191c1e]"
              }`}
            >
              <span className="size-2 rounded-full bg-[#ba1a1a]" />
              Bahaya ({counts.bahaya})
            </button>
            <button
              type="button"
              onClick={() => onSeverityFilter("waspada")}
              className={`flex items-center gap-1 rounded-sm px-3 py-1.5 text-[11px] font-bold tracking-wide ${
                severityFilter === "waspada" ? "bg-white text-[#191c1e] shadow-sm" : "text-[#45464d] hover:text-[#191c1e]"
              }`}
            >
              <span className="size-2 rounded-full bg-[#d5e0f8]" />
              Waspada ({counts.waspada})
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Kategori:</span>
            <select
              value={category}
              onChange={(e) => onCategory(e.target.value)}
              className="rounded-sm bg-[#f2f4f6] px-3 py-1.5 text-[11px] font-bold text-[#191c1e]"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={vehicleType}
              onChange={(e) => onVehicleType(e.target.value)}
              className="rounded-sm bg-[#f2f4f6] px-3 py-1.5 text-[11px] font-bold text-[#191c1e]"
            >
              {vehicleTypeOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="relative max-w-md flex-1">
            <img src="/anomali/search.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 size-3 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Cari No. Lambung, Plat, Driver, atau Gejala Kerusakan..."
              className="w-full rounded-sm bg-[#f2f4f6] py-2 pl-9 pr-3 text-xs text-[#191c1e] placeholder:text-[#45464d] focus:outline-none focus:ring-1 focus:ring-[#188ace]"
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onToggleSort} className="flex items-center gap-1.5 text-[11px] font-bold text-[#45464d] hover:text-[#191c1e]">
              <img src="/anomali/sort.svg" alt="" className="h-2 w-3" />
              Urutkan: Skor Risiko K3 ({sortOrder === "tertinggi" ? "Tertinggi" : "Terendah"})
            </button>
            <span className="text-[#e6e8ea]">|</span>
            <span className="text-[11px] font-bold text-[#45464d]">
              Menampilkan {visibleCount} dari {totalCount} Kasus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
