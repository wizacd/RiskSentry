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

interface P2HResult {
  status: P2HStatus;
  alasan: string;
  aksi: string;
  suratJalanId: string | null;
  workOrder: { komponen: string[]; deadlineHours: number } | null;
}

function generateSuratJalanId() {
  return `SJ-${Math.floor(Math.random() * 900000 + 100000)}`;
}

/**
 * Validasi P2H 3-pass sesuai spec data-pendukung-hackathon:
 * Pass I (dokumen operator) -> Pass II (dokumen unit) -> Pass III (checklist fisik).
 */
function validasiP2H(simValid: boolean, unitValid: boolean, checklist: P2HChecklist): P2HResult {
  if (!simValid) {
    return { status: "merah", alasan: "Dokumen operator (SIM/SIO) kedaluwarsa", aksi: "Driver Blocked — P2H tidak dapat dilanjutkan", suratJalanId: null, workOrder: null };
  }
  if (!unitValid) {
    return { status: "merah", alasan: "Dokumen unit (KIR/SILO) kedaluwarsa", aksi: "Unit Blocked — mesin tidak dapat dinyalakan", suratJalanId: null, workOrder: null };
  }

  const komponen = Object.entries(checklist);
  const rusak = komponen.filter(([, kondisi]) => kondisi === "rusak");
  const minor = komponen.filter(([, kondisi]) => kondisi === "minor");

  if (rusak.length > 0) {
    return {
      status: "merah",
      alasan: `Komponen vital rusak: ${rusak.map(([nama]) => nama).join(", ")}`,
      aksi: "Engine Cut-off — notifikasi darurat ke Supervisor",
      suratJalanId: null,
      workOrder: null,
    };
  }

  if (minor.length > 0) {
    return {
      status: "kuning",
      alasan: `Komponen minor bermasalah: ${minor.map(([nama]) => nama).join(", ")}`,
      aksi: "Kendaraan tetap dapat beroperasi",
      suratJalanId: null,
      workOrder: { komponen: minor.map(([nama]) => nama), deadlineHours: 24 },
    };
  }

  return {
    status: "hijau",
    alasan: "Semua pemeriksaan lolos",
    aksi: "Engine Start Allowed",
    suratJalanId: generateSuratJalanId(),
    workOrder: null,
  };
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
