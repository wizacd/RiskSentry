"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { computeHealthIndex, type HealthIndexResult } from "@/lib/health/healthIndex";
import type { Driver, P2HRecord, TelemetryLog, Vehicle, WorkOrder } from "@/types/database";

export interface LaporanExportData {
  vehicle: Vehicle;
  driver: Driver | null;
  p2hRecords: P2HRecord[];
  telemetryLogs: TelemetryLog[];
  workOrders: WorkOrder[];
  healthIndex: HealthIndexResult;
}

export function useLaporanExport(unitCode: string) {
  const [data, setData] = useState<LaporanExportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  async function load() {
    const { data: vehicle } = await supabaseBrowser
      .from("vehicles")
      .select("*")
      .eq("unit_code", unitCode.toUpperCase())
      .maybeSingle();

    if (!vehicle) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const [{ data: driver }, { data: telemetry }, { data: p2h }, { data: wo }] = await Promise.all([
      supabaseBrowser.from("drivers").select("*").eq("vehicle_id", vehicle.id).maybeSingle(),
      supabaseBrowser.from("telemetry_logs").select("*").eq("vehicle_id", vehicle.id).order("recorded_at", { ascending: false }),
      supabaseBrowser.from("p2h_records").select("*").eq("vehicle_id", vehicle.id).order("submitted_at", { ascending: false }),
      supabaseBrowser.from("work_orders").select("*").eq("vehicle_id", vehicle.id).order("created_at", { ascending: false }),
    ]);

    setData({
      vehicle,
      driver: driver ?? null,
      p2hRecords: p2h ?? [],
      telemetryLogs: telemetry ?? [],
      workOrders: wo ?? [],
      healthIndex: computeHealthIndex(p2h ?? [], telemetry ?? []),
    });
    setNotFound(false);
    setLoading(false);
  }

  useEffect(() => {
    load();

    const channel = supabaseBrowser
      .channel(`laporan-export-${unitCode}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "telemetry_logs" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "p2h_records" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "work_orders" }, () => load())
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitCode]);

  return { data, loading, notFound };
}
