// Validasi P2H 3-pass sesuai spec data-pendukung-hackathon:
// Pass I (dokumen operator) -> Pass II (dokumen unit) -> Pass III (checklist
// fisik). Dipakai bareng oleh /api/p2h/submit dan scripts/seed.ts supaya
// riwayat P2H demo genuinely dihitung dari logika yang sama, bukan diketik
// manual.

import type { P2HChecklist, P2HStatus } from "@/types/database";

export interface P2HResult {
  status: P2HStatus;
  alasan: string;
  aksi: string;
  suratJalanId: string | null;
  workOrder: { komponen: string[]; deadlineHours: number } | null;
}

export function generateSuratJalanId() {
  return `SJ-${Math.floor(Math.random() * 900000 + 100000)}`;
}

export function validasiP2H(simValid: boolean, unitValid: boolean, checklist: P2HChecklist): P2HResult {
  if (!simValid) {
    return {
      status: "merah",
      alasan: "Dokumen operator (SIM/SIO) kedaluwarsa",
      aksi: "Driver Blocked — P2H tidak dapat dilanjutkan",
      suratJalanId: null,
      workOrder: null,
    };
  }
  if (!unitValid) {
    return {
      status: "merah",
      alasan: "Dokumen unit (KIR/SILO) kedaluwarsa",
      aksi: "Unit Blocked — mesin tidak dapat dinyalakan",
      suratJalanId: null,
      workOrder: null,
    };
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
