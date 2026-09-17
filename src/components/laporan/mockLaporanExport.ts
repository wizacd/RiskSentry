export const DOCUMENT_META = {
  fastTrackBadge: "FAST-TRACK ELIGIBLE • UJI BERKALA 2024",
  title: ["Ekspor Dokumen Berita Acara & Rekomendasi", "KIR"],
  description: [
    "Penerbitan Sertifikat Uji Petik Kelaikan Teknis Kendaraan Angkutan Tambang",
    "terintegrasi IDSurvey & PT Sucofindo untuk pengajuan dispensasi/fast-track",
    "Dishub Provinsi & KESDM Minerba.",
  ],
};

export interface PresetItem {
  id: string;
  title: string;
  description: string;
}

export const REGULATION_STANDARD = {
  code: ["Kepmen ESDM No. 1827", "K/30/MEM/2018"],
  description: [
    "Lampiran II: Pedoman Pelaksanaan Kaidah",
    "Teknik Pertambangan yang Baik & Kelaikan",
    "Alat.",
  ],
};

export const PRESET_ITEMS: PresetItem[] = [
  {
    id: "bap",
    title: "BAP Fisik & Kelaikan Statis",
    description: "Wajib: Hasil uji 180 hari sistem pengereman, kemudi, & ban.",
  },
  {
    id: "telemetri",
    title: "Log Telemetri IoT & CAN-Bus (30 Hari)",
    description: "Data real-time beban payload, engine rpm & sensor panas hub roda.",
  },
  {
    id: "wo",
    title: "Salinan Work Order Rekomendasi (WO-8819)",
    description: "Riwayat penggantian brake lining depan & bukti clearance K3.",
  },
  {
    id: "sertifikasi",
    title: "Sertifikasi Asesor BNSP & SK Dirjen",
    description: "Legalitas tanda tangan digital Hendra Gunawan, S.T.",
  },
];

export const FORMAT_SPECS = [
  { label: "Resolusi Output:", value: "300 DPI Vector PDF" },
  { label: "Ukuran Dokumen Estimasi:", value: "3.8 MB (4 Halaman A4)" },
  { label: "Stempel Waktu Digital:", value: "WIB (UTC+7) NTP Sync" },
];

export const AUDITOR = {
  name: "Hendra Gunawan, S.T.",
  role: "Senior Fleet Inspector • Sucofindo",
  reg: "Reg. BNSP 64*** **** ******",
  eSignNote: "Sertifikat e-Sign Aktif s/d 14 November 2026",
  photo: "/laporan/auditor-photo.png",
};

export const DOCUMENT_HEADER = {
  formCode: "FORM-K3-ESDM-094",
  bapNumber: ["BAP-SCF-PML-2024-X-", "042"],
  issuedDate: "Tanggal Terbit: 28 Oktober 2024",
  title: "BERITA ACARA PEMERIKSAAN KELAIKAN OPERASIONAL",
  subtitle: "KENDARAAN ANGKUTAN BERAT PERTAMBANGAN & DOKUMEN REKOMENDASI KIR",
};

export const UNIT_IDENTITY = {
  unitCode: "DT-042",
  registration: "B 9102 XQ",
  model: "Komatsu HD785-7 (Rigid Dump)",
  capacity: "91.0 Metrik Ton",
  iupHolder: "PT Antam Tbk - SBU Nikel Pomalaa",
  odoHm: "142.850 KM / 8.420 HM",
};

export const HEALTH_SCORE = {
  score: 94,
  max: 100,
  grade: "KONDISI PRIMA (GRADE A+)",
  note: [
    "Unit memenuhi seluruh ambang batas",
    "keselamatan statis & dinamis Kepmen ESDM No.",
    "1827/2018.",
  ],
  recommendationLabel: "KESIMPULAN REKOMENDASI:",
  recommendation: ["LAYAK FAST-TRACK", "PERPANJANGAN KIR"],
};

export interface MetricRow {
  id: string;
  parameter: string[];
  standard: string[];
  measured: string[];
  statusLabel: string[];
  statusTone: "prima" | "lolos" | "selesai";
}

export const METRICS: MetricRow[] = [
  {
    id: "rem",
    parameter: ["Efisiensi Sistem Rem", "Utama (Service Brake)"],
    standard: ["Min. 50% efisiensi", "dinamis"],
    measured: ["82.0% (Deselerasi", "4.3 m/s²)"],
    statusLabel: ["LOLOS", "PRIMA"],
    statusTone: "prima",
  },
  {
    id: "p2h",
    parameter: ["Tingkat Kepatuhan", "Checklist P2H (180 Hari)"],
    standard: ["Min. 90.0%", "kelengkapan shift"],
    measured: ["98.4% (531 dari", "540 shift)"],
    statusLabel: ["LOLOS"],
    statusTone: "lolos",
  },
  {
    id: "iot",
    parameter: ["Integritas Sensor IoT,", "CAN-Bus & Ban"],
    standard: ["Zero unmonitored", "potensi risiko"],
    measured: ["96.5% Terkalibrasi", "Aktif"],
    statusLabel: ["LOLOS"],
    statusTone: "lolos",
  },
  {
    id: "riwayat",
    parameter: ["Riwayat Perbaikan Kritis", "Terakhir"],
    standard: ["WO Tertutup & Lolos", "Uji Re-inspeksi"],
    measured: ["WO-8819", "(Penggantian Pad", "Rem)"],
    statusLabel: ["SELESAI", "100%"],
    statusTone: "selesai",
  },
];

export const LEGAL_VALIDATION = {
  qrCaption: "PINDAI VERIFIKASI",
  qrIssuer: "Dishub Kab. Kolaka",
  assessorLabel: "ASESOR BERSERTIFIKAT PENGUJI:",
  assessorName: "Hendra Gunawan, S.T.",
  assessorRole: ["Kepala Tim Penguji K3 Pertambangan PT", "Sucofindo"],
  certifiedBadge: ["Tersertifikasi", "Digital"],
  sha256: "4e8f902b77a06c11d19830fe9a3a1f11cba47e923b3f465c1901c0f0a482d7c5",
  certRegistered: ["Sertifikat Terdaftar: IDSurvey-ESDM-", "PML-202488"],
  validity: ["Masa Berlaku Dokumen: 28 Jan 2026", "s/d 28 Jun 2027"],
};

export const FOOTER = {
  systemLine: ["Sistem Informasi K3 Terpadu RiskSentry • Sucofindo Command", "Center Platform"],
  pageLine: ["Halaman 1 dari 4 • Dokumen Rahasia Resmi Perusahaan &", "Otoritas Terkait"],
};

export const GUIDANCE = {
  title: "Butuh Legalisir Fisik Tambahan?",
  description: [
    "Jika Dinas Perhubungan setempat memerlukan cap basah konvensional, bawa salinan fisik dokumen ini ke Kantor Perwakilan",
    "Sucofindo Pomalaa (Gd. Administrasi Lt. 2).",
  ],
  linkLabel: "Periksa Unit Lainnya",
};
