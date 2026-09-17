// Kontrak data bersama — mirror dari supabase/migrations/0001_init.sql.
// Person 1 & 2: import tipe dari sini, JANGAN duplikat definisi di komponen.
// Kalau skema berubah, update file ini + migration di PR yang sama.

export type FleetType = "logistik" | "bus_penumpang";
export type RiskStatus = "aman" | "waspada" | "bahaya";
export type P2HStatus = "hijau" | "kuning" | "merah";
export type WorkOrderStatus = "terbuka" | "diproses" | "selesai";
export type Weather = "cerah" | "hujan" | "kabut";

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
}

export interface Driver {
  id: string;
  full_name: string;
  sim_number: string;
  sim_expiry: string;
  vehicle_id: string | null;
  created_at: string;
}

export interface P2HChecklist {
  rem: boolean;
  ban: boolean;
  lampu: boolean;
  klakson: boolean;
  kelengkapan_keselamatan: boolean;
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
  submitted_at: string;
}

export interface WorkOrder {
  id: string;
  vehicle_id: string;
  p2h_record_id: string | null;
  problem_component: string;
  ticket_status: WorkOrderStatus;
  created_at: string;
}

export interface TelemetryLog {
  id: string;
  vehicle_id: string;
  speed_kmh: number;
  hard_braking_count: number;
  weather: Weather;
  continuous_driving_minutes: number;
  odol_indicator: boolean;
  likelihood: number; // 1-5, prinsip HIRARC
  severity: number; // 1-5, prinsip HIRARC
  risk_score: number;
  status: RiskStatus;
  recorded_at: string;
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
