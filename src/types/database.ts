// Kontrak data bersama — mirror dari supabase/migrations/0001_init.sql.
// Person 1 & 2: import tipe dari sini, JANGAN duplikat definisi di komponen.
// Kalau skema berubah, update file ini + migration di PR yang sama.

export type FleetType = "bus" | "dumptruck" | "lv" | "excavator" | "tanker";
export type RiskStatus = "aman" | "waspada" | "bahaya";
export type P2HStatus = "hijau" | "kuning" | "merah";
export type WorkOrderStatus = "terbuka" | "diproses" | "selesai";
export type Weather = "cerah" | "hujan" | "kabut";

export type FleetCategory = "alat_berat" | "darat";

export interface Vehicle {
  id: string;
  plate_number: string;
  fleet_type: FleetType;
  client_name: string;
  kir_expiry: string | null;
  stnk_expiry: string | null;
  status: RiskStatus;
  risk_score: number;
  created_at: string;
  updated_at: string;
  // Kolom narasi armada (migration 0002) — nullable karena legacy rows belum diisi.
  unit_code: string | null;
  sub_code: string | null;
  category: FleetCategory | null;
  unit_type: string | null;
  legalitas_title: string | null;
  legalitas_lines: string[] | null;
  checklist_title: string | null;
  checklist_note: string | null;
}

export interface Driver {
  id: string;
  full_name: string;
  sim_number: string;
  sim_expiry: string;
  vehicle_id: string | null;
  created_at: string;
}

export type ChecklistCondition = "ok" | "minor" | "rusak";

export interface P2HChecklist {
  rem: ChecklistCondition;
  ban: ChecklistCondition;
  lampu: ChecklistCondition;
  klakson: ChecklistCondition;
}

export interface P2HRecord {
  id: string;
  vehicle_id: string;
  driver_id: string;
  sim_valid: boolean;
  unit_valid: boolean;
  checklist: P2HChecklist;
  final_status: P2HStatus;
  notes: string | null;
  surat_jalan_id: string | null;
  submitted_at: string;
}

export interface WorkOrder {
  id: string;
  vehicle_id: string;
  p2h_record_id: string | null;
  problem_component: string;
  ticket_status: WorkOrderStatus;
  deadline_hours: number | null;
  created_at: string;
}

export type VibrationLevel = "normal" | "sedang" | "tinggi";

export interface TelemetryLog {
  id: string;
  vehicle_id: string;
  speed_kmh: number;
  hard_braking_count: number;
  weather: Weather;
  continuous_driving_minutes: number;
  odol_indicator: boolean;
  likelihood: number; // 1-5, proksi dari faktor "seberapa mungkin" hasil formula weighted
  severity: number; // 1-5, proksi dari faktor "seberapa parah" hasil formula weighted
  risk_score: number;
  status: RiskStatus;
  recorded_at: string;
  // Kolom sensor alat berat (migration 0004) — null untuk kendaraan_darat.
  kemiringan_area: number | null;
  beban_angkat_persen: number | null;
  getaran_level: VibrationLevel | null;
  suhu_komponen: number | null;
  // Kolom sensor kendaraan darat — null untuk alat_berat.
  persen_muatan: number | null;
}

export interface AppNotification {
  id: string;
  vehicle_id: string;
  severity: Extract<RiskStatus, "waspada" | "bahaya">;
  message: string;
  recommended_action: string | null;
  is_read: boolean;
  created_at: string;
}

export interface ThresholdConfig {
  id: string;
  fleet_type: FleetType;
  waspada_threshold: number;
  bahaya_threshold: number;
  updated_at: string;
}

// Skenario yang dipicu dari /demo-simulator (bagian 3.5 dokumen).
export type SimulatorScenario = "normal" | "mulai_berisiko" | "bahaya";
