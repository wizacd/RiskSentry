"use client";

import { useMemo, useState } from "react";
import type { AppNotification, P2HRecord } from "@/types/database";

type FilterId = "semua" | "kritis" | "p2h" | "notifikasi";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "semua", label: "Semua Peristiwa" },
  { id: "kritis", label: "Hanya Temuan Kritis" },
  { id: "p2h", label: "Riwayat P2H" },
  { id: "notifikasi", label: "Notifikasi Telemetri" },
];

const BADGE_TONE: Record<string, string> = {
  waspada: "bg-[#fef3c7] text-[#92400e]",
  aman: "bg-[#d1fae5] text-[#065f46]",
  neutral: "bg-[#e6e8ea] text-[#45464d]",
  bahaya: "bg-[#ffdad6] text-[#93000a]",
};

interface TimelineEvent {
  id: string;
  category: "p2h" | "notifikasi";
  critical: boolean;
  dotColor: string;
  dotIcon: string;
  title: string;
  statusBadges: { label: string; tone: string }[];
  date: string;
  description: string;
  footerLeft: { icon: string; label: string };
  footerRight?: string;
}

const P2H_STATUS_LABEL: Record<P2HRecord["final_status"], { label: string; tone: string; dotColor: string; dotIcon: string }> = {
  hijau: { label: "P2H Lolos (Hijau)", tone: "aman", dotColor: "bg-[#d1fae5]", dotIcon: "/compliance/tl-dot-green.svg" },
  kuning: { label: "P2H Bersyarat (Kuning)", tone: "waspada", dotColor: "bg-[#fef3c7]", dotIcon: "/compliance/tl-dot-amber.svg" },
  merah: { label: "P2H Ditolak (Merah)", tone: "bahaya", dotColor: "bg-[#ffdad6]", dotIcon: "/compliance/tl-dot-gray.svg" },
};

function formatDateID(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} • ${d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;
}

export default function ComplianceTimeline({
  p2hRecords,
  notifications,
  driverName,
}: {
  p2hRecords: P2HRecord[];
  notifications: AppNotification[];
  driverName: string | null;
}) {
  const [filter, setFilter] = useState<FilterId>("semua");

  const allEvents: TimelineEvent[] = useMemo(() => {
    const p2hEvents: TimelineEvent[] = p2hRecords.map((r) => {
      const meta = P2H_STATUS_LABEL[r.final_status];
      return {
        id: `p2h-${r.id}`,
        category: "p2h",
        critical: r.final_status === "merah",
        dotColor: meta.dotColor,
        dotIcon: meta.dotIcon,
        title: r.notes ?? meta.label,
        statusBadges: [{ label: meta.label, tone: meta.tone }],
        date: formatDateID(r.submitted_at),
        description: r.surat_jalan_id
          ? `Surat jalan diterbitkan: ${r.surat_jalan_id}.`
          : `SIM/SIO: ${r.sim_valid ? "Valid" : "Kedaluwarsa"} • KIR/SILO: ${r.unit_valid ? "Valid" : "Kedaluwarsa"}.`,
        footerLeft: { icon: "/compliance/tl-operator.svg", label: driverName ? `Driver: ${driverName}` : "Driver Belum Ditugaskan" },
      };
    });

    const notifEvents: TimelineEvent[] = notifications.map((n) => ({
      id: `notif-${n.id}`,
      category: "notifikasi",
      critical: n.severity === "bahaya",
      dotColor: n.severity === "bahaya" ? "bg-[#ffdad6]" : "bg-[#fef3c7]",
      dotIcon: n.severity === "bahaya" ? "/compliance/tl-dot-gray.svg" : "/compliance/tl-dot-amber.svg",
      title: n.message,
      statusBadges: [{ label: n.severity.toUpperCase(), tone: n.severity }],
      date: formatDateID(n.created_at),
      description: n.recommended_action ?? "Tidak ada rekomendasi tindakan tercatat.",
      footerLeft: { icon: "/compliance/tl-dispatch.svg", label: n.is_read ? "Sudah Ditindaklanjuti" : "Belum Ditindaklanjuti" },
      footerRight: undefined,
    }));

    return [...p2hEvents, ...notifEvents].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [p2hRecords, notifications, driverName]);

  const events = useMemo(() => {
    return allEvents.filter((e) => {
      if (filter === "semua") return true;
      if (filter === "kritis") return e.critical;
      return e.category === filter;
    });
  }, [allEvents, filter]);

  return (
    <div id="compliance-timeline" className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#191c1e]">Unified Compliance Timeline</h2>
            <span className="rounded-sm bg-[#e6e8ea] px-2 py-0.5 text-[11px] font-bold text-[#191c1e]">Riwayat Lengkap</span>
          </div>
          <p className="text-xs text-[#45464d]">
            Sinkronisasi riwayat asli: Log Driver P2H &amp; Notifikasi Telemetri CAN-Bus IoT untuk unit ini.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded bg-[#f2f4f6] p-1 sm:grid-cols-4">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-sm px-3 py-1.5 text-[11px] font-bold ${
                filter === f.id ? "bg-[#131b2e] text-white" : "bg-white text-[#45464d]"
              }`}
            >
              {f.label} {f.id === "semua" ? `(${allEvents.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col gap-5 pl-8">
        <div className="absolute bottom-4 left-[15px] top-2 w-0.5 bg-[#e6e8ea]" />
        {events.length === 0 ? (
          <p className="rounded bg-[#f2f4f6] p-4 text-center text-sm text-[#45464d]">
            {allEvents.length === 0 ? "Belum ada riwayat P2H atau notifikasi tercatat untuk unit ini." : "Tidak ada peristiwa untuk filter ini."}
          </p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="relative flex-1 rounded-lg bg-[#f2f4f6]/60 p-3">
              <span className={`absolute -left-8 top-1.5 flex size-6 items-center justify-center rounded-full shadow-sm ${event.dotColor}`}>
                <img src={event.dotIcon} alt="" className="size-3" />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#191c1e]">{event.title}</span>
                  {event.statusBadges.map((b) => (
                    <span key={b.label} className={`rounded-sm px-2 py-0.5 text-[11px] font-bold ${BADGE_TONE[b.tone] ?? BADGE_TONE.neutral}`}>
                      {b.label}
                    </span>
                  ))}
                </div>
                <span className="text-[13px] font-medium text-[#45464d]">{event.date}</span>
              </div>
              <p className="mt-1 text-xs text-[#191c1e]">{event.description}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#45464d]">
                  <img src={event.footerLeft.icon} alt="" className="size-3" />
                  {event.footerLeft.label}
                </span>
                {event.footerRight && <span className="font-mono text-[11px] text-[#45464d]">{event.footerRight}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
