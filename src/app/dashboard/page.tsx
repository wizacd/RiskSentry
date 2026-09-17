"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import KpiCards from "@/components/dashboard/KpiCards";
import Toolbar, { CategoryFilter } from "@/components/dashboard/Toolbar";
import FleetTable from "@/components/dashboard/FleetTable";
import FleetDetailModal from "@/components/dashboard/FleetDetailModal";
import { useFleetData } from "@/components/dashboard/useFleetData";
import { FleetRow, FleetTone } from "@/components/dashboard/fleetTypes";

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

  const { rows: allRows, loading } = useFleetData();

  const clientOptions = useMemo(() => Array.from(new Set(allRows.map((r) => r.client))).sort(), [allRows]);
  const unitTypeOptions = useMemo(() => Array.from(new Set(allRows.map((r) => r.unitType))).sort(), [allRows]);

  const counts = useMemo(() => {
    const bahayaRows = allRows.filter((r) => r.tone === "bahaya");
    return {
      total: allRows.length,
      alatBerat: allRows.filter((r) => r.category === "alat_berat").length,
      darat: allRows.filter((r) => r.category === "darat").length,
      aman: allRows.filter((r) => r.tone === "aman").length,
      waspada: allRows.filter((r) => r.tone === "waspada").length,
      bahaya: bahayaRows.length,
      bahayaAlatBerat: bahayaRows.filter((r) => r.category === "alat_berat").length,
      bahayaDarat: bahayaRows.filter((r) => r.category === "darat").length,
    };
  }, [allRows]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = allRows.filter((row) => {
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
      return [...filtered].sort((a, b) => a.score.value - b.score.value);
    }
    return filtered;
  }, [allRows, query, client, unitType, category, toneFilter, bapOnly, sortByRisk]);

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
          <KpiCards counts={counts} toneFilter={toneFilter} onSelectTone={setToneFilter} />
          <Toolbar
            query={query}
            onQueryChange={setQuery}
            client={client}
            onClientChange={setClient}
            clientOptions={clientOptions}
            unitType={unitType}
            onUnitTypeChange={setUnitType}
            unitTypeOptions={unitTypeOptions}
            category={category}
            onCategoryChange={setCategory}
            sortByRisk={sortByRisk}
            onToggleSortByRisk={() => setSortByRisk((v) => !v)}
            bapOnly={bapOnly}
            onToggleBapOnly={() => setBapOnly((v) => !v)}
            onExportCsv={() => downloadCsv(rows)}
            counts={{
              total: counts.total,
              alatBerat: counts.alatBerat,
              darat: counts.darat,
              grounded: counts.bahaya,
              waspada: counts.waspada,
              laik: counts.aman,
            }}
          />
          {loading ? (
            <div className="rounded-[4px] bg-white p-10 text-center text-sm text-[#45464d] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              Memuat data armada dari Supabase...
            </div>
          ) : (
            <FleetTable
              rows={rows}
              totalCount={counts.total}
              alatBeratCount={counts.alatBerat}
              daratCount={counts.darat}
              submittedKeys={submittedKeys}
              onDetail={setDetailRow}
              onAction={handleAction}
            />
          )}
        </main>
      </div>
      {detailRow && <FleetDetailModal row={detailRow} onClose={() => setDetailRow(null)} />}
    </div>
  );
}
