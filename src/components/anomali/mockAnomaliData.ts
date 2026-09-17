export const KPI = {
  totalActive: { value: 20, unit: "UNIT KENDARAAN", avgScore: "74.2 / 100" },
  bahaya: { value: 6, unit: "ENGINE CUT-OFF", note1: "Kepatuhan Sanksi", note2: "Kepmen ESDM 1827" },
  waspada: { value: 14, unit: "TIKET TERBIT", note1: "Target Penyelesaian", note2: "≤ Shift 2 Besok" },
  mtta: { value: "4.8", unit: "MENIT RERATA", note1: "Standar Sucofindo", note2: "< 15.0 Menit (Optimal)" },
};

export interface DescSegment {
  text: string;
  bold?: boolean;
}

export type Severity = "bahaya" | "waspada";

export interface AnomalyItem {
  id: string;
  severity: Severity;
  tagLabel: string;
  tagIcon: string;
  sourceTag: string;
  location: string;
  vehicleCode: string;
  vehicleModel: string;
  plate: string;
  contextLabel: string;
  contextValue: string;
  problemIcon: string;
  descLine1: DescSegment[];
  descLine2: string;
  metaParts: string[];
  metaHighlightIndex?: number;
  riskScore: number;
  primaryActionLabel: string;
  primaryActionDoneLabel: string;
  primaryActionIcon: string;
  secondaryActionLabel: string;
  category: string;
  vehicleType: string;
  hasDetailPage: boolean;
}

