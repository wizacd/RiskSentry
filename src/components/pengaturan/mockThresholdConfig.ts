export interface FleetCategory {
  id: string;
  icon: string;
  label: string;
  subtitle: string;
  bannerHeading: string[];
  hazardBadge: string[];
  bannerDesc: string[];
  slaLabel: string;
  defaults: { threshold1: number; threshold2: number };
  bounds: { t1Min: number; t1Max: number; t2Min: number; t2Max: number };
  t1Recommendation: { label: string; value: number };
  t2References: { label: string; value: number }[];
}

export const FLEET_CATEGORIES: FleetCategory[] = [
  {
    id: "bus",
    icon: "/pengaturan/tab-bus.svg",
    label: "Bus Karyawan / Penumpang",
    subtitle: "Sangat Ketat • Prioritas Nyawa",
    bannerHeading: ["Bus Karyawan", "/ Transportasi", "Penumpang"],
    hazardBadge: ["Tingkat", "Bahaya", "Fatalitas", "Tinggi"],
    bannerDesc: [
      "Kategori ini mengangkut kru aktif",
      "tambang. Parameter telemetri dikalibrasi",
      "dengan redundansi keselamatan",
      "maksimum.",
    ],
    slaLabel: "< 5 Menit (Grounded Langsung)",
    defaults: { threshold1: 30, threshold2: 65 },
    bounds: { t1Min: 10, t1Max: 60, t2Min: 50, t2Max: 90 },
    t1Recommendation: { label: "Rekomendasi ESDM", value: 30 },
    t2References: [
      { label: "Ketat Bus", value: 65 },
      { label: "Truk Umum", value: 80 },
    ],
  },
  {
    id: "dumptruck",
    icon: "/pengaturan/tab-dumptruck.svg",
    label: "Dump Truck Hauling",
    subtitle: "Standar Tambang Berat",
    bannerHeading: ["Dump Truck", "Hauling", "Tambang"],
    hazardBadge: ["Beban", "Berat", "Risiko", "Tinggi"],
    bannerDesc: [
      "Unit angkut muatan berat lintas pit.",
      "Toleransi kalibrasi menyesuaikan beban",
      "dan medan turunan curam area",
      "hauling.",
    ],
    slaLabel: "< 15 Menit (Tiket WO Wajib)",
    defaults: { threshold1: 35, threshold2: 75 },
    bounds: { t1Min: 15, t1Max: 60, t2Min: 55, t2Max: 90 },
    t1Recommendation: { label: "Rekomendasi ESDM", value: 35 },
    t2References: [
      { label: "Standar Hauling", value: 75 },
      { label: "Alat Berat Lain", value: 80 },
    ],
  },
  {
    id: "lv",
    icon: "/pengaturan/tab-lv.svg",
    label: "Light Vehicle (LV) Patroli",
    subtitle: "Mobilitas Pengawas",
    bannerHeading: ["Light Vehicle", "Patroli", "Pengawas"],
    hazardBadge: ["Mobilitas", "Tinggi", "Risiko", "Menengah"],
    bannerDesc: [
      "Kendaraan mobilitas pengawas & asesor",
      "lapangan. Frekuensi perjalanan tinggi",
      "dengan variasi rute non-tambang",
      "utama.",
    ],
    slaLabel: "< 30 Menit (Monitoring Rutin)",
    defaults: { threshold1: 40, threshold2: 70 },
    bounds: { t1Min: 15, t1Max: 65, t2Min: 55, t2Max: 90 },
    t1Recommendation: { label: "Rekomendasi ESDM", value: 40 },
    t2References: [
      { label: "Standar LV", value: 70 },
      { label: "Bus", value: 65 },
    ],
  },
  {
    id: "excavator",
    icon: "/pengaturan/tab-excavator.svg",
    label: "Alat Berat / Excavator",
    subtitle: "Mekanikal Hidrolik",
    bannerHeading: ["Alat Berat", "/ Excavator", "Hidrolik"],
    hazardBadge: ["Mekanikal", "Kritis", "Hidrolik", "Berat"],
    bannerDesc: [
      "Unit stasioner/semi-mobile dengan beban",
      "hidrolik tinggi. Fokus kalibrasi pada",
      "tekanan sistem dan suhu komponen",
      "kritis.",
    ],
    slaLabel: "< 15 Menit (Shutdown Hidrolik)",
    defaults: { threshold1: 35, threshold2: 70 },
    bounds: { t1Min: 15, t1Max: 60, t2Min: 55, t2Max: 90 },
    t1Recommendation: { label: "Rekomendasi ESDM", value: 35 },
    t2References: [
      { label: "Standar Excavator", value: 70 },
      { label: "Dump Truck", value: 75 },
    ],
  },
  {
    id: "tanker",
    icon: "/pengaturan/tab-tanker.svg",
    label: "Water & Fuel Support",
    subtitle: "Hazard Kimia & Ledakan",
    bannerHeading: ["Water & Fuel", "Support", "Tanker"],
    hazardBadge: ["Hazard", "Kimia", "Potensi", "Ledakan"],
    bannerDesc: [
      "Unit pengangkut cairan mudah terbakar.",
      "Ambang batas paling ketat karena risiko",
      "ledakan dan kontaminasi lingkungan",
      "tambang.",
    ],
    slaLabel: "< 5 Menit (Grounded Langsung)",
    defaults: { threshold1: 25, threshold2: 60 },
    bounds: { t1Min: 10, t1Max: 50, t2Min: 45, t2Max: 85 },
    t1Recommendation: { label: "Rekomendasi ESDM", value: 25 },
    t2References: [
      { label: "Hazmat Ketat", value: 60 },
      { label: "Tanker Umum", value: 70 },
    ],
  },
];

