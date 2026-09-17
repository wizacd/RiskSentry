export type NotificationTone = "bahaya" | "waspada" | "selesai";

export interface NotificationAction {
  label: string;
  icon?: string;
  kind: "investigate" | "markRead" | "download" | "detail" | "photo" | "video" | "archive";
  primary?: boolean;
}

export interface NotificationItem {
  id: string;
  tone: NotificationTone;
  read: boolean;
  grounded: boolean;
  emoji: string;
  vehicleLabel: string;
  vehicleId: string;
  site: string;
  timeAgo: string;
  timestamp: string;
  caseId: string;
  messageBefore: string;
  messageBold: string;
  messageAfter: string;
  messageLine2?: string;
  recommendationIcon: string;
  recommendation: string;
  statusBadges: { label: string; tone: "bahaya" | "neutral" | "read" }[];
  actions: NotificationAction[];
}

export const TONE_STYLES: Record<NotificationTone, { iconBg: string; iconText: string; bar: string; badgeBg: string; badgeText: string }> = {
  bahaya: { iconBg: "bg-[#ffdad6]", iconText: "text-[#93000a]", bar: "bg-[#ba1a1a]", badgeBg: "bg-[#ffdad6]", badgeText: "text-[#93000a]" },
  waspada: { iconBg: "bg-[#eceef0]", iconText: "text-[#45464d]", bar: "bg-[#545f73]", badgeBg: "bg-[#e6e8ea]", badgeText: "text-[#45464d]" },
  selesai: { iconBg: "bg-[#eceef0]", iconText: "text-[#191c1e]", bar: "bg-[#188ace]", badgeBg: "bg-[#e6e8ea]", badgeText: "text-[#191c1e]" },
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif1",
    tone: "bahaya",
    read: false,
    grounded: true,
    emoji: "⚡",
    vehicleLabel: "No. Lambung DT-042 (Plat B 9102 XQ)",
    vehicleId: "DT-042",
    site: "PT Antam Tbk - Site Pomalaa",
    timeAgo: "Baru saja",
    timestamp: "08:14:22 WITA (Shift 1)",
    caseId: "#IMM-20241028-092",
    messageBefore: "Sistem K3 mendeteksi Drop Tekanan Angin Kompresor Rem ke ",
    messageBold: "4.1 Bar",
    messageAfter: " (Standar Wajib ESDM min 6.5 Bar). Engine Cut-Off darurat telah diaktifkan otomatis di turunan KM 14 Hauling Pit Selatan.",
    recommendationIcon: "/notifikasi/alert-box.svg",
    recommendation: "Mandatory K3: Evakuasi Derek Hauling & Terbitkan Berita Acara Grounding (BA-K3).",
    statusBadges: [{ label: "Engine Cut-Off Aktif", tone: "neutral" }, { label: "Kepmen ESDM 1827 K/30 Lampiran II", tone: "neutral" }],
    actions: [
      { label: "Investigasi Kendaraan", icon: "/notifikasi/arrow-right-white.svg", kind: "investigate", primary: true },
      { label: "Tandai Dibaca", icon: "/notifikasi/check-small.svg", kind: "markRead" },
      { label: "Unduh BA Insiden", icon: "/notifikasi/download-small.svg", kind: "download" },
    ],
  },
  {
    id: "notif2",
    tone: "bahaya",
    read: false,
    grounded: true,
    emoji: "🔧",
    vehicleLabel: "No. Lambung DT-019 (Plat KT 8841 VA)",
    vehicleId: "DT-019",
    site: "PT Vale Soroako",
    timeAgo: "19 menit lalu",
    timestamp: "07:55:10 WITA",
    caseId: "#STR-20241028-051",
    messageBefore: "Audit Fisik Lapangan Sucofindo menemukan ",
    messageBold: "Retak Kritis Tie-Rod Kemudi Depan 12mm",
    messageAfter: ". Sensor getaran CAN-Bus akselerometer 3.4G terdeteksi saat manuver di loading point.",
    recommendationIcon: "/notifikasi/alert-box.svg",
    recommendation: "Sanksi Kartu Merah Pengoperasian (KM-04). Larangan gerak sebelum penggantian tie-rod assembly purna.",
    statusBadges: [{ label: "Kartu Merah (Grounded)", tone: "neutral" }, { label: "Asesor: Hendra Pratama, S.T.", tone: "neutral" }],
    actions: [
      { label: "Investigasi Kendaraan", icon: "/notifikasi/arrow-right-white.svg", kind: "investigate", primary: true },
      { label: "Tandai Dibaca", icon: "/notifikasi/check-small.svg", kind: "markRead" },
      { label: "Lihat Foto Lapangan", icon: "/notifikasi/camera.svg", kind: "photo" },
    ],
  },
  {
    id: "notif3",
    tone: "bahaya",
    read: false,
    grounded: false,
    emoji: "🌡️",
    vehicleLabel: "Excavator Komatsu EX-008 (Plat B 9443 UN)",
    vehicleId: "EX-008",
    site: "PT Antam Tbk - Pit Utara",
    timeAgo: "25 menit lalu",
    timestamp: "07:49:15 WITA",
    caseId: "#HYD-20241028-018",
    messageBefore: "Suhu Fluida Hidrolik Boom Mencapai ",
    messageBold: "104°C",
    messageAfter: " (Batas Maksimal Aman 85°C). Terdeteksi potensi rupture mendadak pada saluran oli utama silinder arm.",
    recommendationIcon: "/notifikasi/alert-box.svg",
    recommendation: "Perintah evakuasi radius 15 meter operator & shutdown sistem hidrolik seketika.",
    statusBadges: [{ label: "Thermal Hazard High", tone: "neutral" }],
    actions: [
      { label: "Investigasi Kendaraan", icon: "/notifikasi/arrow-right-white.svg", kind: "investigate", primary: true },
      { label: "Tandai Dibaca", icon: "/notifikasi/check-small.svg", kind: "markRead" },
    ],
  },
  {
    id: "notif4",
    tone: "waspada",
    read: true,
    grounded: false,
    emoji: "🚧",
    vehicleLabel: "Light Vehicle LV-088 (Plat PA 4421 FP)",
    vehicleId: "LV-088",
    site: "PT Freeport Indonesia - Grasberg",
    timeAgo: "1 jam lalu",
    timestamp: "07:12:00 WITA",
    caseId: "#P2H-20241028-024",
    messageBefore: "Checklist P2H Mandiri Driver: Ketebalan Kampas Rem Depan ",
    messageBold: "1.8mm",
    messageAfter: " (Batas Minimum Aman 2.0mm) + Masa Berlaku SIMPER Pengemudi sisa 4 hari kalender.",
    recommendationIcon: "/notifikasi/wrench.svg",
    recommendation: "Rekomendasi: Terbitkan Tiket Work Order Bengkel (SLA < 24 Jam). Unit dibatasi beroperasi non-lereng.",
    statusBadges: [{ label: "Tiket WO Diterbitkan #WO-8821", tone: "neutral" }, { label: "Ditangani: Hendra Pratama, S.T.", tone: "neutral" }],
    actions: [{ label: "Detail Kendaraan", icon: "/notifikasi/arrow-right-gray.svg", kind: "detail" }],
  },
  {
    id: "notif5",
    tone: "waspada",
    read: true,
    grounded: false,
    emoji: "👁️",
    vehicleLabel: "Dump Truck DT-077 (Plat KT 7119 KL)",
    vehicleId: "DT-077",
    site: "PT Vale Soroako",
    timeAgo: "1 jam 20 menit lalu",
    timestamp: "06:45:10 WITA",
    caseId: "#AI-FAT-20241028-009",
    messageBefore: "Kamera AI Kabin mendeteksi ",
    messageBold: "2x Peringatan Micro-Sleep",
    messageAfter: " (>1.8 detik mata terpejam berturut-turut).",
    messageLine2: "Jam kerja berjalan driver: 5.5 jam tanpa jeda.",
    recommendationIcon: "/notifikasi/rest.svg",
    recommendation: "Rekomendasi: Disposisi istirahat wajib di Pos Rest Area KM 9 & rotasi driver cadangan segera.",
    statusBadges: [{ label: "Driver Diistirahatkan (Confirmed)", tone: "neutral" }, { label: "Kamera Edge AI DMS-04", tone: "neutral" }],
    actions: [
      { label: "Detail Kendaraan", icon: "/notifikasi/arrow-right-gray.svg", kind: "detail" },
      { label: "Buka Rekaman AI", icon: "/notifikasi/video.svg", kind: "video" },
    ],
  },
  {
    id: "notif6",
    tone: "selesai",
    read: true,
    grounded: false,
    emoji: "✅",
    vehicleLabel: "Water Truck WT-012 (Plat DT 7712 AN)",
    vehicleId: "WT-012",
    site: "PT Antam Tbk - Site Pomalaa",
    timeAgo: "2 jam lalu",
    timestamp: "06:15:00 WITA",
    caseId: "#RST-20241028-002",
    messageBefore: "",
    messageBold: "",
    messageAfter: "Verifikasi Sensor LiDAR Mundur telah selesai dibersihkan dari kerak debu bauksit. Status uji telemetri kalibrasi 100% normal.",
    recommendationIcon: "/notifikasi/unlock.svg",
    recommendation: "Kunci Lockout dilepas. Unit dinyatakan FIT & kembali ke rute penyiraman hauling aktif.",
    statusBadges: [{ label: "Pengujian Sucofindo Lolos", tone: "neutral" }, { label: "LOTO-Off #8921", tone: "neutral" }],
    actions: [{ label: "Arsip Berita Acara", icon: "/notifikasi/archive.svg", kind: "archive" }],
  },
];

