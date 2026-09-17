"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Driver, TelemetryLog, Vehicle } from "@/types/database";
import type { FleetRow, FleetTone } from "./fleetTypes";

const SCORE_LABEL: Record<FleetTone, string> = {
  bahaya: "Kritis",
  waspada: "Sedang",
  aman: "Sangat Aman",
};

function statusLabel(tone: FleetTone, category: "alat_berat" | "darat"): string {
  if (tone === "bahaya") return category === "alat_berat" ? "Dilarang Operasi (Pit)" : "Dilarang Jalan (BAP)";
  if (tone === "waspada") return "Waspada Tiket 24J";
  return category === "alat_berat" ? "Layak Operasi Resmi" : "Layak Jalan Resmi";
}

function actionsFor(tone: FleetTone, category: "alat_berat" | "darat"): FleetRow["actions"] {
  const detail: FleetRow["actions"][number] = { label: "Detail", tone: "neutral" };
  if (tone === "bahaya") return [detail, { label: category === "alat_berat" ? "BAP K3" : "BAP Dishub", tone: "bahaya" }];
  if (tone === "waspada") return [detail, { label: "Tiket WO", tone: "waspada" }];
  return [detail, { label: "Clear", tone: "neutral" }];
}

function legalitasIcon(tone: FleetTone) {
  return tone === "bahaya" ? "/dashboard/alert-red.svg" : "/dashboard/check-green.svg";
}

function checklistIcon(tone: FleetTone) {
  if (tone === "bahaya") return "/dashboard/wrench-red.svg";
  if (tone === "waspada") return "/dashboard/wrench-amber.svg";
  return "/dashboard/shield-check-green.svg";
}

function formatMonthYearID(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { month: "short", year: "numeric" }).toUpperCase();
}

function operatorLicense(category: "alat_berat" | "darat", simExpiry: string | null): { license: string; note?: string } {
  const base = category === "alat_berat" ? "SIMPER ESDM Kelas 1" : "SIM BII Umum";
  if (!simExpiry) return { license: `${base} • Belum Terdaftar` };
  const expired = new Date(simExpiry) < new Date();
  if (expired) {
    return {
      license: `${base}: Expired`,
      note: category === "alat_berat" ? "LISENSI OPERATOR TIDAK VALID" : "LISENSI TIDAK BERLAKU",
    };
  }
  return {
    license: `${base} • Valid ${category === "alat_berat" ? "Minerba ESDM" : "Dishub"}`,
    note: `EXP: ${formatMonthYearID(simExpiry)}`,
  };
}

function mapToFleetRow(vehicle: Vehicle, driver: Driver | undefined, telemetry: TelemetryLog[]): FleetRow | null {
  if (!vehicle.unit_code || !vehicle.category || !vehicle.unit_type) return null;
  const tone = vehicle.status as FleetTone;
  const category = vehicle.category;

  const trend = telemetry.length > 0 ? telemetry.map((t) => 100 - t.risk_score) : [100 - vehicle.risk_score];
  const { license, note } = operatorLicense(category, driver?.sim_expiry ?? null);

  return {
    id: vehicle.id,
    tone,
    category,
    categoryEmoji: category === "alat_berat" ? "🚜" : "🚛",
    unitType: vehicle.unit_type,
    unitCode: vehicle.unit_code,
    subCode: vehicle.sub_code ?? vehicle.plate_number,
    client: vehicle.client_name,
    operator: {
      name: driver?.full_name ?? "Belum Ditugaskan",
      license,
      note,
    },
    legalitas: {
      icon: legalitasIcon(tone),
      title: vehicle.legalitas_title ?? "Belum Ada Data Legalitas",
      lines: vehicle.legalitas_lines ?? [],
    },
    checklist: {
      icon: checklistIcon(tone),
      title: vehicle.checklist_title ?? "Belum Ada Data Checklist",
      note: vehicle.checklist_note ?? "",
    },
    trend,
    score: { value: 100 - vehicle.risk_score, label: SCORE_LABEL[tone] },
    status: { label: statusLabel(tone, category) },
    actions: actionsFor(tone, category),
  };
}

export function useFleetData() {
  const [rows, setRows] = useState<FleetRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    const { data: vehicles } = await supabaseBrowser
      .from("vehicles")
      .select("*")
      .not("unit_code", "is", null)
      .order("risk_score", { ascending: false });

    if (!vehicles || vehicles.length === 0) {
      setRows([]);
      setLoading(false);
      return;
    }

    const vehicleIds = vehicles.map((v) => v.id);
    const [{ data: drivers }, { data: telemetry }] = await Promise.all([
      supabaseBrowser.from("drivers").select("*").in("vehicle_id", vehicleIds),
      supabaseBrowser.from("telemetry_logs").select("*").in("vehicle_id", vehicleIds).order("recorded_at", { ascending: true }),
    ]);

    const driverByVehicle = new Map((drivers ?? []).map((d) => [d.vehicle_id, d]));
    const telemetryByVehicle = new Map<string, TelemetryLog[]>();
    for (const log of telemetry ?? []) {
      const list = telemetryByVehicle.get(log.vehicle_id) ?? [];
      list.push(log);
      telemetryByVehicle.set(log.vehicle_id, list);
    }

    const mapped = vehicles
      .map((v) => mapToFleetRow(v, driverByVehicle.get(v.id) ?? undefined, telemetryByVehicle.get(v.id) ?? []))
      .filter((row): row is FleetRow => row !== null);

    setRows(mapped);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();

    const channel = supabaseBrowser
      .channel("dashboard-vehicles-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, () => loadAll())
      .on("postgres_changes", { event: "*", schema: "public", table: "telemetry_logs" }, () => loadAll())
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rows, loading };
}
