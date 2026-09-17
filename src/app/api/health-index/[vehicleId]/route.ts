import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { computeHealthIndex } from "@/lib/health/healthIndex";

/**
 * GET /api/health-index/:vehicleId — dipakai halaman /compliance-passport/:id
 * (Person 3 UI). Ambil seluruh riwayat P2H + log telemetri kendaraan, lalu
 * hitung Health Index Score (bagian 3.4 & 7 dokumen).
 */
export async function GET(_req: NextRequest, { params }: { params: { vehicleId: string } }) {
  const supabase = supabaseServer();
  const { vehicleId } = params;

  const [{ data: p2hRecords, error: p2hError }, { data: telemetryLogs, error: telemetryError }] =
    await Promise.all([
      supabase.from("p2h_records").select("*").eq("vehicle_id", vehicleId),
      supabase.from("telemetry_logs").select("*").eq("vehicle_id", vehicleId),
    ]);

  if (p2hError || telemetryError) {
    return NextResponse.json(
      { error: p2hError?.message ?? telemetryError?.message },
      { status: 500 },
    );
  }

  const result = computeHealthIndex(p2hRecords ?? [], telemetryLogs ?? []);
  return NextResponse.json(result);
}
