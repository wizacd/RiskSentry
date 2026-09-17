"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import TopActionHeader from "@/components/pengaturan/TopActionHeader";
import FleetCategoryTabs from "@/components/pengaturan/FleetCategoryTabs";
import CategoryDirectiveBanner from "@/components/pengaturan/CategoryDirectiveBanner";
import ThresholdSliders from "@/components/pengaturan/ThresholdSliders";
import TelemetryMultipliers from "@/components/pengaturan/TelemetryMultipliers";
import ImpactSimulator from "@/components/pengaturan/ImpactSimulator";
import { FLEET_CATEGORIES } from "@/components/pengaturan/mockThresholdConfig";

export default function ThresholdSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState(FLEET_CATEGORIES[0].id);
  const [thresholds, setThresholds] = useState<Record<string, { t1: number; t2: number }>>(
    Object.fromEntries(FLEET_CATEGORIES.map((c) => [c.id, { t1: c.defaults.threshold1, t2: c.defaults.threshold2 }]))
  );
  const [saved, setSaved] = useState(false);

  const category = FLEET_CATEGORIES.find((c) => c.id === activeCategoryId) ?? FLEET_CATEGORIES[0];
  const current = thresholds[activeCategoryId];

  function setT1(value: number) {
    setSaved(false);
    setThresholds((prev) => ({ ...prev, [activeCategoryId]: { ...prev[activeCategoryId], t1: Math.min(value, prev[activeCategoryId].t2 - 1) } }));
  }

  function setT2(value: number) {
    setSaved(false);
    setThresholds((prev) => ({ ...prev, [activeCategoryId]: { ...prev[activeCategoryId], t2: Math.max(value, prev[activeCategoryId].t1 + 1) } }));
  }

  function resetCategory() {
    setSaved(false);
    setThresholds((prev) => ({ ...prev, [activeCategoryId]: { t1: category.defaults.threshold1, t2: category.defaults.threshold2 } }));
  }

  function handleSave() {
    setSaved(true);
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 px-6 py-4">
          <TelemetryTicker />
          <TopActionHeader onReset={resetCategory} onSave={handleSave} saved={saved} />
          <FleetCategoryTabs activeId={activeCategoryId} onSelect={(id) => { setActiveCategoryId(id); setSaved(false); }} />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-7">
              <CategoryDirectiveBanner category={category} />
              <ThresholdSliders category={category} t1={current.t1} t2={current.t2} onT1Change={setT1} onT2Change={setT2} />
              <TelemetryMultipliers />
            </div>
            <div className="lg:col-span-5">
              <ImpactSimulator categoryId={category.id} categoryLabel={category.label} t1={current.t1} t2={current.t2} />
            </div>
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
              <img src="/pengaturan/lock.svg" alt="" className="h-[13px] w-[10px]" />
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
