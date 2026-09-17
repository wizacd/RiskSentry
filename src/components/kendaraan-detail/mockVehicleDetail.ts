// Data demo untuk widget "Simulated Telemetry System" (lihat TelemetryPanel) —
// widget ini SENGAJA berlabel simulasi di UI-nya sendiri (badge hijau), jadi
// tetap pakai data ilustratif per-menit yang gak ditrack di skema asli
// (TPMS, hoist payload, inclinometer, dst). Identitas/status/riwayat unit
// nyatanya sekarang dari Supabase — lihat useVehicleDetail.ts.

export const TIME_RANGES = ["1 Jam", "Shift 1 (8 Jam)", "24 Jam", "7 Hari"] as const;
export type TimeRange = (typeof TIME_RANGES)[number];

export interface TelemetryPoint {
  t: string;
  speed: number;
  gbrake: number;
}

export const TELEMETRY_DATA: Record<TimeRange, TelemetryPoint[]> = {
  "1 Jam": [
    { t: "07:00", speed: 22, gbrake: 1.2 },
    { t: "07:10", speed: 35, gbrake: 1.8 },
    { t: "07:20", speed: 41, gbrake: 3.1 },
    { t: "07:30", speed: 38, gbrake: 4.5 },
    { t: "07:40", speed: 28, gbrake: 6.8 },
    { t: "07:50", speed: 12, gbrake: 5.2 },
    { t: "08:00", speed: 0, gbrake: 0.5 },
  ],
  "Shift 1 (8 Jam)": [
    { t: "00:00", speed: 18, gbrake: 1.0 },
    { t: "01:00", speed: 24, gbrake: 1.4 },
    { t: "02:00", speed: 30, gbrake: 2.0 },
    { t: "03:00", speed: 33, gbrake: 2.6 },
    { t: "04:00", speed: 36, gbrake: 3.4 },
    { t: "05:00", speed: 40, gbrake: 4.2 },
    { t: "06:00", speed: 30, gbrake: 5.5 },
    { t: "07:00", speed: 15, gbrake: 6.8 },
    { t: "08:00", speed: 0, gbrake: 0.5 },
  ],
  "24 Jam": [
    { t: "00:00", speed: 10, gbrake: 0.8 },
    { t: "04:00", speed: 22, gbrake: 1.6 },
    { t: "08:00", speed: 35, gbrake: 2.4 },
    { t: "12:00", speed: 38, gbrake: 3.0 },
    { t: "16:00", speed: 33, gbrake: 4.1 },
    { t: "20:00", speed: 20, gbrake: 5.6 },
    { t: "24:00", speed: 0, gbrake: 6.8 },
  ],
  "7 Hari": [
    { t: "Sen", speed: 30, gbrake: 2.0 },
    { t: "Sel", speed: 32, gbrake: 2.4 },
    { t: "Rab", speed: 34, gbrake: 3.0 },
    { t: "Kam", speed: 31, gbrake: 3.6 },
    { t: "Jum", speed: 36, gbrake: 4.8 },
    { t: "Sab", speed: 28, gbrake: 5.9 },
    { t: "Min", speed: 0, gbrake: 6.8 },
  ],
};

export const SPEED_LIMIT_KMH = 40;

export interface Metric {
  id: string;
  label: string;
  badge?: string;
  icon?: string;
  value: string;
  unit: string;
  tone: "neutral" | "aman" | "waspada" | "bahaya";
  note: string;
}

export const METRICS: Metric[] = [
  { id: "speed", label: "Kecepatan GPS / PIT", icon: "/kendaraan/speed-icon.svg", value: "0.0", unit: "km/h", tone: "neutral", note: "Terkunci / Idle Stop" },
  { id: "brake", label: "Tekanan Angin Kompresor", badge: "K3 Minerba", value: "6.2", unit: "Bar", tone: "waspada", note: "Waspada (Mendekati Ambang 6.5 Bar)" },
  { id: "temp", label: "Suhu Hub & Brake Cooler", icon: "/kendaraan/temp-icon.svg", value: "88°C", unit: "/ Max 95°C", tone: "waspada", note: "Overheat Brake Jacket" },
  { id: "hoist", label: "Hoist Dump & Payload", icon: "/kendaraan/hoist-icon.svg", value: "32.4", unit: "Ton / 210 Bar", tone: "neutral", note: "Dump Body: Rest Level (0°)" },
  { id: "tpms", label: "Sensor TPMS Roda Gandar", badge: "LLAJ Darat", icon: "/kendaraan/tpms-icon.svg", value: "118", unit: "Psi (Rata-rata)", tone: "neutral", note: "Roda Belakang Kiri: -12% Psi" },
  { id: "dms", label: "DMS Driver & Timbangan WIM", value: "2x", unit: "Alert / 9.8T Gandar", tone: "waspada", note: "Micro-Sleep & Beban Aman" },
];

export interface AnomalyFlag {
  id: string;
  time: string;
  label: string;
  tone: "waspada" | "bahaya";
  desc: string;
  linkTo: string;
}

export const ANOMALY_FLAGS: AnomalyFlag[] = [
  {
    id: "flag1",
    time: "07:18 WIB",
    label: "Hard Braking Spike",
    tone: "waspada",
    desc: "Muatan ore penuh (32 ton) menyebabkan lonjakan suhu tromol roda belakang ke 88°C.",
    linkTo: "log3",
  },
  {
    id: "flag2",
    time: "08:14 WIB",
    label: "Pengawasan Ketat Otomatis",
    tone: "waspada",
    desc: "Tekanan rem mendekati ambang minimum. Sistem mengaktifkan mode pengawasan real-time pada turunan pit.",
    linkTo: "log1",
  },
];
