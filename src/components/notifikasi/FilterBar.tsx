import { FAST_FILTERS, FastFilterId } from "./notificationTypes";

export default function FilterBar({
  activeFilter,
  onFilterChange,
  counts,
  query,
  onQueryChange,
  site,
  onSiteChange,
  siteOptions,
}: {
  activeFilter: FastFilterId;
  onFilterChange: (id: FastFilterId) => void;
  counts: Record<FastFilterId, number>;
  query: string;
  onQueryChange: (value: string) => void;
  site: string;
  onSiteChange: (value: string) => void;
  siteOptions: string[];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {FAST_FILTERS.map((f) => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold ${
                active ? "bg-black text-white" : "bg-[#f2f4f6] text-[#45464d]"
              }`}
            >
              {f.id === "unread" && <span className="size-2 rounded-full bg-[#ba1a1a]" />}
              {f.label} ({counts[f.id]})
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
        <div className="relative sm:col-span-6">
          <img src="/notifikasi/search.svg" alt="" className="pointer-events-none absolute left-3 top-1/2 size-3 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Cari No. Lambung (DT-042), No. Plat, atau ID Kasus..."
            className="w-full rounded-sm bg-[#f2f4f6] py-2 pl-9 pr-3 text-sm text-[#191c1e] placeholder:text-[#76777d] focus:outline-none focus:ring-2 focus:ring-[#131b2e]/20"
          />
        </div>
        <select
          value={site}
          onChange={(e) => onSiteChange(e.target.value)}
          className="rounded-sm bg-[#f2f4f6] px-3 py-2 text-sm text-[#191c1e] sm:col-span-3"
        >
          <option value="semua">Semua Wilayah Operasi (Klien)</option>
          {siteOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select className="rounded-sm bg-[#f2f4f6] px-3 py-2 text-sm text-[#191c1e] sm:col-span-3" defaultValue="shift1">
          <option value="shift1">Hari Ini • Shift 1 (07:00 - 15:00)</option>
          <option value="shift2">Hari Ini • Shift 2 (15:00 - 23:00)</option>
          <option value="24h">24 Jam Terakhir</option>
        </select>
      </div>
    </div>
  );
}
