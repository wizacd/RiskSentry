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
