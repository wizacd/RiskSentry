export const VEHICLE = {
  unitCode: "DT-042",
  policeNumber: "B 9102 XQ",
  classLabel: "30 Ton Class",
  model: "Komatsu HD785-7",
  siteName: "PT Antam Tbk - Site Pomalaa",
  region: "PT Antam Pomalaa",
  location: "Hauling Pit Selatan (KM 14)",
  odometer: "142,850 KM",
  hourmeter: "12,480 Hourmeter",
  certExpiry: "Valid s.d. Jan 2026",
  monitoringId: "MON-20241028-092",
};

export const OPERATOR = {
  name: "Ahmad Dahlan",
  nik: "SUCO-9801",
  shift: "Shift 1",
  simper: "AP-9042 • K3-A1",
  fatigue: "0.00% (Negatif)",
  sleepAlerts: "2 Alert Micro-Sleep",
  simperExpiry: "Exp: Nov 2025",
};

export const RISK_SCORE = {
  value: 58,
  max: 100,
  levelLabel: "Level 3",
  statusLabel: "WASPADA (Pemeriksaan Lanjutan ESDM 1827)",
  color: "#f59e0b",
  contributors: [
    { label: "Tekanan Angin Kompresor Rem", pct: 45, color: "#ba1a1a" },
    { label: "Pola Hard-Braking Berulang", pct: 30, color: "#f59e0b" },
    { label: "Sensor Kemudi", pct: 17, color: "#f59e0b" },
  ],
};

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
    time: "07:18 WITA",
    label: "Hard Braking Spike",
    tone: "waspada",
    desc: "Muatan ore penuh (32 ton) menyebabkan lonjakan suhu tromol roda belakang ke 88°C.",
    linkTo: "log3",
  },
  {
    id: "flag2",
    time: "08:14 WITA",
    label: "Pengawasan Ketat Otomatis",
    tone: "waspada",
    desc: "Tekanan rem mendekati ambang minimum. Sistem mengaktifkan mode pengawasan real-time pada turunan pit.",
    linkTo: "log1",
  },
];

export interface InspectionItem {
  id: string;
  tone: "aman" | "waspada" | "bahaya";
  tag: string;
  date: string;
  desc: string;
  inspector: string;
  time: string;
}

export const INSPECTION_HISTORY: InspectionItem[] = [
  {
    id: "insp1",
    tone: "bahaya",
    tag: "Gagal Rampcheck",
    date: "Hari Ini • 28 Okt 2024",
    desc: "P2H Alat Berat: Tekanan angin rem 4.1 Bar. Rampcheck Darat: Uji KIR BLUE kadaluarsa 14 hari, wiper & lampu rem mati.",
    inspector: "Hendra Pratama (Sucofindo)",
    time: "06:15 WITA",
  },
  {
    id: "insp2",
    tone: "aman",
    tag: "Lolos Purna",
    date: "27 Okt 2024",
    desc: "24/24 Item P2H Komatsu memenuhi syarat. Rampcheck Hino: Tekanan ban, klakson, APAR, & palu pemecah kaca lengkap.",
    inspector: "Budi Santoso (Mekanik K3)",
    time: "06:05 WITA",
  },
  {
    id: "insp3",
    tone: "waspada",
    tag: "Bersyarat",
    date: "26 Okt 2024",
    desc: "P2H Alat Berat lolos. Catatan Rampcheck: Masa berlaku KIR tersisa 2 hari, diminta perpanjangan uji berkala segera.",
    inspector: "Budi Santoso",
    time: "06:12 WITA",
  },
  {
    id: "insp4",
    tone: "aman",
    tag: "Lolos Rampcheck Bus",
    date: "25 Okt 2024",
    desc: "Inspeksi Bus Antarkota BUS-024: Pintu darurat, APAR kabin, rem retarder, & kartu pengawasan izin trayek aktif.",
    inspector: "Irwan Kurniawan",
    time: "06:08 WITA",
  },
];

