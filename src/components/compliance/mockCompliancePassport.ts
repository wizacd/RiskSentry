export const CREDENTIAL = {
  regId: "PASS-K3-SCF-2024-DT042-9981A",
  issuedAt: "28 Oktober 2024 • 08:00 WIB",
  auditorOrg: "PT Sucofindo Divisi SBU Mineral & Batubara",
  ledgerStatus: "Ledger Verifikasi: Cryptographic Digest SHA-256 Valid",
  fastTrackStatus: "DIREKOMENDASIKAN",
  fastTrackNote: "Bebas Masa Sanggah Teknis Dishub",
  complianceRate: "98.4%",
};

export const UNIT = {
  code: "DT-042",
  model: "Komatsu HD785-7 Off-Highway Rigid Dump Truck (Dump 91 MT)",
  kirExpiry: "15 Nov 2024",
  kirDaysLeft: 18,
  vin: "KMTHD7857A1009823",
  engineNumber: "SAA12V140E-3",
  iupHolder: "PT Antam Tbk",
  odometer: "142.850 KM",
  hourMeter: "8.420 Jam Kerja",
  pool: "Logistik Pit B Barat",
  photoCaption: "Foto fisik terverifikasi GPS geotagging (Pit B Pomalaa) • 28 Okt 2024",
  emissionTest: "Uji Emisi Gas Buang: LULUS",
  brakeEfficiency: "Uji Efisiensi Rem: 82% (Min. 50%)",
  sha256: "4e8f902b77a06c11d19830fe9a3a1f11cba47e923b3f465c1901c0f0a402",
  digitalSignatureId: "K3-SEC-2024-OKT",
};

export const HEALTH_INDEX = {
  score: 94,
  max: 100,
  grade: "GRADE A+ PRIMA",
  statusLabel: "STATUS KELAIKAN: SANGAT TINGGI",
  statusNote:
    "Unit memenuhi standar toleransi operasional pertambangan berisiko tinggi. Nilai indeks di atas ambang batas fast-track Dishub (≥ 85/100).",
  changeVsLastSemester: "+3.2% vs Semester Lalu",
  pillars: [
    { label: "Kepatuhan Checklist P2H Harian", pct: 99.1 },
    { label: "Integritas Komponen Kritis (Rem, Ban, Kemudi)", pct: 96.5 },
    { label: "Telemetri Sensor IoT (No Overheat / Overload)", pct: 92.8 },
    { label: "Kedisiplinan Pengemudi (Zero Overspeed Violations)", pct: 91.0 },
  ],
};

export type TimelineCategory = "sertifikasi" | "servis" | "iot" | "driver";

