"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ANOMALY_FLAGS,
  METRICS,
  TELEMETRY_DATA,
  TIME_RANGES,
  TONE_COLORS,
  TimeRange,
} from "./mockVehicleDetail";
import TelemetryChart from "./TelemetryChart";

const ALAT_BERAT_PARAMS = [
  { id: "brake_pressure", label: "Tekanan Angin Rem (Bar) [K3 ESDM]", metricId: "brake" },
  { id: "hub_temp", label: "Suhu Hub Roda & Brake Cooler (°C)", metricId: "temp" },
  { id: "hoist_pressure", label: "Tekanan Hoist Dump (Psi)", metricId: "hoist" },
  { id: "payload", label: "Payload Weight Ore (32 Ton)", metricId: "hoist" },
  { id: "inclinometer", label: "Pitch Inclinometer Pit Turunan (°)", metricId: null as string | null },
];

const DARAT_PARAMS = [
  { id: "tpms", label: "TPMS Tekanan Ban Gandar (120 Psi)", metricId: "tpms" },
  { id: "wim", label: "WIM Axle Load Scale (Beban Gandar)", metricId: "dms" },
  { id: "dms_fatigue", label: "DMS Fatigue & Distraksi Event", metricId: "dms" },
  { id: "kampas_rem", label: "Kampas Rem & APAR Sensor", metricId: null as string | null },
];