export const INSPECTION_ARCHIVE: InspectionItem[] = [
  {
    id: "insp5",
    tone: "aman",
    tag: "Lolos Purna",
    date: "24 Okt 2024",
    desc: "P2H rutin Komatsu HD785: seluruh 24 item checklist memenuhi standar K3 Minerba.",
    inspector: "Budi Santoso",
    time: "06:10 WITA",
  },
  {
    id: "insp6",
    tone: "waspada",
    tag: "Bersyarat",
    date: "23 Okt 2024",
    desc: "Rampcheck LLAJ: tekanan angin sedikit di bawah optimal (6.8 Bar), diminta pemantauan harian.",
    inspector: "Hendra Pratama (Sucofindo)",
    time: "06:20 WITA",
  },
];

export interface AnomalyLogEntry {
  id: string;
  tone: "waspada" | "bahaya";
  tag: string;
  time: string;
  title: string;
  detail?: string;
  sensor?: string;
  sanction?: string;
}

export const ANOMALY_LOG: AnomalyLogEntry[] = [
  {
    id: "log1",
    tone: "waspada",
    tag: "Waspada ESDM",
    time: "08:14:22 WITA",
    title: "Peringatan P2H: Tekanan Angin Komatsu Mendekati Ambang (6.2 Bar)",
    detail:
      "Analisis Sensor Sucofindo: Tekanan sirkuit pneumatik sekunder Komatsu HD785 mencapai 6.2 Bar, mendekati batas bawah standar K3 ESDM (6.5 – 8.0 Bar). Unit tetap diizinkan beroperasi dengan pengawasan real-time pada turunan Hauling Pit Selatan.",
    sensor: "Pneumatic Transducer PT-02",
    sanction: "Pengawasan Ketat K3 Minerba",
  },
  {
    id: "log2",
    tone: "bahaya",
    tag: "Kritis Dishub",
    time: "07:55:10 WITA",
    title: "Rampcheck: Lampu Rem Mati & Minyak Rem Bocor (Tronton)",
    detail:
      "Analisis Inspektur Sucofindo: Pemeriksaan visual rampcheck menemukan lampu rem tidak menyala dan rembesan minyak rem pada kaliper roda belakang kiri. Unit berisiko tinggi mengalami keterlambatan pengereman pada malam hari atau kondisi hujan.",
    sensor: "Inspeksi Visual Rampcheck LLAJ",
    sanction: "Tilang & Perbaikan Wajib Sebelum Jalan",
  },
  {
    id: "log3",
    tone: "waspada",
    tag: "Waspada",
    time: "07:18:00 WITA",
    title: "Hard-Braking Ekstrem (-6.8 m/s²) Muatan Penuh",
    detail:
      "Analisis Sensor Sucofindo: Terdeteksi deselerasi mendadak -6.8 m/s² saat muatan ore penuh (32 ton), menyebabkan lonjakan suhu tromol roda belakang hingga 88°C. Berpotensi mempercepat keausan brake lining.",
    sensor: "Accelerometer G-Force AG-04",
    sanction: "Rekomendasi Coaching Operator",
  },
  {
    id: "log4",
    tone: "waspada",
    tag: "Waspada",
    time: "06:45:10 WITA",
    title: "Deteksi Fatigue DMS (Micro-Sleep > 1.5 Detik)",
    detail:
      "Analisis Kamera DMS: Terdeteksi 2 episode micro-sleep berdurasi lebih dari 1.5 detik dalam 1 jam terakhir. Operator disarankan istirahat sebelum melanjutkan shift.",
    sensor: "Driver Monitoring Camera DMS-01",
    sanction: "Wajib Istirahat 15 Menit",
  },
];

export const TONE_COLORS: Record<string, { bg: string; text: string; tagBg: string }> = {
  bahaya: { bg: "bg-[#fef2f2]", text: "text-[#ba1a1a]", tagBg: "bg-[#ba1a1a]" },
  waspada: { bg: "bg-[#fffbeb]", text: "text-[#92400e]", tagBg: "bg-[#f59e0b]" },
  aman: { bg: "bg-[#f2f4f6]", text: "text-[#065f46]", tagBg: "bg-[#047857]" },
  neutral: { bg: "bg-[#f2f4f6]", text: "text-[#45464d]", tagBg: "bg-[#545f73]" },
};
