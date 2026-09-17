import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { generateTelemetryRow } from "@/lib/simulator/dataGenerator";
import { recommendedAction } from "@/lib/scoring/scoringEngine";
import type { SimulatorScenario } from "@/types/database";

interface TriggerBody {
  vehicle_ids: string[];
  scenario: SimulatorScenario;
}

/**
 * POST /api/simulator/trigger — dipakai halaman /demo-simulator (Person 3 UI,
 * lihat bagian 3.5). Menulis satu baris telemetri baru per kendaraan pilihan;
 * Dashboard (Person 2) menangkap perubahan lewat Supabase realtime subscription
 * pada tabel `vehicles` dan `telemetry_logs`, tanpa perlu polling.
 */
export async function POST(req: NextRequest) {
  const { vehicle_ids, scenario } = (await req.json()) as TriggerBody;
  const supabase = supabaseServer();

  const { data: vehicles, error: vehiclesError } = await supabase
    .from("vehicles")
    .select("id, fleet_type, category")
    .in("id", vehicle_ids);

  if (vehiclesError || !vehicles) {
    return NextResponse.json({ error: vehiclesError?.message ?? "vehicles not found" }, { status: 500 });
  }

  const rows = vehicles.map((v) => generateTelemetryRow(v.id, scenario, v.fleet_type, v.category ?? "darat"));

  const { error: insertError } = await supabase.from("telemetry_logs").insert(rows);
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  for (const row of rows) {
    await supabase.from("vehicles").update({ status: row.status, risk_score: row.risk_score }).eq("id", row.vehicle_id);

    if (row.status === "bahaya" || row.status === "waspada") {
      await supabase.from("notifications").insert({
        vehicle_id: row.vehicle_id,
        severity: row.status,
        message: `Skor risiko naik ke ${row.status.toUpperCase()} (skor ${row.risk_score}).`,
        recommended_action: recommendedAction(row.status),
      });
    }
  }

  return NextResponse.json({ inserted: rows.length, scenario });
}
