export type FleetTone = "bahaya" | "waspada" | "aman";

export interface FleetRow {
  id: string;
  tone: FleetTone;
  category: "alat_berat" | "darat";
  categoryEmoji: string;
  unitType: string;
  unitCode: string;
  subCode: string;
  client: string;
  operator: {
    name: string;
    license: string;
    note?: string;
  };
  legalitas: {
    icon: string;
    title: string;
    lines: string[];
  };
  checklist: {
    icon: string;
    title: string;
    note: string;
  };
  trend: number[];
  score: { value: number; label: string };
  status: { label: string };
  actions: { label: string; tone: "neutral" | FleetTone }[];
}

const TONE_STYLES: Record<FleetTone, { row: string; bar: string; border: string; badge: string; badgeIcon: string; scoreBg: string; scoreText: string; statusBg: string; statusText: string; statusDot: string }> = {
  bahaya: {
    row: "bg-[#fef2f2]/20",
    bar: "bg-[#dc2626]",
    border: "border-[#dc2626]",
    badge: "bg-[#fee2e2] text-[#b91c1c]",
    badgeIcon: "bg-[#fee2e2]",
    scoreBg: "bg-[#fee2e2]/80",
    scoreText: "text-[#b91c1c]",
    statusBg: "bg-[#fee2e2]",
    statusText: "text-[#991b1b]",
    statusDot: "bg-[#dc2626]",
  },
  waspada: {
    row: "bg-[#fffbeb]/20",
    bar: "bg-[#f59e0b]",
    border: "border-[#f59e0b]",
    badge: "bg-[#fef3c7] text-[#78350f]",
    badgeIcon: "bg-[#fef3c7]",
    scoreBg: "bg-[#fef3c7]",
    scoreText: "text-[#78350f]",
    statusBg: "bg-[#fef3c7]",
    statusText: "text-[#92400e]",
    statusDot: "bg-[#f59e0b]",
  },
  aman: {
    row: "",
    bar: "bg-[#059669]",
    border: "border-[#059669]",
    badge: "bg-[#d1fae5] text-[#065f46]",
    badgeIcon: "bg-[#d1fae5]",
    scoreBg: "bg-[#ecfdf5]",
    scoreText: "text-[#047857]",
    statusBg: "bg-[#ecfdf5]",
    statusText: "text-[#065f46]",
    statusDot: "bg-[#059669]",
  },
};

export function toneStyles(tone: FleetTone) {
  return TONE_STYLES[tone];
}

const TONE_HEX: Record<FleetTone, string> = {
  bahaya: "#dc2626",
  waspada: "#f59e0b",
  aman: "#059669",
};

export function toneHex(tone: FleetTone) {
  return TONE_HEX[tone];
}