export const SURPRISE_ALERTS: Omit<NotificationItem, "id" | "read">[] = [
  {
    tone: "bahaya",
    grounded: true,
    emoji: "🛑",
    vehicleLabel: "No. Lambung TRK-108 (Plat B 9421 UEK)",
    vehicleId: "TRK-108",
    site: "PT Sinar Logistik Nusantara",
    timeAgo: "Baru saja",
    timestamp: "Simulasi Demo Juri",
    caseId: "#SIM-DEMO-001",
    messageBefore: "Simulasi: Rampcheck mendeteksi ",
    messageBold: "Lampu Rem Mati & Minyak Rem Bocor",
    messageAfter: " pada unit tronton. Rekomendasi tilang & perbaikan wajib sebelum unit kembali jalan.",
    recommendationIcon: "/notifikasi/alert-box.svg",
    recommendation: "Mandatory: Tahan unit di pos Dishub terdekat sampai perbaikan selesai.",
    statusBadges: [{ label: "Simulasi Demo Juri", tone: "neutral" }],
    actions: [
      { label: "Tandai Dibaca", icon: "/notifikasi/check-small.svg", kind: "markRead" },
    ],
  },
];

export const FAST_FILTERS = [
  { id: "semua", label: "Semua Notifikasi" },
  { id: "unread", label: "Belum Dibaca" },
  { id: "bahaya", label: "Bahaya Kritis / Cut-Off" },
  { id: "waspada", label: "Waspada / P2H Toleransi" },
  { id: "selesai", label: "Disposisi Bengkel & BA Selesai" },
] as const;

export type FastFilterId = (typeof FAST_FILTERS)[number]["id"];