export default function TelemetryPanel({ onFlagClick }: { onFlagClick: (logId: string) => void }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1 Jam");
  const [stream, setStream] = useState<"alat_berat" | "darat">("alat_berat");
  const [activeParams, setActiveParams] = useState<Set<string>>(new Set(ALAT_BERAT_PARAMS.map((p) => p.id)));
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveData, setLiveData] = useState(TELEMETRY_DATA[timeRange]);
  const [liveSpeed, setLiveSpeed] = useState(METRICS[0].value);

  useEffect(() => {
    setLiveData(TELEMETRY_DATA[timeRange]);
  }, [timeRange]);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setLiveData((prev) => {
        const last = prev[prev.length - 1];
        const nextSpeed = Math.max(0, Math.min(60, last.speed + (Math.random() * 10 - 5)));
        const nextBrake = Math.max(0, Math.min(8, last.gbrake + (Math.random() * 1.2 - 0.6)));
        setLiveSpeed(nextSpeed.toFixed(1));
        return [...prev.slice(1), { t: "live", speed: nextSpeed, gbrake: nextBrake }];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const chartSeries = useMemo(() => new Set(["speed", "gbrake"]), []);

  function toggleParam(id: string) {
    setActiveParams((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function activeMetricIds() {
    const params = stream === "alat_berat" ? ALAT_BERAT_PARAMS : DARAT_PARAMS;
    const ids = new Set<string>();
    params.forEach((p) => {
      if (p.metricId && activeParams.has(p.id)) ids.add(p.metricId);
    });
    return ids;
  }
  const dimmedOff = stream === "alat_berat" ? activeMetricIds() : new Set<string>();

  function selectStream(next: "alat_berat" | "darat") {
    setStream(next);
    setActiveParams(new Set((next === "alat_berat" ? ALAT_BERAT_PARAMS : DARAT_PARAMS).map((p) => p.id)));
  }

  const params = stream === "alat_berat" ? ALAT_BERAT_PARAMS : DARAT_PARAMS;

  return (
    <div className="rounded-lg border border-[#c6c6cd]/30 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#c6c6cd]/20 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-[#191c1e]">Telemetri Real-Time &amp; Sensor Beban/Axle Shift Berjalan</h2>
              <span className="flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-2.5 py-0.5">
                <span className="size-2 rounded-full bg-[#10b981]" />
                <span className="text-[11px] font-bold text-[#065f46]">Simulated Telemetry System</span>
              </span>
            </div>
            <p className="text-xs text-[#45464d]">
              Integrasi Sensor: Kompresor Pneumatik, Suhu Roda, Hoist Hidrolik, TPMS, Timbangan WIM Gandar, &amp; AI Fatigue DMS.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-0.5 rounded bg-[#f2f4f6] p-1">
              {TIME_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`rounded-sm px-3 py-1 text-[11px] font-bold ${
                    timeRange === range ? "bg-white text-[#191c1e] shadow-sm" : "text-[#45464d]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsSimulating((v) => !v)}
              aria-pressed={isSimulating}
              className="flex items-center gap-1.5 rounded bg-[#131b2e] px-3 py-1.5 text-xs font-bold text-white"
            >
              <img src="/kendaraan/play.svg" alt="" className="h-[11px] w-[13px] invert" />
              {isSimulating ? "Hentikan Simulasi" : "Simulasikan Live Telemetry"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
              Pilih Sumber Stream Telemetri Terpadu:
            </span>
            <div className="flex items-center gap-1.5">
              <img src="/kendaraan/antenna.svg" alt="" className="h-[9px] w-[13px]" />
              <span className="text-[11px] font-bold text-[#45464d]">
                Status Port: CAN-01 (Hauler Minerba) &amp; CAN-02 (FMS J1939 Darat) Aktif
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 rounded-lg border border-[#c6c6cd]/30 bg-[#f2f4f6] p-1.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => selectStream("alat_berat")}
              className={`flex items-center gap-2 rounded p-2 text-left ${
                stream === "alat_berat" ? "border border-[#c6c6cd]/20 bg-white shadow-sm" : ""
              }`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-[#f59e0b]/15">
                <img src="/kendaraan/heavy-equipment.svg" alt="" className="h-[18px] w-[19px]" />
              </span>
              <span>
                <span className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#191c1e]">🚜 Sensor Telemetri Alat Berat (Tambang / Pit)</span>
                  <span className="rounded-sm bg-[#f59e0b] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Komatsu HD785
                  </span>
                </span>
                <span className="block text-xs text-[#45464d]">
                  Sirkuit Angin Rem, Cooler Brake, Hoist Dump Silinder, Payload Ore, &amp; Inclinometer Turunan
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => selectStream("darat")}
              className={`flex items-center gap-2 rounded p-2 text-left ${
                stream === "darat" ? "border border-[#c6c6cd]/20 bg-white shadow-sm" : ""
              }`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-[#d5e0f8]">
                <img src="/kendaraan/road-truck.svg" alt="" className="h-4 w-[22px]" />
              </span>
              <span>
                <span className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#191c1e]">🚛 Sensor Telemetri Transportasi Darat (Logistik &amp; Bus)</span>
                  <span className="rounded-sm bg-[#545f73] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Hino 500 / Bus AKAP
                  </span>
                </span>
                <span className="block text-xs text-[#45464d]">
                  TPMS Tekanan Ban Gandar, Speed Limiter GPS, Sensor ODOL WIM, Kampas Rem, &amp; Kamera DMS Fatigue
                </span>
              </span>
            </button>
          </div>
          {stream === "darat" && (
            <p className="rounded bg-[#f2f4f6] px-3 py-2 text-xs text-[#45464d]">
              Unit {`DT-042`} terdaftar sebagai <strong>Alat Berat</strong> — stream sensor Transportasi Darat tidak tersedia untuk unit ini.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
              Parameter Telemetri Aktif Pada Layer Grafik:
            </span>
            <p className="text-[11px] text-[#45464d]">Pilih sensor untuk membandingkan kurva telemetri langsung</p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-bold text-[#45464d]">
              {stream === "alat_berat" ? "[Alat Berat]:" : "[Angkutan Jalan]:"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {params.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleParam(p.id)}
                  aria-pressed={activeParams.has(p.id)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    activeParams.has(p.id) ? "bg-[#131b2e] text-white" : "bg-[#f2f4f6] text-[#45464d]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {METRICS.map((m) => {
            const dimmed = stream === "alat_berat" && !dimmedOff.has(m.id) && ALAT_BERAT_PARAMS.some((p) => p.metricId === m.id);
            const tone = TONE_COLORS[m.tone];
            const displayValue = m.id === "speed" && isSimulating ? liveSpeed : m.value;
            return (
              <div key={m.id} className={`rounded border border-[#c6c6cd]/20 p-3 ${tone.bg} ${dimmed ? "opacity-40" : ""}`}>
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">{m.label}</span>
                  {m.icon ? <img src={m.icon} alt="" className="mt-0.5 size-3 shrink-0" /> : null}
                  {m.badge && (
                    <span className="shrink-0 rounded-sm bg-[#131b2e] px-1 text-[9px] font-bold text-white">{m.badge}</span>
                  )}
                </div>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${tone.text}`}>{displayValue}</span>
                  <span className="text-[11px] font-bold text-[#45464d]">{m.unit}</span>
                </p>
                <p className={`text-[11px] font-bold ${tone.text}`}>{m.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 rounded bg-white">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#191c1e]">
              <span className="size-3 rounded-full bg-[#131b2e]" /> Kecepatan (km/h)
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#191c1e]">
              <span className="h-1 w-3 rounded-full bg-[#f59e0b]" /> G-Braking (-m/s²)
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#191c1e]">
              <span className="h-1 w-3 rounded-full bg-[#ba1a1a]" /> Batas Kecepatan Pit &amp; Jalan (40 km/h)
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#191c1e]">
              <span className="h-1 w-3 rounded-full bg-[#059669]" /> Target Min. Tekanan Rem (6.5 Bar)
            </span>
          </div>
          <span className="rounded bg-[#ba1a1a]/10 px-2 py-0.5 text-[11px] font-bold text-[#ba1a1a]">
            🔴 Bendera Anomali K3 &amp; LLAJ ({ANOMALY_FLAGS.length} Kejadian)
          </span>
        </div>
        <TelemetryChart data={liveData} visibleSeries={chartSeries} />
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          {ANOMALY_FLAGS.map((flag) => (
            <button
              key={flag.id}
              type="button"
              onClick={() => onFlagClick(flag.linkTo)}
              className={`flex flex-1 items-start gap-2 rounded border p-2 text-left ${
                flag.tone === "bahaya" ? "border-[#ba1a1a]/20 bg-[#ffdad6]" : "border-[#fde68a] bg-[#fffbeb]"
              }`}
            >
              <img
                src={flag.tone === "bahaya" ? "/kendaraan/flag-red.svg" : "/kendaraan/flag-amber.svg"}
                alt=""
                className="mt-0.5 size-4 shrink-0"
              />
              <span>
                <span className={`block text-xs font-bold ${flag.tone === "bahaya" ? "text-[#93000a]" : "text-[#78350f]"}`}>
                  Flag {flag.id === "flag1" ? "01" : "02"} • {flag.time} — {flag.label}
                </span>
                <span className="text-[11px] text-[#45464d]">{flag.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
