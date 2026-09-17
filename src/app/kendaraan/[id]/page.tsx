"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import GroundedAlertStrip from "@/components/kendaraan-detail/GroundedAlertStrip";
import IdentityCard from "@/components/kendaraan-detail/IdentityCard";
import OperatorCard from "@/components/kendaraan-detail/OperatorCard";
import RiskGaugeCard from "@/components/kendaraan-detail/RiskGaugeCard";
import TelemetryPanel from "@/components/kendaraan-detail/TelemetryPanel";
import InspectionHistory from "@/components/kendaraan-detail/InspectionHistory";
import AnomalyLog from "@/components/kendaraan-detail/AnomalyLog";
import { useVehicleDetail } from "@/components/kendaraan-detail/useVehicleDetail";
import { explainTelemetryLog } from "@/lib/scoring/scoringEngine";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState("");
  const { data, loading, notFound } = useVehicleDetail(params.id);

  function handleFlagClick(logId: string) {
    setExpandedLogId(logId);
    document.getElementById(`anomaly-${logId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 px-6 py-4">
          {loading ? (
            <div className="rounded-lg bg-white p-10 text-center text-sm text-[#45464d] shadow-sm">
              Memuat data kendaraan dari Supabase...
            </div>
          ) : notFound || !data ? (
            <div className="rounded-lg bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-bold text-[#191c1e]">Unit &quot;{params.id}&quot; Tidak Ditemukan</p>
              <p className="mt-1 text-sm text-[#45464d]">Cek kembali kode unit — unit ini belum terdaftar di database.</p>
            </div>
          ) : (
            <>
              <GroundedAlertStrip vehicle={data.vehicle} />

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                <IdentityCard vehicle={data.vehicle} />
                <OperatorCard driver={data.driver} />
                <RiskGaugeCard
                  score={data.vehicle.risk_score}
                  status={data.vehicle.status}
                  contributors={data.latestTelemetry ? explainTelemetryLog(data.latestTelemetry) : []}
                />
              </div>

              <TelemetryPanel
                onFlagClick={handleFlagClick}
                unitCode={data.vehicle.unit_code ?? params.id}
                categoryLabel={data.vehicle.category === "alat_berat" ? "Alat Berat" : "Kendaraan Darat"}
              />

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <InspectionHistory records={data.p2hRecords} />
                <AnomalyLog
                  notifications={data.notifications}
                  expandedId={expandedLogId}
                  onToggle={(id) => setExpandedLogId((prev) => (prev === id ? "" : id))}
                />
              </div>
            </>
          )}
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6e8ea] bg-[#f2f4f6] px-6 py-4 text-xs text-[#45464d]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 PT Sucofindo (Persero) - IDSurvey Holding. All rights reserved.</span>
            <span className="text-[#c6c6cd]">•</span>
            <span>Sistem Informasi Manajemen Keselamatan Operasional &amp; K3</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <img src="/kendaraan/lock.svg" alt="" className="h-[13px] w-[10px]" />
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