export interface Multiplier {
  id: string;
  icon: string;
  label: string[];
  value: number;
  description: string[];
}

export const MULTIPLIERS: Multiplier[] = [
  {
    id: "fatigue",
    icon: "/pengaturan/eye-fatigue.svg",
    label: ["AI Fatigue /", "Kantuk"],
    value: 2.0,
    description: ["Deteksi kelopak mata", "tertutup > 1.5 detik", "langsung", "melipatgandakan", "penambahan skor", "risiko."],
  },
  {
    id: "overspeed",
    icon: "/pengaturan/speed.svg",
    label: ["Overspeed", "di Pit"],
    value: 1.8,
    description: ["Pelanggaran kecepatan", "di tanjakan/turunan", "curam tambang (>40", "km/jam)."],
  },
  {
    id: "brake",
    icon: "/pengaturan/brake.svg",
    label: ["Pneumatik", "& Rem P2H"],
    value: 2.5,
    description: ["Penurunan tekanan", "kompresor udara &", "ketebalan kampas di", "bawah toleransi 30%."],
  },
];

export interface CaseStudyUnit {
  id: string;
  name: string;
  plateInfo: string[];
  fieldScore: number;
  microIndicators: { dot?: string; lines: string[] }[];
  oldThreshold: number;
  oldStatusLabel: string[];
  oldStatusTone: "waspada" | "aman";
  note: { icon: string; tone: "bahaya" | "neutral"; lines: string[] };
}

export const IMPACT_STATS = {
  monitored: 24,
  monitoredLabel: "Unit Bus Aktif",
  becameWaspada: 6,
  becameWaspadaNote: "+1 unit tereskalasi",
  becameGrounded: 2,
  becameGroundedNote: ["Cut-Off", "Diaktifkan"],
};

export const CASE_STUDIES: CaseStudyUnit[] = [
  {
    id: "case1",
    name: "Bus Karyawan Isuzu Elf 4x4",
    plateInfo: ["No. Lambung BS-003 • PT Antam", "Site Pomalaa"],
    fieldScore: 68,
    microIndicators: [
      { dot: "bg-[#ba1a1a]", lines: ["1x Micro-Sleep AI (14:12", "WIB)"] },
      { lines: ["Vibrasi Steering", "4.2Hz"] },
    ],
    oldThreshold: 75,
    oldStatusLabel: ["WASPADA", "(Monitoring)"],
    oldStatusTone: "waspada",
    note: {
      icon: "/pengaturan/warning-note.svg",
      tone: "bahaya",
      lines: ["Intervensi: Saklar CAN Engine Cut-Off terkirim.", "Pengemudi wajib diganti di Pos Km 12."],
    },
  },
  {
    id: "case2",
    name: "Crew Carrier Hino Dutro 4x4",
    plateInfo: ["No. Lambung BS-012 • PT Vale", "Soroako"],
    fieldScore: 34,
    microIndicators: [
      { lines: ["Sensor Kampas Depan Kiri", "18%"] },
      { lines: ["P2H Shift Pagi Lolos", "Bersyarat"] },
    ],
    oldThreshold: 40,
    oldStatusLabel: ["AMAN (Beroperasi)"],
    oldStatusTone: "aman",
    note: {
      icon: "/pengaturan/info-note.svg",
      tone: "neutral",
      lines: ["Disposisi: Tiket Work Order K3 diterbitkan ke", "Workshop Site untuk penggantian kampas 24 Jam."],
    },
  },
];
