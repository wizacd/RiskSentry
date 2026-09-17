"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import DocumentHeaderActionBar from "@/components/compliance/DocumentHeaderActionBar";
import CredentialBanner from "@/components/compliance/CredentialBanner";
import UnitIdentityCard from "@/components/compliance/UnitIdentityCard";
import HealthIndexCard from "@/components/compliance/HealthIndexCard";
import ComplianceTimeline from "@/components/compliance/ComplianceTimeline";

export default function CompliancePassportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function scrollToTimeline() {
    document.getElementById("compliance-timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 px-6 py-4">
          <TelemetryTicker />
          <DocumentHeaderActionBar onCompare={scrollToTimeline} />
          <CredentialBanner />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <UnitIdentityCard />
            <HealthIndexCard />
          </div>

          <ComplianceTimeline />
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6e8ea] bg-[#f2f4f6] px-6 py-4 text-xs text-[#45464d]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 PT Sucofindo (Persero) - IDSurvey Holding. All rights reserved.</span>
            <span className="text-[#c6c6cd]">•</span>
            <span>Sistem Informasi Manajemen Keselamatan Operasional &amp; K3</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <img src="/compliance/lock.svg" alt="" className="h-[13px] w-[10px]" />
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
