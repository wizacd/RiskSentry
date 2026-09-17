"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import KpiCards from "@/components/dashboard/KpiCards";
import Toolbar, { CategoryFilter } from "@/components/dashboard/Toolbar";
import FleetTable from "@/components/dashboard/FleetTable";
import FleetDetailModal from "@/components/dashboard/FleetDetailModal";
import { FLEET_ROWS, FleetRow, FleetTone } from "@/components/dashboard/mockFleetData";

const TOTAL_UNIT_COUNT = 186;

type ToneFilter = "semua" | FleetTone;

function downloadCsv(rows: FleetRow[]) {
  const header = ["Unit", "No Lambung/Polisi", "Klien", "Operator", "Skor Kelaikan", "Status Operasi"];
  const lines = rows.map((row) =>
    [row.unitCode, row.subCode, row.client, row.operator.name, row.score.value, row.status.label]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fleet-inspection-matrix.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [client, setClient] = useState("semua");
  const [unitType, setUnitType] = useState("semua");
  const [category, setCategory] = useState<CategoryFilter>("semua");
  const [toneFilter, setToneFilter] = useState<ToneFilter>("semua");
  const [sortByRisk, setSortByRisk] = useState(false);
  const [bapOnly, setBapOnly] = useState(false);
  const [submittedKeys, setSubmittedKeys] = useState<Set<string>>(new Set());
  const [detailRow, setDetailRow] = useState<FleetRow | null>(null);

  const counts = useMemo(
    () => ({
      total: TOTAL_UNIT_COUNT,
      alatBerat: 74,
      darat: 112,
      grounded: FLEET_ROWS.filter((r) => r.tone === "bahaya").length,
      waspada: FLEET_ROWS.filter((r) => r.tone === "waspada").length,
      laik: FLEET_ROWS.filter((r) => r.tone === "aman").length,
    }),
    []
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = FLEET_ROWS.filter((row) => {
      const matchesCategory = category === "semua" || row.category === category;
      const matchesClient = client === "semua" || row.client === client;
      const matchesUnitType = unitType === "semua" || row.unitType === unitType;
      const matchesTone = toneFilter === "semua" || row.tone === toneFilter;
      const matchesBap = !bapOnly || row.tone === "bahaya";
      const matchesQuery =
        q.length === 0 ||
        row.unitCode.toLowerCase().includes(q) ||
        row.subCode.toLowerCase().includes(q) ||
        row.operator.name.toLowerCase().includes(q) ||
        row.client.toLowerCase().includes(q);
      return matchesCategory && matchesClient && matchesUnitType && matchesTone && matchesBap && matchesQuery;
    });
    if (sortByRisk) {
      return [...filtered].sort((a, b) => b.score.value - a.score.value);
    }
    return filtered;
  }, [query, client, unitType, category, toneFilter, bapOnly, sortByRisk]);

  function handleAction(rowId: string, label: string) {
    setSubmittedKeys((prev) => new Set(prev).add(`${rowId}:${label}`));
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 overflow-x-auto px-6 py-4">
          <TelemetryTicker />
          <KpiCards toneFilter={toneFilter} onSelectTone={setToneFilter} />
          <Toolbar
            query={query}
            onQueryChange={setQuery}
            client={client}
            onClientChange={setClient}
            unitType={unitType}
            onUnitTypeChange={setUnitType}
            category={category}
            onCategoryChange={setCategory}
            sortByRisk={sortByRisk}
            onToggleSortByRisk={() => setSortByRisk((v) => !v)}
            bapOnly={bapOnly}
            onToggleBapOnly={() => setBapOnly((v) => !v)}
            onExportCsv={() => downloadCsv(rows)}
            counts={counts}
          />
          <FleetTable rows={rows} totalCount={TOTAL_UNIT_COUNT} submittedKeys={submittedKeys} onDetail={setDetailRow} onAction={handleAction} />
        </main>
      </div>
      {detailRow && <FleetDetailModal row={detailRow} onClose={() => setDetailRow(null)} />}
    </div>
  );
}
