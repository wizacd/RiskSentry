// Konten statis/template dokumen (bukan data per-unit) — identitas kendaraan,
// health score, tabel metrik, dan validasi legal sekarang dihitung dari data
// asli lewat useLaporanExport.ts. Lihat komponen masing-masing.

export const DOCUMENT_META = {
  fastTrackBadge: "FAST-TRACK ELIGIBLE • UJI BERKALA 2024",
  title: ["Ekspor Dokumen Berita Acara & Rekomendasi", "KIR"],
  description: [
    "Penerbitan Sertifikat Uji Petik Kelaikan Teknis Kendaraan Angkutan Tambang",
    "terintegrasi IDSurvey & PT Sucofindo untuk pengajuan dispensasi/fast-track",
    "Dishub Provinsi & KESDM Minerba.",
  ],
};

export const REGULATION_STANDARD = {
  code: ["Kepmen ESDM No. 1827", "K/30/MEM/2018"],
  description: [
    "Lampiran II: Pedoman Pelaksanaan Kaidah",
    "Teknik Pertambangan yang Baik & Kelaikan",
    "Alat.",
  ],
};

export const FORMAT_SPECS = [
  { label: "Resolusi Output:", value: "300 DPI Vector PDF" },
  { label: "Stempel Waktu Digital:", value: "WIB (UTC+7) NTP Sync" },
];

export const AUDITOR = {
  name: "Hendra Gunawan, S.T.",
  role: "Senior Fleet Inspector • Sucofindo",
  reg: "Reg. BNSP 64*** **** ******",
  eSignNote: "Sertifikat e-Sign Aktif s/d 14 November 2026",
  photo: "/laporan/auditor-photo.png",
};

export const DOCUMENT_HEADER_STATIC = {
  formCode: "FORM-K3-ESDM-094",
  title: "BERITA ACARA PEMERIKSAAN KELAIKAN OPERASIONAL",
  subtitle: "KENDARAAN ANGKUTAN BERAT PERTAMBANGAN & DOKUMEN REKOMENDASI KIR",
};

export const LEGAL_VALIDATION_STATIC = {
  qrCaption: "PINDAI VERIFIKASI",
  qrIssuer: "Dishub Kab. Kolaka",
  assessorLabel: "ASESOR BERSERTIFIKAT PENGUJI:",
  assessorName: "Hendra Gunawan, S.T.",
  assessorRole: ["Kepala Tim Penguji K3 Pertambangan PT", "Sucofindo"],
  certRegistered: ["Sertifikat Terdaftar: IDSurvey-ESDM-", "PML-202488"],
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
