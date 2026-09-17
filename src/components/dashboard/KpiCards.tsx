export interface FleetCounts {
  total: number;
  alatBerat: number;
  darat: number;
  aman: number;
  waspada: number;
  bahaya: number;
  bahayaAlatBerat: number;
  bahayaDarat: number;
}

function pct(n: number, total: number) {
  if (total === 0) return 0;
  return Math.round((n / total) * 100);
}

export default function KpiCards({
  counts,
  toneFilter,
  onSelectTone,
}: {
  counts: FleetCounts;
  toneFilter: "semua" | "aman" | "waspada" | "bahaya";
  onSelectTone: (tone: "semua" | "aman" | "waspada" | "bahaya") => void;
}) {
  const CARDS = [
    {
      id: "total",
      tone: "semua" as const,
      barColor: "bg-[#0f172a]",
      label: "Total Armada Multi-Moda",
      labelColor: "text-[#545f73]",
      value: String(counts.total),
      valueColor: "text-[#191c1e]",
      unit: "Unit Terdaftar",
      unitColor: "text-[#545f73]",
      icon: "/dashboard/fleet.svg",
      iconBg: "bg-[#eceef0]",
      footLabel: "Komposisi Terdata",
      footValue: `${counts.alatBerat} Alat Berat • ${counts.darat} Darat`,
      footValueBg: "bg-[#eceef0]",
      footValueColor: "text-black",
    },
    {
      id: "aman",
      tone: "aman" as const,
      barColor: "bg-[#059669]",
      label: "Kondisi Aman (Layak Operasi)",
      labelColor: "text-[#065f46]",
      value: String(counts.aman),
      valueColor: "text-[#047857]",
      unit: `Unit (${pct(counts.aman, counts.total)}%)`,
      unitColor: "text-[#065f46]",
      icon: "/dashboard/check-decorative.svg",
      iconBg: "",
      footLabel: "SIA Minerba & Rampcheck Lolos",
      footValue: `${pct(counts.aman, counts.total)}% dari Total Armada`,
      footValueColor: "text-[#047857]",
    },
    {
      id: "waspada",
      tone: "waspada" as const,
      barColor: "bg-[#f59e0b]",
      label: "Kondisi Waspada (Perbaikan)",
      labelColor: "text-[#92400e]",
      value: String(counts.waspada),
      valueColor: "text-[#b45309]",
      unit: `Unit (${pct(counts.waspada, counts.total)}%)`,
      unitColor: "text-[#92400e]",
      icon: "/dashboard/warning-triangle.svg",
      iconBg: "bg-[#fffbeb]",
      footLabel: "Tiket Servis Terjadwal",
      footValue: `${counts.waspada} Unit Perlu Tindak Lanjut`,
      footValueBg: "bg-[#fef3c7]/60",
      footValueColor: "text-[#92400e]",
    },
    {
      id: "dilarang",
      tone: "bahaya" as const,
      barColor: "bg-[#dc2626]",
      label: "Dilarang Beroperasi",
      labelColor: "text-[#b91c1c]",
      value: String(counts.bahaya),
      valueColor: "text-[#b91c1c]",
      unit: "Unit Grounded / BAP",
      unitColor: "text-[#991b1b]",
      icon: "/dashboard/ban.svg",
      iconBg: "bg-[#fef2f2]",
      footLabel: "K3 Minerba & Dishub",
      footLabelColor: "text-[#7f1d1d]",
      footValue: `${counts.bahayaAlatBerat} PIT • ${counts.bahayaDarat} JALAN`,
      footValueBg: "bg-[#dc2626]",
      footValueColor: "text-white",
      dot: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map((card) => {
        const active = toneFilter === card.tone;
        return (
          <button
            type="button"
            key={card.id}
            onClick={() => onSelectTone(active ? "semua" : card.tone)}
            aria-pressed={active}
            className={`relative flex flex-col justify-between overflow-hidden rounded-[4px] bg-white p-3 text-left shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-shadow ${
              active ? "ring-2 ring-[#131b2e]" : "hover:shadow-md"
            }`}
          >
            <div className={`absolute inset-y-0 left-0 w-1 ${card.barColor}`} />
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold uppercase tracking-wide ${card.labelColor}`}>{card.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-[28px] font-bold tracking-tight ${card.valueColor}`}>{card.value}</span>
                  {card.dot && <span className="size-2 rounded-full bg-[#dc2626]" />}
                  <span className={`text-[13px] font-medium ${card.unitColor}`}>{card.unit}</span>
                </div>
              </div>
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-sm ${card.iconBg}`}>
                <img src={card.icon} alt="" className={card.id === "aman" ? "h-8 w-16" : "size-3.5"} />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-[#f2f4f6] pt-1.5">
              <span className={`text-xs ${card.footLabelColor ?? "text-[#45464d]"} ${card.id === "dilarang" ? "uppercase" : ""}`}>
                {card.footLabel}
              </span>
              <span
                className={`flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[13px] font-bold ${card.footValueBg ?? ""} ${card.footValueColor}`}
              >
                {card.footValue}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
