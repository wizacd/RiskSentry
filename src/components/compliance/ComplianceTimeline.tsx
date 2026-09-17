"use client";

import { useMemo, useState } from "react";
import { TIMELINE_EVENTS, TIMELINE_FILTERS, TimelineFilterId } from "./mockCompliancePassport";

const BADGE_TONE: Record<string, string> = {
  waspada: "bg-[#fef3c7] text-[#92400e]",
  aman: "bg-[#d1fae5] text-[#065f46]",
  neutral: "bg-[#e6e8ea] text-[#45464d]",
  dark: "bg-[#131b2e] text-white",
};

export default function ComplianceTimeline() {
  const [filter, setFilter] = useState<TimelineFilterId>("semua");

  const events = useMemo(() => {
    return TIMELINE_EVENTS.filter((e) => {
      if (filter === "semua") return true;
      if (filter === "kritis") return e.critical;
      return e.category === filter;
    });
  }, [filter]);

  return (
    <div id="compliance-timeline" className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#191c1e]">Unified Compliance Timeline</h2>
            <span className="rounded-sm bg-[#e6e8ea] px-2 py-0.5 text-[11px] font-bold text-[#191c1e]">30 Hari Terakhir</span>
          </div>
          <p className="text-xs text-[#45464d]">
            Sinkronisasi riwayat real-time: Log Driver P2H, Telemetri CAN-Bus IoT, Servis Mekanik Pit Workshop, dan Audit
            Asesor Sucofindo.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded bg-[#f2f4f6] p-1 sm:grid-cols-4">
          {TIMELINE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-sm px-3 py-1.5 text-[11px] font-bold ${
                filter === f.id ? "bg-[#131b2e] text-white" : "bg-white text-[#45464d]"
              }`}
            >
              {f.label} {f.id === "semua" ? `(${TIMELINE_EVENTS.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col gap-5 pl-8">
        <div className="absolute bottom-4 left-[15px] top-2 w-0.5 bg-[#e6e8ea]" />
        {events.length === 0 ? (
          <p className="rounded bg-[#f2f4f6] p-4 text-center text-sm text-[#45464d]">Tidak ada peristiwa untuk filter ini.</p>
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
                    <span key={b.label} className={`rounded-sm px-2 py-0.5 text-[11px] font-bold ${BADGE_TONE[b.tone]}`}>
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