export interface TimelineEvent {
  id: string;
  category: TimelineCategory;
  critical: boolean;
  dotColor: string;
  dotIcon: string;
  title: string;
  statusBadges: { label: string; tone: "waspada" | "aman" | "neutral" | "dark" }[];
  date: string;
  description: string;
  footerLeft: { icon: string; label: string };
  footerRight?: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "event1",
    category: "driver",
    critical: false,
    dotColor: "bg-[#fef3c7]",
    dotIcon: "/compliance/tl-dot-amber.svg",
    title: "P2H Harian Shift Pagi Lolos Bersyarat",
    statusBadges: [
      { label: "Waspada (Kuning)", tone: "waspada" },
      { label: "Driver Inspection", tone: "neutral" },
    ],
    date: "28 Okt 2024 • 06:48 WIB",
    description:
      "Driver Agus Sunarto (NIK: D-772) mendeteksi keausan awal kampas rem roda depan kanan (ketebalan 1.8mm mendekati batas servis 1.5mm). Sistem SIGAP otomatis menerbitkan tiket perbaikan WO-8821 ke Pit B Workshop. Unit diperbolehkan operasi berkecepatan maksimum 30 km/jam.",
    footerLeft: { icon: "/compliance/tl-operator.svg", label: "Operator Shift 1" },
    footerRight: undefined,
  },
  {
    id: "event2",
    category: "servis",
    critical: false,
    dotColor: "bg-[#d1fae5]",
    dotIcon: "/compliance/tl-dot-green.svg",
    title: "Penggantian Kampas Rem & Bleeding Minyak Rem (WO-8819)",
    statusBadges: [
      { label: "Closed & Calibrated", tone: "aman" },
      { label: "Workshop Servis", tone: "neutral" },
    ],
    date: "27 Okt 2024 • 14:30 WIB",
    description:
      "Mekanik Pit B Senior (Bambang Wicaksono) menyelesaikan penggantian brake pad OEM Komatsu Genuine Parts. Efisiensi deselerasi diuji roller brake tester mencapai 84%. Status ditutup dan disahkan melalui verifikasi checklist mobile.",
    footerLeft: { icon: "/compliance/tl-qc.svg", label: "QC Signed by Foreman Workshop" },
    footerRight: "SPAREPART: PAD-SET-HD785-OEM",
  },
  {
    id: "event3",
    category: "iot",
    critical: false,
    dotColor: "bg-[#dbeafe]",
    dotIcon: "/compliance/tl-dot-blue.svg",
    title: "Fluktuasi Tekanan Ban TPMS Roda Kiri Belakang (R2-Out)",
    statusBadges: [
      { label: "Terkendali (Resolved)", tone: "aman" },
      { label: "IoT Telemetry", tone: "neutral" },
    ],
    date: "25 Okt 2024 • 11:15 WIB",
    description:
      "Sensor TPMS mendeteksi penurunan tekanan dari 105 PSI ke 92 PSI saat pengangkutan muatan nikel basah 88 MT. Dispatcher mengarahkan unit ke Tyre Bay Pit B untuk pengencangan valve stem. Tidak terjadi deflasi fatal atau keterlambatan konvoi.",
    footerLeft: { icon: "/compliance/tl-response-time.svg", label: "Respon Time: 9 Menit" },
    footerRight: undefined,
  },
  {
    id: "event4",
    category: "sertifikasi",
    critical: true,
    dotColor: "bg-[#059669]",
    dotIcon: "/compliance/tl-dot-approved.svg",
    title: "Audit Kelaikan Berkala Bulanan Asesor Sucofindo",
    statusBadges: [
      { label: "Skor Fisik: 96 / 100 (Approved)", tone: "aman" },
      { label: "Audit Resmi", tone: "dark" },
    ],
    date: "15 Okt 2024 • 10:00 WIB",
    description:
      "Inspeksi fisik komprehensif oleh Hendra Pratama, S.T. (Senior K3 Assessor Sucofindo) mencakup struktur chassis dump bed, sistem hidrolik hoist cylinder, lampu rotary, kamera blind spot, dan emergency steering system. Dokumen berita acara ditandatangani digital.",
    footerLeft: { icon: "/compliance/tl-auditor.svg", label: "Auditor: Hendra Pratama, S.T. (Reg. K3-99401)" },
    footerRight: "BAP No: BAP-SCF-PML-2024-X-042",
  },
  {
    id: "event5",
    category: "sertifikasi",
    critical: true,
    dotColor: "bg-[#e2e8f0]",
    dotIcon: "/compliance/tl-dot-gray.svg",
    title: "Kalibrasi Speed Limiter & Inspeksi APAR AF11",
    statusBadges: [
      { label: "Tersertifikasi Valid", tone: "neutral" },
      { label: "Mandatory K3", tone: "neutral" },
    ],
    date: "01 Okt 2024 • 09:00 WIB",
    description:
      "Pengujian pembatas kecepatan elektronik di setel pada batas regulasi jalan tambang maksimal 40 km/jam. Tabung Alat Pemadam Api Ringan (APAR 9 kg AF11) dan sistem otomatis Ansul fire suppression di ruang mesin telah lolos uji tekanan hidrostatis.",
    footerLeft: { icon: "/compliance/tl-apar.svg", label: "APAR Expired: 01 Okt 2025" },
    footerRight: undefined,
  },
];

export const TIMELINE_FILTERS = [
  { id: "semua", label: "Semua Peristiwa" },
  { id: "kritis", label: "Hanya Temuan Kritis" },
  { id: "sertifikasi", label: "Sertifikasi & Audit" },
  { id: "servis", label: "Servis Mekanik & WO" },
] as const;

export type TimelineFilterId = (typeof TIMELINE_FILTERS)[number]["id"];
