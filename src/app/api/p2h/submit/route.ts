import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import type { P2HChecklist, P2HStatus } from "@/types/database";

interface SubmitP2HBody {
  vehicle_id: string;
  driver_id: string;
  sim_expiry: string; // ISO date
  kir_expiry: string; // ISO date
  checklist: P2HChecklist;
}

function computeFinalStatus(simValid: boolean, unitValid: boolean, checklist: P2HChecklist): P2HStatus {
  if (!simValid) return "merah";
  const checklistOk = Object.values(checklist).every(Boolean);
  if (!unitValid) return "merah";
  if (!checklistOk) return "kuning";
  return "hijau";
}

/**
 * POST /api/p2h/submit — dipakai halaman /p2h (Person 1).
 * Mengimplementasikan submitP2H() dari bagian 5 dokumen: 3-pass validation,
 * lalu efek samping (Work Order otomatis / notifikasi) sesuai status akhir.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as SubmitP2HBody;
  const supabase = supabaseServer();
  const today = new Date();

  const simValid = new Date(body.sim_expiry) >= today;
  const unitValid = new Date(body.kir_expiry) >= today;
  const finalStatus = computeFinalStatus(simValid, unitValid, body.checklist);

  const { data: record, error } = await supabase
    .from("p2h_records")
    .insert({
      vehicle_id: body.vehicle_id,
      driver_id: body.driver_id,
      sim_valid: simValid,
      unit_valid: unitValid,
      checklist: body.checklist,
      final_status: finalStatus,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (finalStatus === "kuning") {
    const problemComponent = Object.entries(body.checklist)
      .filter(([, ok]) => !ok)
      .map(([key]) => key)
      .join(", ");

    await supabase.from("work_orders").insert({
      vehicle_id: body.vehicle_id,
      p2h_record_id: record.id,
      problem_component: problemComponent || "tidak diketahui",
    });
  }

  if (finalStatus === "merah") {
    await supabase.from("notifications").insert({
      vehicle_id: body.vehicle_id,
      severity: "bahaya",
      message: !simValid ? "SIM driver sudah kedaluwarsa." : "Unit tidak lolos validasi KIR/STNK.",
      recommended_action: "Blokir keberangkatan, hubungi supervisor.",
    });

    await supabase.from("vehicles").update({ status: "bahaya" }).eq("id", body.vehicle_id);
  }

  return NextResponse.json({ record, final_status: finalStatus });
}
