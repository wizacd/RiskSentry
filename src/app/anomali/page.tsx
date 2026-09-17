"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import OperationalHeaderArea from "@/components/anomali/OperationalHeaderArea";
import MetricKpiStrip from "@/components/anomali/MetricKpiStrip";
import FilterToolbar, { type SortOrder } from "@/components/anomali/FilterToolbar";
import AnomalyCard from "@/components/anomali/AnomalyCard";
import { useAnomaliData } from "@/components/anomali/useAnomaliData";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Severity } from "@/components/anomali/anomaliTypes";

export default function AnomaliPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { items: baseItems, loading } = useAnomaliData();
  const [simulating, setSimulating] = useState(false);
  const [zeroMode, setZeroMode] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<Severity | "semua">("semua");
  const [category, setCategory] = useState("Semua Kategori Masalah");
  const [vehicleType, setVehicleType] = useState("Semua Jenis Armada");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("tertinggi");
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(new Set());

  const categoryOptions = useMemo(
    () => ["Semua Kategori Masalah", ...Array.from(new Set(baseItems.map((i) => i.category)))],
    [baseItems]
  );
  const vehicleTypeOptions = useMemo(
    () => ["Semua Jenis Armada", ...Array.from(new Set(baseItems.map((i) => i.vehicleType)))],
    [baseItems]
  );

  const counts = useMemo(
    () => ({
      semua: baseItems.length,
      bahaya: baseItems.filter((i) => i.severity === "bahaya").length,
      waspada: baseItems.filter((i) => i.severity === "waspada").length,
    }),
    [baseItems]
  );

  const kpiCounts = useMemo(() => {
    const avg = baseItems.length > 0 ? Math.round(baseItems.reduce((sum, i) => sum + i.riskScore, 0) / baseItems.length) : 0;
    return { totalActive: baseItems.length, avgScore: avg, bahaya: counts.bahaya, waspada: counts.waspada };
  }, [baseItems, counts]);

  const filteredItems = useMemo(() => {
    if (zeroMode) return [];
    const q = search.trim().toLowerCase();
    const filtered = baseItems.filter((item) => {
      if (severityFilter !== "semua" && item.severity !== severityFilter) return false;
      if (category !== "Semua Kategori Masalah" && item.category !== category) return false;
      if (vehicleType !== "Semua Jenis Armada" && item.vehicleType !== vehicleType) return false;
      if (q) {
        const haystack = `${item.vehicleCode} ${item.plate} ${item.metaParts.join(" ")} ${item.descLine1
          .map((s) => s.text)
          .join(" ")} ${item.descLine2}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    return [...filtered].sort((a, b) => (sortOrder === "tertinggi" ? b.riskScore - a.riskScore : a.riskScore - b.riskScore));
  }, [baseItems, zeroMode, severityFilter, category, vehicleType, search, sortOrder]);

  function toggleAcknowledge(id: string) {
    setAcknowledgedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  async function handleSimulate() {
    setSimulating(true);
    try {
      const { data: candidates } = await supabaseBrowser
        .from("vehicles")
        .select("id,status")
        .not("unit_code", "is", null);
      const target = candidates?.find((v) => v.status === "aman") ?? candidates?.[0];
      if (!target) return;
      await fetch("/api/simulator/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_ids: [target.id], scenario: "bahaya" }),
      });
      // Kartu baru masuk otomatis lewat realtime subscription di useAnomaliData.
    } finally {
      setSimulating(false);
    }
  }

  function handleExportCsv() {
    const header = ["Unit", "Model", "Plat", "Tingkat", "Skor Risiko K3", "Temuan", "Lokasi & Waktu"];
    const rows = filteredItems.map((item) => [
      item.vehicleCode,
      item.vehicleModel,
      item.plate,
      item.severity.toUpperCase(),
      String(item.riskScore),
      item.tagLabel,
      item.location,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rekap-ba-k3-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <TelemetryTicker />
        <main className="flex flex-1 flex-col">
          <OperationalHeaderArea
            simulating={simulating}
            onSimulate={handleSimulate}
            zeroMode={zeroMode}
            onToggleZeroMode={() => setZeroMode((v) => !v)}
            onExport={handleExportCsv}
          />
          <MetricKpiStrip counts={kpiCounts} />
          <FilterToolbar
            severityFilter={severityFilter}
            onSeverityFilter={setSeverityFilter}
            counts={counts}
            category={category}
            onCategory={setCategory}
            categoryOptions={categoryOptions}
            vehicleType={vehicleType}
            onVehicleType={setVehicleType}
            vehicleTypeOptions={vehicleTypeOptions}
            search={search}
            onSearch={setSearch}
            sortOrder={sortOrder}
            onToggleSort={() => setSortOrder((v) => (v === "tertinggi" ? "terendah" : "tertinggi"))}
            visibleCount={filteredItems.length}
            totalCount={baseItems.length}
          />

          <div className="flex flex-1 flex-col gap-3 bg-[#f7f9fb] px-6 pb-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded bg-white p-12 text-center shadow-sm">
                <p className="text-sm text-[#45464d]">Memuat data telemetri dari Supabase...</p>
              </div>
            ) : zeroMode ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded bg-white p-12 text-center shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#ecfdf5] text-2xl">✓</span>
                <p className="text-lg font-bold text-[#191c1e]">Armada Aman — 0 Potensi Risiko Terdeteksi</p>
                <p className="max-w-md text-sm text-[#45464d]">
                  Simulasi ini menunjukkan tampilan stream saat seluruh unit lolos ambang batas keselamatan K3.
                </p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded bg-white p-12 text-center shadow-sm">
                <p className="text-lg font-bold text-[#191c1e]">Tidak Ada Kasus Yang Cocok</p>
                <p className="max-w-md text-sm text-[#45464d]">
                  {baseItems.length === 0
                    ? "Belum ada unit berstatus waspada/bahaya di database saat ini."
                    : "Ubah kata kunci pencarian atau filter untuk melihat kasus lainnya."}
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <AnomalyCard
                  key={item.id}
                  item={item}
                  acknowledged={acknowledgedIds.has(item.id)}
                  onAcknowledge={() => toggleAcknowledge(item.id)}
                />
              ))
            )}
          </div>
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6e8ea] bg-[#f2f4f6] px-6 py-4 text-xs text-[#45464d]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 PT Sucofindo (Persero) - IDSurvey Holding. All rights reserved.</span>
            <span className="text-[#c6c6cd]">•</span>
            <span>Sistem Informasi Manajemen Keselamatan Operasional &amp; K3</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <img src="/anomali/lock.svg" alt="" className="h-[13px] w-[10px]" />
              <span className="text-[11px] font-bold tracking-wide text-[#545f73]">256-Bit SSL Encrypted Session</span>
            </div>
            <span className="text-[#c6c6cd]">|</span>
            <span className="text-[11px] font-bold tracking-wide text-[#45464d]">Secured Audit Level-4</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
