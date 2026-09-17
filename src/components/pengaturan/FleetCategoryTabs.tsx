import { FLEET_CATEGORIES } from "./mockThresholdConfig";

export default function FleetCategoryTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded bg-white p-1 shadow-sm">
      {FLEET_CATEGORIES.map((cat) => {
        const active = cat.id === activeId;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 rounded-sm px-3 py-2 text-left ${active ? "bg-[#131b2e]" : "hover:bg-[#f2f4f6]"}`}
          >
            <img src={cat.icon} alt="" className={`size-3.5 ${active ? "invert" : "opacity-70"}`} />
            <span>
              <span className={`block text-xs font-bold ${active ? "text-white" : "text-[#45464d]"}`}>{cat.label}</span>
              <span className={`block text-[9px] font-semibold uppercase tracking-wide ${active ? "text-white/80" : "text-[#45464d]/70"}`}>
                {cat.subtitle}
              </span>
            </span>
            {active && <span className="ml-1 size-2 shrink-0 rounded-full bg-white" />}
          </button>
        );
      })}
    </div>
  );
}
