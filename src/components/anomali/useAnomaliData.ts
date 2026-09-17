"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Driver, TelemetryLog, Vehicle } from "@/types/database";
import type { AnomalyItem, Severity } from "./anomaliTypes";

function mapToAnomalyItem(vehicle: Vehicle, driver: Driver | undefined, latestTelemetry: TelemetryLog | undefined): AnomalyItem | null {
  if (!vehicle.unit_code || !vehicle.category || !vehicle.unit_type) return null;
  if (vehicle.status !== "bahaya" && vehicle.status !== "waspada") return null;
  const severity = vehicle.status as Severity;
  const isBahaya = severity === "bahaya";

  const recordedAt = latestTelemetry ? new Date(latestTelemetry.recorded_at) : null;
  const timeLabel = recordedAt
    ? `${recordedAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} WIB`
    : "Waktu tidak tercatat";

  return {
    id: vehicle.unit_code,
    severity,
    tagLabel: isBahaya
      ? `BAHAYA: ${vehicle.legalitas_title ?? "TEMUAN LEGALITAS"}`
      : `WASPADA: ${vehicle.checklist_title ?? "TEMUAN CHECKLIST"}`,
    tagIcon: isBahaya ? "/anomali/tag-engine.svg" : "/anomali/tag-wrench.svg",
    sourceTag: vehicle.category === "alat_berat" ? "INSPEKSI K3 MINERBA" : "INSPEKSI K3 DARAT",
    location: `${vehicle.client_name} • ${timeLabel}`,
    vehicleCode: vehicle.unit_code,
    vehicleModel: `${vehicle.unit_type} • ${vehicle.sub_code ?? vehicle.plate_number}`,
    plate: vehicle.plate_number,
    contextLabel: "Klien",
    contextValue: vehicle.client_name,
    problemIcon: isBahaya ? "/anomali/problem-thermo.svg" : "/anomali/problem-wrench.svg",
    descLine1: [{ text: vehicle.checklist_title ?? "Belum ada data checklist.", bold: true }],
    descLine2: vehicle.checklist_note ?? "",
    metaParts: [
      `Driver: ${driver?.full_name ?? "Belum ditugaskan"}`,
      vehicle.legalitas_title ?? "Legalitas belum diverifikasi",
    ],
    metaHighlightIndex: isBahaya ? 1 : undefined,
    riskScore: vehicle.risk_score,
    primaryActionLabel: isBahaya ? "Terbitkan BA-K3 Sanksi" : "Terbitkan WO Bengkel",
    primaryActionDoneLabel: isBahaya ? "BA-K3 Sanksi Diterbitkan" : "WO Bengkel Diterbitkan",
    primaryActionIcon: isBahaya ? "/anomali/action-sanction.svg" : "/anomali/action-wo.svg",
    secondaryActionLabel: "Detail Riwayat Kasus",
    category: vehicle.category === "alat_berat" ? "Alat Berat & Tambang" : "Transportasi Darat",
    vehicleType: vehicle.unit_type,
    hasDetailPage: true,
  };
}

export function useAnomaliData() {
  const [items, setItems] = useState<AnomalyItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    const { data: vehicles } = await supabaseBrowser
      .from("vehicles")
      .select("*")
      .not("unit_code", "is", null)
      .order("risk_score", { ascending: false });

    if (!vehicles || vehicles.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    const vehicleIds = vehicles.map((v) => v.id);
    const [{ data: drivers }, { data: telemetry }] = await Promise.all([
      supabaseBrowser.from("drivers").select("*").in("vehicle_id", vehicleIds),
      supabaseBrowser.from("telemetry_logs").select("*").in("vehicle_id", vehicleIds).order("recorded_at", { ascending: false }),
    ]);

    const driverByVehicle = new Map((drivers ?? []).map((d) => [d.vehicle_id, d]));
    const latestTelemetryByVehicle = new Map<string, TelemetryLog>();
    for (const log of telemetry ?? []) {
      if (!latestTelemetryByVehicle.has(log.vehicle_id)) latestTelemetryByVehicle.set(log.vehicle_id, log);
    }

    const mapped = vehicles
      .map((v) => mapToAnomalyItem(v, driverByVehicle.get(v.id), latestTelemetryByVehicle.get(v.id)))
      .filter((item): item is AnomalyItem => item !== null);

    setItems(mapped);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();

    const channel = supabaseBrowser
      .channel("anomali-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, () => loadAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "telemetry_logs" }, () => loadAll())
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, loading };
}
