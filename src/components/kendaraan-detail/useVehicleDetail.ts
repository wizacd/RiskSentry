"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { AppNotification, Driver, P2HRecord, TelemetryLog, Vehicle } from "@/types/database";

export interface VehicleDetailData {
  vehicle: Vehicle;
  driver: Driver | null;
  latestTelemetry: TelemetryLog | null;
  p2hRecords: P2HRecord[];
  notifications: AppNotification[];
}

export function useVehicleDetail(unitCode: string) {
  const [data, setData] = useState<VehicleDetailData | null>(null);
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

    const [{ data: driver }, { data: telemetry }, { data: p2h }, { data: notifs }] = await Promise.all([
      supabaseBrowser.from("drivers").select("*").eq("vehicle_id", vehicle.id).maybeSingle(),
      supabaseBrowser.from("telemetry_logs").select("*").eq("vehicle_id", vehicle.id).order("recorded_at", { ascending: false }).limit(1),
      supabaseBrowser.from("p2h_records").select("*").eq("vehicle_id", vehicle.id).order("submitted_at", { ascending: false }).limit(10),
      supabaseBrowser.from("notifications").select("*").eq("vehicle_id", vehicle.id).order("created_at", { ascending: false }).limit(10),
    ]);

    setData({
      vehicle,
      driver: driver ?? null,
      latestTelemetry: telemetry?.[0] ?? null,
      p2hRecords: p2h ?? [],
      notifications: notifs ?? [],
    });
    setNotFound(false);
    setLoading(false);
  }

  useEffect(() => {
    load();

    const channel = supabaseBrowser
      .channel(`vehicle-detail-${unitCode}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "telemetry_logs" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "p2h_records" }, () => load())
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitCode]);

  return { data, loading, notFound };
}
