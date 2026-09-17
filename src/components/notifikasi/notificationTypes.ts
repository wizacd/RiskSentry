// Tipe & style notifikasi. Data asli dipetakan dari tabel `notifications`
// Supabase lewat useNotificationsData.ts — lihat mapping di sana.
export type NotificationTone = "bahaya" | "waspada";

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
};

export const FAST_FILTERS = [
  { id: "semua", label: "Semua Notifikasi" },
  { id: "unread", label: "Belum Dibaca" },
  { id: "bahaya", label: "Bahaya Kritis / Cut-Off" },
  { id: "waspada", label: "Waspada / P2H Toleransi" },
] as const;

export type FastFilterId = (typeof FAST_FILTERS)[number]["id"];