export const ANOMALY_ITEMS: AnomalyItem[] = [
  {
    id: "DT-042",
    severity: "bahaya",
    tagLabel: "BAHAYA TINGGI: ENGINE CUT-OFF AKTIF",
    tagIcon: "/anomali/tag-engine.svg",
    sourceTag: "KEPMEN ESDM 1827",
    location: "KM 14.2 Hauling Pit Barat • 08:14:22 WIB",
    vehicleCode: "DT-042",
    vehicleModel: "Dump Truck Scania G460 (40T)",
    plate: "B 9102 XQ",
    contextLabel: "Klien",
    contextValue: "PT Antam Tbk - Pomalaa",
    problemIcon: "/anomali/problem-brake.svg",
    descLine1: [
      { text: "Tekanan Angin Sirkuit Rem Drop ke 4.1 Bar", bold: true },
      { text: " (Standar Min 6.5 Bar) + " },
      { text: "P2H Item 04 Gagal Lolos", bold: true },
      { text: "." },
    ],
    descLine2: "Terdeteksi kebocoran seal kompresor pneumatik aktif saat turunan bermuatan 38 ton.",
    metaParts: ["Driver: Suparman (SIMPER Aktif - Exp. 2026)", "Shift 1 (Tambang)", "Respon Otomatis: Rem Parkir Darurat Mengunci"],
    metaHighlightIndex: 2,
    riskScore: 92,
    primaryActionLabel: "Terbitkan BA-K3 Sanksi",
    primaryActionDoneLabel: "BA-K3 Sanksi Diterbitkan",
    primaryActionIcon: "/anomali/action-sanction.svg",
    secondaryActionLabel: "Audit Telemetri CAN-BUS",
    category: "Sistem Rem",
    vehicleType: "Dump Truck",
    hasDetailPage: true,
  },
  {
    id: "DT-019",
    severity: "bahaya",
    tagLabel: "BAHAYA: RISIKO KEMUDI PATAH",
    tagIcon: "/anomali/tag-steering.svg",
    sourceTag: "INSPEKSI LAPANGAN SUCOFINDO",
    location: "ROM Hauling Zone C • 08:02:11 WIB",
    vehicleCode: "DT-019",
    vehicleModel: "Dump Truck Hino 700 Heavy",
    plate: "KT 8841 VA",
    contextLabel: "Klien",
    contextValue: "PT Antam Pomalaa",
    problemIcon: "/anomali/problem-brake.svg",
    descLine1: [
      { text: "Keretakan Kritis Tie-Rod Kemudi Depan 12mm", bold: true },
      { text: " terdeteksi saat audit fisik berkala + Pola getaran" },
    ],
    descLine2: "akselerometer abnormal 3.4G pada kecepatan 22 km/h. Larangan bergerak total diterapkan.",
    metaParts: ["Driver: Ahmad Fauzi", "Unit Ditahan di Bay Inspection Pit Utara", "Status: GROUNDED"],
    metaHighlightIndex: 2,
    riskScore: 88,
    primaryActionLabel: "Tag Lockout Out of Service",
    primaryActionDoneLabel: "Lockout Out of Service Ditandai",
    primaryActionIcon: "/anomali/action-lock.svg",
    secondaryActionLabel: "Detail Riwayat Kasus",
    category: "Sistem Kemudi",
    vehicleType: "Dump Truck",
    hasDetailPage: false,
  },
  {
    id: "EX-008",
    severity: "bahaya",
    tagLabel: "BAHAYA: RISIKO LEDAKAN HIDROLIK",
    tagIcon: "/anomali/tag-hydraulic.svg",
    sourceTag: "TELEMETRI CAN-SENSOR",
    location: "Loading Point South Face • 07:49:15 WIB",
    vehicleCode: "EX-008",
    vehicleModel: "Excavator Komatsu PC400LC-8",
    plate: "B 9443 UN",
    contextLabel: "Klien",
    contextValue: "PT Antam Pomalaa",
    problemIcon: "/anomali/problem-thermo.svg",
    descLine1: [
      { text: "Suhu Fluida Hidrolik Boom Mencapai 104°C", bold: true },
      { text: " (Ambang Batas Maksimal 85°C) disertai penurunan" },
    ],
    descLine2: "tekanan jalur oli 40%. Risiko rupture / semburan minyak panas di area loading aktif.",
    metaParts: ["Operator: Bambang Sudrajat (SIMPER K3 Alat Berat OK)", "Perintah: Evakuasi Radius 15 Meter"],
    metaHighlightIndex: 1,
    riskScore: 85,
    primaryActionLabel: "Shutdown & Isolasi Area",
    primaryActionDoneLabel: "Area Di-shutdown & Diisolasi",
    primaryActionIcon: "/anomali/action-shutdown.svg",
    secondaryActionLabel: "Lihat Sensor Live",
    category: "Hidrolik",
    vehicleType: "Excavator",
    hasDetailPage: false,
  },
  {
    id: "LV-088",
    severity: "waspada",
    tagLabel: "WASPADA: TIKET WORK ORDER (SLA 24 JAM)",
    tagIcon: "/anomali/tag-wrench.svg",
    sourceTag: "CHECKLIST P2H HARIAN",
    location: "Main Workshop Area • 07:12:00 WIB",
    vehicleCode: "LV-088",
    vehicleModel: "Light Vehicle Toyota Hilux 4x4 Double Cabin",
    plate: "DD 1092 KL",
    contextLabel: "Divisi",
    contextValue: "Survey Lapangan Lingkungan",
    problemIcon: "/anomali/problem-wrench.svg",
    descLine1: [
      { text: "Ketebalan Kampas Rem Depan 1.8mm", bold: true },
      { text: " (Batas Minimum Aus 2.0mm) + " },
      { text: "Masa Berlaku SIM Driver sisa 2 tahun", bold: true },
    ],
    descLine2: "Masih diizinkan operasional terbatas di zona non-lereng curam.",
    metaParts: ["Driver: Dedi Kurniawan", "Jadwal Masuk Bengkel: Hari ini pukul 16:00 WIB"],
    riskScore: 52,
    primaryActionLabel: "Terbitkan WO Bengkel",
    primaryActionDoneLabel: "WO Bengkel Diterbitkan",
    primaryActionIcon: "/anomali/action-wo.svg",
    secondaryActionLabel: "Jadwalkan Re-Inspeksi",
    category: "Sistem Rem",
    vehicleType: "Light Vehicle",
    hasDetailPage: false,
  },
  {
    id: "WT-012",
    severity: "waspada",
    tagLabel: "WASPADA: ANOMALI SISTEM KESELAMATAN AKTIF",
    tagIcon: "/anomali/tag-collision.svg",
    sourceTag: "IOT COLLISION WARNING",
    location: "Water Refill Station Pit 2 • 07:05:40 WIB",
    vehicleCode: "WT-012",
    vehicleModel: "Water Truck Isuzu Giga FVR (20.000L)",
    plate: "B 9011 TR",
    contextLabel: "Operasional",
    contextValue: "Penekanan Debu Hauling Road",
    problemIcon: "/anomali/problem-radar.svg",
    descLine1: [
      { text: "Sensor LiDAR Deteksi Tabrakan Belakang Terhalang Debu Padat / Offline", bold: true },
      { text: " & Lampu Rotator" },
    ],
    descLine2: "Mundur tidak menyala. Risiko blindspot tinggi saat kendaraan mundur di area pengisian air.",
    metaParts: ["Driver: Haryanto", "Tindakan: Petugas Pembersih Sensor Diberangkatkan"],
    riskScore: 48,
    primaryActionLabel: "Verifikasi Pembersihan Sensor",
    primaryActionDoneLabel: "Pembersihan Sensor Terverifikasi",
    primaryActionIcon: "/anomali/action-clean.svg",
    secondaryActionLabel: "Audit Diagnostic Port",
    category: "IoT/Sensor",
    vehicleType: "Water Truck",
    hasDetailPage: false,
  },
  {
    id: "DT-077",
    severity: "waspada",
    tagLabel: "WASPADA: PERINGATAN FATIGUE / MICRO-SLEEP",
    tagIcon: "/anomali/tag-fatigue.svg",
    sourceTag: "AI IN-CABIN SAFETY CAM",
    location: "Turunan Hauling KM 8.5 • 06:58:30 WIB",
    vehicleCode: "DT-077",
    vehicleModel: "Dump Truck Mitsubishi Fuso FN527",
    plate: "KT 7119 KL",
    contextLabel: "Rute",
    contextValue: "Pit Timur ke Port Penumpukan",
    problemIcon: "/anomali/problem-camera.svg",
    descLine1: [
      { text: "2x Alert Kamera AI Micro-Sleep Driver", bold: true },
      { text: " (>1.8 detik mata terpejam berturut-turut pada rute" },
    ],
    descLine2: "turunan). Buzzer kabin telah berbunyi. Diperlukan rotasi driver cadangan di Pos Rest Area KM 9.",
    metaParts: ["Driver: Ilham Wahyudi", "Jam Kerja Berjalan: 5.5 Jam Non-Stop", "Status: Diminta Masuk Rest Bay KM 9"],
    metaHighlightIndex: 2,
    riskScore: 74,
    primaryActionLabel: "Perintahkan Istirahat Wajib",
    primaryActionDoneLabel: "Istirahat Wajib Diperintahkan",
    primaryActionIcon: "/anomali/action-rest.svg",
    secondaryActionLabel: "Rekaman AI Kabin",
    category: "Fatigue Driver",
    vehicleType: "Dump Truck",
    hasDetailPage: false,
  },
];

