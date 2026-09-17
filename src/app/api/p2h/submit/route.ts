import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { validasiP2H } from "@/lib/p2h/p2hEngine";
import type { P2HChecklist } from "@/types/database";

interface SubmitP2HBody {
  vehicle_id: string;
  driver_id: string;
  sim_expiry: string; // ISO date
  kir_expiry: string; // ISO date
  checklist: P2HChecklist;
}

/**
 * POST /api/p2h/submit — dipakai halaman /p2h.
 * Pass I -> II -> III sesuai spec data-pendukung-hackathon, lalu efek samping
 * (Work Order / notifikasi / engine cut-off) sesuai status akhir.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as SubmitP2HBody;
  const supabase = supabaseServer();
  const today = new Date();

  const simValid = new Date(body.sim_expiry) >= today;
  const unitValid = new Date(body.kir_expiry) >= today;
  const result = validasiP2H(simValid, unitValid, body.checklist);

  const { data: record, error } = await supabase
    .from("p2h_records")
    .insert({
      vehicle_id: body.vehicle_id,
      driver_id: body.driver_id,
      sim_valid: simValid,
      unit_valid: unitValid,
      checklist: body.checklist,
      final_status: result.status,
      notes: result.alasan,
      surat_jalan_id: result.suratJalanId,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (result.workOrder) {
    await supabase.from("work_orders").insert({
      vehicle_id: body.vehicle_id,
      p2h_record_id: record.id,
      problem_component: result.workOrder.komponen.join(", "),
      deadline_hours: result.workOrder.deadlineHours,
    });
  }

  if (result.status === "merah") {
    await supabase.from("notifications").insert({
      vehicle_id: body.vehicle_id,
      severity: "bahaya",
      message: `${result.alasan}. ${result.aksi}.`,
      recommended_action: "Hubungi Supervisor K3 segera — unit di-grounded sampai perbaikan/verifikasi ulang.",
    });

    await supabase.from("vehicles").update({ status: "bahaya" }).eq("id", body.vehicle_id);
  }

  return NextResponse.json({
    record,
    final_status: result.status,
    alasan: result.alasan,
    aksi: result.aksi,
    surat_jalan_id: result.suratJalanId,
  });
}
