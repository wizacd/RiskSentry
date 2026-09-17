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
import { useCompliancePassport } from "@/components/compliance/useCompliancePassport";

export default function CompliancePassportPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data, loading, notFound } = useCompliancePassport(params.id);

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
          {loading ? (
            <div className="rounded-lg bg-white p-10 text-center text-sm text-[#45464d] shadow-sm">
              Memuat compliance passport dari Supabase...
            </div>
          ) : notFound || !data ? (
            <div className="rounded-lg bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-bold text-[#191c1e]">Unit &quot;{params.id}&quot; Tidak Ditemukan</p>
              <p className="mt-1 text-sm text-[#45464d]">Cek kembali kode unit — unit ini belum terdaftar di database.</p>
            </div>
          ) : (
            <>
              <DocumentHeaderActionBar onCompare={scrollToTimeline} />
              <CredentialBanner vehicle={data.vehicle} healthIndex={data.healthIndex} p2hRecords={data.p2hRecords} />

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                <UnitIdentityCard vehicle={data.vehicle} />
                <HealthIndexCard healthIndex={data.healthIndex} />
              </div>

              <ComplianceTimeline
                p2hRecords={data.p2hRecords}
                notifications={data.notifications}
                driverName={data.driver?.full_name ?? null}
              />
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