export const CATEGORIES = ["Semua Kategori Masalah", ...Array.from(new Set(ANOMALY_ITEMS.map((i) => i.category)))];
export const VEHICLE_TYPES = ["Semua Jenis Armada", ...Array.from(new Set(ANOMALY_ITEMS.map((i) => i.vehicleType)))];

export const DEMO_ANOMALY: AnomalyItem = {
  id: "DEMO-001",
  severity: "bahaya",
  tagLabel: "BAHAYA TINGGI: SIMULASI DEMO JURI",
  tagIcon: "/anomali/tag-engine.svg",
  sourceTag: "SIMULASI SISTEM",
  location: "Simulasi Sistem • Waktu Saat Ini",
  vehicleCode: "DEMO-001",
  vehicleModel: "Unit Simulasi Demo Juri",
  plate: "SIM-0001",
  contextLabel: "Klien",
  contextValue: "Simulasi Internal RiskSentry",
  problemIcon: "/anomali/problem-brake.svg",
  descLine1: [
    { text: "Kartu Simulasi Demo Juri", bold: true },
    { text: " — mendemonstrasikan alur triase potensi risiko secara real-time saat kartu baru masuk ke stream." },
  ],
  descLine2: "Kartu ini dapat dihapus kapan saja dengan menekan tombol yang sama di header.",
  metaParts: ["Driver: Simulasi", "Sumber: Tombol Demo Juri"],
  riskScore: 95,
  primaryActionLabel: "Terbitkan BA-K3 Sanksi",
  primaryActionDoneLabel: "BA-K3 Sanksi Diterbitkan",
  primaryActionIcon: "/anomali/action-sanction.svg",
  secondaryActionLabel: "Audit Telemetri CAN-BUS",
  category: "Sistem Rem",
  vehicleType: "Dump Truck",
  hasDetailPage: false,
};
