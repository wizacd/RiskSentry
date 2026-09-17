"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { P2HRecord, TelemetryLog, Vehicle } from "@/types/database";

// TODO(Person 2, Figma): tambahkan gauge skor + chart time-series (Chart.js/Recharts)
// untuk telemetryLogs, dan timeline untuk p2hRecords.
export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([]);
  const [p2hRecords, setP2hRecords] = useState<P2HRecord[]>([]);

  useEffect(() => {
    supabaseBrowser.from("vehicles").select("*").eq("id", params.id).single().then(({ data }) => setVehicle(data));
    supabaseBrowser
      .from("telemetry_logs")
      .select("*")
      .eq("vehicle_id", params.id)
      .order("recorded_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setTelemetryLogs(data ?? []));
    supabaseBrowser
      .from("p2h_records")
      .select("*")
      .eq("vehicle_id", params.id)
      .order("submitted_at", { ascending: false })
      .then(({ data }) => setP2hRecords(data ?? []));
  }, [params.id]);

  if (!vehicle) return <main className="p-6">Memuat...</main>;

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-xl font-semibold">Detail Kendaraan — {vehicle.plate_number}</h1>
      <section>
        <h2 className="mb-2 font-medium">Log Telemetri Terbaru</h2>
        <ul className="space-y-1 text-sm">
          {telemetryLogs.map((log) => (
            <li key={log.id}>
              {new Date(log.recorded_at).toLocaleString("id-ID")} — {log.speed_kmh} km/h, status {log.status}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 font-medium">Riwayat P2H</h2>
        <ul className="space-y-1 text-sm">
          {p2hRecords.map((r) => (
            <li key={r.id}>
              {new Date(r.submitted_at).toLocaleString("id-ID")} — {r.final_status}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
