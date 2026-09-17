"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import Sidebar from "@/components/dashboard/Sidebar";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import TopActionBanner from "@/components/laporan/TopActionBanner";
import DocumentPresetBox, { type PresetItem } from "@/components/laporan/DocumentPresetBox";
import AuditorIdentityCard from "@/components/laporan/AuditorIdentityCard";
import OfficialDocumentHeader from "@/components/laporan/OfficialDocumentHeader";
import UnitIdentityMatrix from "@/components/laporan/UnitIdentityMatrix";
import HealthScoreBanner from "@/components/laporan/HealthScoreBanner";
import ComplianceMetricsTable from "@/components/laporan/ComplianceMetricsTable";
import LegalValidationBlock from "@/components/laporan/LegalValidationBlock";
import DocumentFooterFinePrint from "@/components/laporan/DocumentFooterFinePrint";
import QuickGuidanceBanner from "@/components/laporan/QuickGuidanceBanner";
import { useLaporanExport } from "@/components/laporan/useLaporanExport";
import { DOCUMENT_HEADER_STATIC, LEGAL_VALIDATION_STATIC } from "@/components/laporan/mockLaporanExport";

export default function ExportLaporanPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const { data, loading, notFound } = useLaporanExport(params.id);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const bapNumber = data ? `BAP-SCF-PML-${new Date().getFullYear()}-X-${data.vehicle.unit_code}` : "";
  const latestWorkOrder = data?.workOrders[0] ?? null;

  const presetItems: PresetItem[] = useMemo(() => {
    if (!data) return [];
    return [
      { id: "bap", title: "BAP Fisik & Kelaikan Statis", description: "Dokumen berita acara ini sendiri.", available: true },
      {
        id: "telemetri",
        title: "Log Telemetri IoT & CAN-Bus",
        description: `${data.telemetryLogs.length} pembacaan sensor tercatat.`,
        available: data.telemetryLogs.length > 0,
      },
      {
        id: "wo",
        title: "Salinan Work Order Rekomendasi",
        description: latestWorkOrder ? `WO terbaru: ${latestWorkOrder.problem_component}` : "Belum ada Work Order tercatat.",
        available: data.workOrders.length > 0,
      },
      {
        id: "sertifikasi",
        title: "Sertifikasi Asesor BNSP & SK Dirjen",
        description: "Legalitas tanda tangan digital asesor penguji.",
        available: true,
      },
    ];
  }, [data, latestWorkOrder]);

  function toggleItem(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  }

  async function handleDownload() {
    if (!data) return;
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 300));

    const { vehicle, healthIndex } = data;
    const doc = new jsPDF();
    let y = 18;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(DOCUMENT_HEADER_STATIC.title, 14, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(DOCUMENT_HEADER_STATIC.subtitle, 14, y);
    y += 6;
    doc.text(`${DOCUMENT_HEADER_STATIC.formCode} • ${bapNumber} • ${new Date().toLocaleDateString("id-ID")}`, 14, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("I. Identitas Kendaraan & Pemegang Izin (IUP)", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    [
      `Unit: ${vehicle.unit_code}  •  Registrasi: ${vehicle.plate_number}`,
      `Model: ${vehicle.unit_type ?? "-"}  •  Kategori: ${vehicle.category === "alat_berat" ? "Alat Berat" : "Kendaraan Darat"}`,
      `Pemegang IUP: ${vehicle.client_name}`,
    ].forEach((line) => {
      doc.text(line, 14, y);
      y += 6;
    });
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Overall Health Index", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Skor: ${healthIndex.score}/100 — ${healthIndex.fastTrackEligible ? "Layak Fast-Track" : "Belum Layak Fast-Track"}`, 14, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("II. Hasil Audit Teknis & Pengujian Komponen Kritis", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Kepatuhan P2H: ${Math.round(healthIndex.p2hComplianceRate * 100)}%`, 14, y);
    y += 5.5;
    doc.text(`Skor Telemetri: ${Math.round(healthIndex.telemetryScore)}/100 (${healthIndex.criticalAnomalyCount} kritis, ${healthIndex.warningAnomalyCount} waspada)`, 14, y);
    y += 5.5;
    doc.text(`Work Order Terakhir: ${latestWorkOrder ? latestWorkOrder.problem_component : "Tidak ada"}`, 14, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("III. Pengesahan Elektronik & Jaminan Hukum", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Asesor: ${LEGAL_VALIDATION_STATIC.assessorName} — ${LEGAL_VALIDATION_STATIC.assessorRole.join(" ")}`, 14, y);
    y += 10;

    const includedItems = presetItems.filter((item) => item.available && (selected[item.id] ?? true));
    if (includedItems.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Lampiran Yang Disertakan", 14, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      includedItems.forEach((item) => {
        doc.text(`• ${item.title}`, 14, y);
        y += 5.5;
      });
    }

    doc.save(`BAP-${vehicle.unit_code}-${bapNumber}.pdf`);
    setDownloading(false);
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 px-6 py-4">
          <TelemetryTicker />
          {loading ? (
            <div className="rounded-sm bg-white p-10 text-center text-sm text-[#45464d] shadow-sm">
              Memuat data laporan dari Supabase...
            </div>
          ) : notFound || !data ? (
            <div className="rounded-sm bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-bold text-[#191c1e]">Unit &quot;{params.id}&quot; Tidak Ditemukan</p>
              <p className="mt-1 text-sm text-[#45464d]">Cek kembali kode unit — unit ini belum terdaftar di database.</p>
            </div>
          ) : (
            <>
              <TopActionBanner onDownload={handleDownload} downloading={downloading} />

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                <div className="flex flex-col gap-3 rounded-sm bg-white p-6 shadow-sm lg:col-span-8">
                  <OfficialDocumentHeader bapNumber={bapNumber} />
                  <UnitIdentityMatrix vehicle={data.vehicle} />
                  <HealthScoreBanner healthIndex={data.healthIndex} />
                  <ComplianceMetricsTable healthIndex={data.healthIndex} latestWorkOrder={latestWorkOrder} />
                  <LegalValidationBlock vehicle={data.vehicle} />
                  <DocumentFooterFinePrint />
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4">
                  <DocumentPresetBox items={presetItems} selected={selected} onToggle={toggleItem} />
                  <AuditorIdentityCard />
                </div>
              </div>

              <QuickGuidanceBanner />
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
              <img src="/laporan/lock.svg" alt="" className="h-[13px] w-[10px]" />
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
