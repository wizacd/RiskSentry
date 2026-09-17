"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import Sidebar from "@/components/dashboard/Sidebar";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import TopActionBanner from "@/components/laporan/TopActionBanner";
import DocumentPresetBox from "@/components/laporan/DocumentPresetBox";
import AuditorIdentityCard from "@/components/laporan/AuditorIdentityCard";
import OfficialDocumentHeader from "@/components/laporan/OfficialDocumentHeader";
import UnitIdentityMatrix from "@/components/laporan/UnitIdentityMatrix";
import HealthScoreBanner from "@/components/laporan/HealthScoreBanner";
import ComplianceMetricsTable from "@/components/laporan/ComplianceMetricsTable";
import LegalValidationBlock from "@/components/laporan/LegalValidationBlock";
import DocumentFooterFinePrint from "@/components/laporan/DocumentFooterFinePrint";
import QuickGuidanceBanner from "@/components/laporan/QuickGuidanceBanner";
import {
  DOCUMENT_HEADER,
  HEALTH_SCORE,
  LEGAL_VALIDATION,
  METRICS,
  PRESET_ITEMS,
  UNIT_IDENTITY,
} from "@/components/laporan/mockLaporanExport";

export default function ExportLaporanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(PRESET_ITEMS.map((item) => [item.id, true]))
  );

  function toggleItem(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleDownload() {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 300));

    const doc = new jsPDF();
    let y = 18;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(DOCUMENT_HEADER.title, 14, y);
    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(DOCUMENT_HEADER.subtitle, 14, y);
    y += 6;
    doc.text(`${DOCUMENT_HEADER.formCode} • ${DOCUMENT_HEADER.bapNumber.join("")} • ${DOCUMENT_HEADER.issuedDate}`, 14, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("I. Identitas Kendaraan & Pemegang Izin (IUP)", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    [
      `Unit: ${UNIT_IDENTITY.unitCode}  •  Registrasi: ${UNIT_IDENTITY.registration}`,
      `Model: ${UNIT_IDENTITY.model}  •  Kapasitas: ${UNIT_IDENTITY.capacity}`,
      `Pemegang IUP: ${UNIT_IDENTITY.iupHolder}`,
      `Odometer / Jam Kerja: ${UNIT_IDENTITY.odoHm}`,
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
    doc.text(`Skor: ${HEALTH_SCORE.score}/${HEALTH_SCORE.max} — ${HEALTH_SCORE.grade}`, 14, y);
    y += 6;
    doc.text(`Rekomendasi: ${HEALTH_SCORE.recommendation.join(" ")}`, 14, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("II. Hasil Audit Teknis & Pengujian Komponen Kritis", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    METRICS.forEach((row) => {
      doc.text(`${row.parameter.join(" ")}: ${row.measured.join(" ")} — ${row.statusLabel.join(" ")}`, 14, y);
      y += 5.5;
    });
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("III. Pengesahan Elektronik & Jaminan Hukum", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Asesor: ${LEGAL_VALIDATION.assessorName} — ${LEGAL_VALIDATION.assessorRole.join(" ")}`, 14, y);
    y += 5.5;
    doc.text(`SHA-256: ${LEGAL_VALIDATION.sha256}`, 14, y);
    y += 5.5;
    doc.text(LEGAL_VALIDATION.validity.join(" "), 14, y);
    y += 10;

    const includedItems = PRESET_ITEMS.filter((item) => selected[item.id]);
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

    doc.save(`BAP-${UNIT_IDENTITY.unitCode}-${DOCUMENT_HEADER.bapNumber.join("")}.pdf`);
    setDownloading(false);
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 px-6 py-4">
          <TelemetryTicker />
          <TopActionBanner onDownload={handleDownload} downloading={downloading} />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="flex flex-col gap-3 rounded-sm bg-white p-6 shadow-sm lg:col-span-8">
              <OfficialDocumentHeader />
              <UnitIdentityMatrix />
              <HealthScoreBanner />
              <ComplianceMetricsTable />
              <LegalValidationBlock />
              <DocumentFooterFinePrint />
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <DocumentPresetBox selected={selected} onToggle={toggleItem} />
              <AuditorIdentityCard />
            </div>
          </div>

          <QuickGuidanceBanner />
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
