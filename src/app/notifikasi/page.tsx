"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { AppNotification } from "@/types/database";

// TODO(Person 2, Figma): ganti list ini dengan toast/banner real-time + riwayat.
export default function NotifikasiPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    supabaseBrowser
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setNotifications(data ?? []));

    const channel = supabaseBrowser
      .channel("notifications-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications" }, (payload) => {
        setNotifications((prev) => [payload.new as AppNotification, ...prev]);
      })
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Riwayat Notifikasi</h1>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li key={n.id} className="rounded border bg-white p-3">
            <p className="font-medium">{n.message}</p>
            {n.recommended_action && <p className="text-sm text-gray-600">{n.recommended_action}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
