"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { AppNotification, Vehicle } from "@/types/database";
import type { NotificationItem, NotificationTone } from "./notificationTypes";

function relativeTimeID(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

function mapNotification(n: AppNotification, vehicle: Vehicle | undefined): NotificationItem {
  const tone = n.severity as NotificationTone;
  const grounded = tone === "bahaya";
  const created = new Date(n.created_at);

  return {
    id: n.id,
    tone,
    read: n.is_read,
    grounded,
    emoji: tone === "bahaya" ? "⚠️" : "🔧",
    vehicleLabel: vehicle
      ? `${vehicle.unit_type ?? "Unit"} ${vehicle.unit_code ?? vehicle.plate_number} (Plat ${vehicle.plate_number})`
      : "Unit Tidak Diketahui",
    vehicleId: vehicle?.unit_code ?? vehicle?.plate_number ?? "—",
    site: vehicle?.client_name ?? "—",
    timeAgo: relativeTimeID(n.created_at),
    timestamp: `${created.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} WIB`,
    caseId: `#K3-${n.id.slice(0, 8).toUpperCase()}`,
    messageBefore: "",
    messageBold: "",
    messageAfter: n.message,
    recommendationIcon: tone === "bahaya" ? "/notifikasi/alert-box.svg" : "/notifikasi/wrench.svg",
    recommendation: n.recommended_action ?? "Tidak ada rekomendasi tindakan tercatat.",
    statusBadges: [{ label: grounded ? "Grounded / Engine Cut-Off" : "Perlu Tindak Lanjut Bengkel", tone: "neutral" }],
    actions: grounded
      ? [
          { label: "Investigasi Kendaraan", icon: "/notifikasi/arrow-right-white.svg", kind: "investigate", primary: true },
          { label: "Tandai Dibaca", icon: "/notifikasi/check-small.svg", kind: "markRead" },
        ]
      : [
          { label: "Detail Kendaraan", icon: "/notifikasi/arrow-right-gray.svg", kind: "detail" },
          { label: "Tandai Dibaca", icon: "/notifikasi/check-small.svg", kind: "markRead" },
        ],
  };
}

export function useNotificationsData() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    const { data: notifications } = await supabaseBrowser
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!notifications || notifications.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    const vehicleIds = Array.from(new Set(notifications.map((n) => n.vehicle_id)));
    const { data: vehicles } = await supabaseBrowser.from("vehicles").select("*").in("id", vehicleIds);
    const vehicleById = new Map((vehicles ?? []).map((v) => [v.id, v]));

    setItems(notifications.map((n) => mapNotification(n, vehicleById.get(n.vehicle_id))));
    setLoading(false);
  }

  useEffect(() => {
    loadAll();

    const channel = supabaseBrowser
      .channel("notifikasi-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => loadAll())
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await supabaseBrowser.from("notifications").update({ is_read: true }).eq("id", id);
  }

  async function markAllRead() {
    const unreadIds = items.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await supabaseBrowser.from("notifications").update({ is_read: true }).in("id", unreadIds);
  }

  return { items, loading, markRead, markAllRead };
}