export const FLEET_ROWS: FleetRow[] = [
  {
    id: "DT-042",
    tone: "bahaya",
    category: "alat_berat",
    categoryEmoji: "🚜",
    unitType: "Dump Truck",
    unitCode: "DT-042",
    subCode: "PML-042",
    client: "PT ANTAM SBU NIKEL • HD 91T",
    operator: {
      name: "Ahmad Dahlan",
      license: "SIMPER ESDM Kelas 1: Expired",
      note: "LISENSI OPERATOR TIDAK VALID",
    },
    legalitas: {
      icon: "/dashboard/alert-red.svg",
      title: "SIA KEMENAKER HABIS",
      lines: ["Masa Uji Alat Habis 12 Hari", "Izin Masuk Pit Dibekukan"],
    },
    checklist: {
      icon: "/dashboard/wrench-red.svg",
      title: "BOCOR OLI HOIST SILINDER • BRAKE ACCUMULATOR 4.1 BAR",
      note: "Tekanan rem darurat…",
    },
    trend: [42, 38, 31, 24, 18, 12],
    score: { value: 12, label: "Kritis" },
    status: { label: "Dilarang Operasi (Pit)" },
    actions: [
      { label: "Detail", tone: "neutral" },
      { label: "BAP K3", tone: "bahaya" },
    ],
  },
  {
    id: "TRK-108",
    tone: "bahaya",
    category: "darat",
    categoryEmoji: "🚛",
    unitType: "Truk Tronton",
    unitCode: "TRK-108",
    subCode: "B 9421 UEK",
    client: "PT SINAR LOGISTIK NUSANTARA",
    operator: {
      name: "Ahmad Supardi",
      license: "SIM BII Umum: Expired 12 Okt 2024",
      note: "LISENSI TIDAK BERLAKU",
    },
    legalitas: {
      icon: "/dashboard/alert-red.svg",
      title: "KIR KEMENHUB: KADALUARSA",
      lines: ["Mati Uji Berkala 5 Hari", "STNK Pajak Aktif"],
    },
    checklist: {
      icon: "/dashboard/wrench-red.svg",
      title: "REM KAKI BLONG • MINYAK REM BOCOR • LAMPU REM MATI",
      note: "Pedal rem amblas ke…",
    },
    trend: [45, 40, 32, 25, 19, 15],
    score: { value: 15, label: "Risiko Berat" },
    status: { label: "Dilarang Jalan (BAP)" },
    actions: [
      { label: "Detail", tone: "neutral" },
      { label: "BAP Dishub", tone: "bahaya" },
    ],
  },
  {
    id: "EX-008",
    tone: "waspada",
    category: "alat_berat",
    categoryEmoji: "🚜",
    unitType: "Excavator",
    unitCode: "EX-008",
    subCode: "K3-EX-08",
    client: "PT FREEPORT INDONESIA",
    operator: {
      name: "Bambang Hendarto",
      license: "SIMPER Valid Minerba ESDM",
      note: "EXP: DES 2026",
    },
    legalitas: {
      icon: "/dashboard/check-green.svg",
      title: "SIA ESDM K3 TERVERIFIKASI",
      lines: ["Uji Kelayakan Rig & Boom Sah", "Area Grasberg Pit Open"],
    },
    checklist: {
      icon: "/dashboard/wrench-amber.svg",
      title: "SUHU ENGINE 98°C • TRACK SHOE KIRI AUS 75%",
      note: "Perlu pengencangan",
    },
    trend: [78, 72, 67, 62, 57, 52],
    score: { value: 52, label: "Sedang" },
    status: { label: "Waspada Tiket 24J" },
    actions: [
      { label: "Detail", tone: "neutral" },
      { label: "Tiket WO", tone: "waspada" },
    ],
  },
  {
    id: "BUS-024",
    tone: "waspada",
    category: "darat",
    categoryEmoji: "🚛",
    unitType: "Bus AKAP",
    unitCode: "BUS-024",
    subCode: "B 7812 TGA",
    client: "PO HARAPAN PRIMA • AKAP",
    operator: {
      name: "Hendra Setiawan",
      license: "SIM BII Umum • Valid Dishub",
      note: "EXP: NOV 2026",
    },
    legalitas: {
      icon: "/dashboard/check-green.svg",
      title: "KIR BLUE AKTIF",
      lines: ["STNK & Izin Trayek AKAP Sah", "Asuransi Jasa Raharja Ada"],
    },
    checklist: {
      icon: "/dashboard/wrench-amber-2.svg",
      title: "BAN DEPAN KANAN 1.8MM • KLAKSON ANGIN MACET",
      note: "Wiper kiri getar saat…",
    },
    trend: [80, 75, 70, 65, 60, 56],
    score: { value: 56, label: "Sedang" },
    status: { label: "Waspada Tiket 24J" },
    actions: [
      { label: "Detail", tone: "neutral" },
      { label: "Tiket WO", tone: "waspada" },
    ],
  },
  {
    id: "WT-015",
    tone: "aman",
    category: "alat_berat",
    categoryEmoji: "🚜",
    unitType: "Water Truck",
    unitCode: "WT-015",
    subCode: "WT-015-SCF",
    client: "PT VALE INDONESIA TBK",
    operator: {
      name: "Dani Prasetyo",
      license: "SIMPER ESDM Tambang Aktif",
      note: "EXP: AGT 2027",
    },
    legalitas: {
      icon: "/dashboard/check-green-2.svg",
      title: "SIA & KALIBRASI TANGKI SAH",
      lines: ["Sertifikat Uji Hydrostatic Terbit", "Masa Berlaku s/d Des 2025"],
    },
    checklist: {
      icon: "/dashboard/shield-check-green.svg",
      title: "POMPA SPRAY NORMAL • RETARDER PRIMA • APAR 100%",
      note: "Sistem kemudi ganda,",
    },
    trend: [86, 88, 89, 90, 91, 92],
    score: { value: 92, label: "Sangat Aman" },
    status: { label: "Layak Operasi Resmi" },
    actions: [
      { label: "Detail", tone: "neutral" },
      { label: "Clear", tone: "neutral" },
    ],
  },
  {
    id: "BUS-089",
    tone: "aman",
    category: "darat",
    categoryEmoji: "🚛",
    unitType: "Bus AKAP",
    unitCode: "BUS-089",
    subCode: "B 7123 PQA",
    client: "PO BINTANG PANTURA EXPRESS",
    operator: {
      name: "Markus Wibowo",
      license: "SIM BII Umum • Rampcheck Ready",
      note: "EXP: MEI 2027",
    },
    legalitas: {
      icon: "/dashboard/check-green-2.svg",
      title: "KIR ELEKTRONIK BLUE SAH",
      lines: ["Bukti Lulus Uji Elektronik Dishub", "Izin Trayek Antar Provinsi Sah"],
    },
    checklist: {
      icon: "/dashboard/shield-check-green.svg",
      title: "CHECKLIST RAMPCHECK SEMPURNA (12/12 LOLOS)",
      note: "Rem angin, palu…",
    },
    trend: [84, 86, 87, 89, 90, 90],
    score: { value: 90, label: "Sangat Aman" },
    status: { label: "Layak Jalan Resmi" },
    actions: [
      { label: "Detail", tone: "neutral" },
      { label: "Clear", tone: "neutral" },
    ],
  },
];

export const CLIENT_OPTIONS = Array.from(new Set(FLEET_ROWS.map((row) => row.client))).sort();

export const UNIT_TYPE_OPTIONS = Array.from(new Set(FLEET_ROWS.map((row) => row.unitType))).sort();
