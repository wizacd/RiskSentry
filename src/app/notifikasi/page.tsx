"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TelemetryTicker from "@/components/dashboard/TelemetryTicker";
import VehicleHeader from "@/components/kendaraan-detail/VehicleHeader";
import PageHeaderActionBar from "@/components/notifikasi/PageHeaderActionBar";
import FilterBar from "@/components/notifikasi/FilterBar";
import NotificationCard from "@/components/notifikasi/NotificationCard";
import PaginationFooter from "@/components/notifikasi/PaginationFooter";
import {
  FastFilterId,
  INITIAL_NOTIFICATIONS,
  NotificationItem,
  SURPRISE_ALERTS,
} from "@/components/notifikasi/mockNotifications";

function downloadCsv(items: NotificationItem[]) {
  const header = ["Kategori", "Kendaraan", "Wilayah", "Waktu", "ID Kasus", "Status"];
  const rows = items.map((i) =>
    [i.tone, i.vehicleLabel, i.site, i.timestamp, i.caseId, i.read ? "Sudah Dibaca" : "Belum Dibaca"]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "log-notifikasi-k3.csv";
  link.click();
  URL.revokeObjectURL(url);
}

let simulatedIdCounter = 0;

export default function NotifikasiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FastFilterId>("semua");
  const [query, setQuery] = useState("");
  const [site, setSite] = useState("semua");
  const [sortOldestFirst, setSortOldestFirst] = useState(false);

  const siteOptions = useMemo(() => Array.from(new Set(notifications.map((n) => n.site))).sort(), [notifications]);

  const counts = useMemo<Record<FastFilterId, number>>(
    () => ({
      semua: notifications.length,
      unread: notifications.filter((n) => !n.read).length,
      bahaya: notifications.filter((n) => n.tone === "bahaya").length,
      waspada: notifications.filter((n) => n.tone === "waspada").length,
      selesai: notifications.filter((n) => n.tone === "selesai").length,
    }),
    [notifications]
  );

  const kpiCounts = useMemo(
    () => ({
      total: notifications.length,
      unresolved: notifications.filter((n) => !n.read && n.tone === "bahaya").length,
      grounded: notifications.filter((n) => n.grounded).length,
      avgResponse: "3.4",
    }),
    [notifications]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = notifications.filter((n) => {
      const matchesFilter =
        activeFilter === "semua" ||
        (activeFilter === "unread" && !n.read) ||
        activeFilter === n.tone;
      const matchesSite = site === "semua" || n.site === site;
      const matchesQuery =
        q.length === 0 ||
        n.vehicleId.toLowerCase().includes(q) ||
        n.vehicleLabel.toLowerCase().includes(q) ||
        n.caseId.toLowerCase().includes(q);
      return matchesFilter && matchesSite && matchesQuery;
    });
    if (sortOldestFirst) result = [...result].reverse();
    return result;
  }, [notifications, activeFilter, site, query, sortOldestFirst]);

  function handleMarkRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function handleSimulate() {
    const template = SURPRISE_ALERTS[simulatedIdCounter % SURPRISE_ALERTS.length];
    simulatedIdCounter += 1;
    const newItem: NotificationItem = { ...template, id: `sim-${simulatedIdCounter}`, read: false };
    setNotifications((prev) => [newItem, ...prev]);
  }

  return (
    <div className="flex min-h-screen bg-[#f6f7f8]">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <VehicleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex flex-1 flex-col gap-3 px-6 py-4">
          <TelemetryTicker />
          <PageHeaderActionBar
            counts={kpiCounts}
            onSimulate={handleSimulate}
            onMarkAllRead={handleMarkAllRead}
            onToggleSort={() => setSortOldestFirst((v) => !v)}
            sortOldestFirst={sortOldestFirst}
            onExportCsv={() => downloadCsv(visible)}
          />
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            query={query}
            onQueryChange={setQuery}
            site={site}
            onSiteChange={setSite}
            siteOptions={siteOptions}
          />
          <div className="flex flex-col gap-3">
            {visible.length === 0 ? (
              <p className="rounded-lg bg-white p-8 text-center text-sm text-[#45464d] shadow-sm">
                Tidak ada notifikasi yang cocok dengan filter ini.
              </p>
            ) : (
              visible.map((item) => <NotificationCard key={item.id} item={item} onMarkRead={handleMarkRead} />)
            )}
          </div>
          <PaginationFooter shown={visible.length} total={notifications.length} />
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e6e8ea] bg-[#f2f4f6] px-6 py-4 text-xs text-[#45464d]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 PT Sucofindo (Persero) - IDSurvey Holding. All rights reserved.</span>
            <span className="text-[#c6c6cd]">•</span>
            <span>Sistem Informasi Manajemen Keselamatan Operasional &amp; K3</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <img src="/notifikasi/lock.svg" alt="" className="h-[13px] w-[10px]" />
              <span className="text-[11px] font-bold tracking-wide text-[#545f73]">256-Bit SSL Encrypted Session</span>
            </div>
            <span className="text-[#c6c6cd]">|</span>
            <span className="text-[11px] font-bold tracking-wide text-[#45464d]">Secured Audit Level-4</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
