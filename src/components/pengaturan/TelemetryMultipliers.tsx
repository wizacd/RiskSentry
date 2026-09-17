"use client";

import { useState } from "react";
import { MULTIPLIERS } from "./mockThresholdConfig";

export default function TelemetryMultipliers() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(MULTIPLIERS.map((m) => [m.id, m.value]))
  );

  function reset() {
    setValues(Object.fromEntries(MULTIPLIERS.map((m) => [m.id, m.value])));
  }

  return (
    <div className="flex flex-col gap-3 rounded bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#191c1e]">2. Pembobotan Sensitivitas Sensor (Multipliers)</h3>
          <p className="text-xs text-[#45464d]">Kompensasi sensitivitas deteksi anomali AI &amp; telemetri CAN-Bus pada kategori ini.</p>
        </div>
        <img src="/pengaturan/info.svg" alt="" className="size-3.5" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {MULTIPLIERS.map((m) => (
          <div key={m.id} className="flex flex-col justify-between rounded-sm bg-[#f2f4f6] p-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <img src={m.icon} alt="" className="size-3.5" />
                <span className="text-xs font-bold leading-tight text-[#191c1e]">
                  {m.label.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </span>
              <span className="rounded-sm bg-[#131b2e] px-1.5 py-0.5 text-[13px] font-bold text-white">{values[m.id].toFixed(1)}x</span>
            </div>
            <p className="mt-1 text-xs text-[#45464d]">
              {m.description.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={values[m.id]}
              onChange={(e) => setValues((prev) => ({ ...prev, [m.id]: Number(e.target.value) }))}
              className="mt-2 w-full accent-[#131b2e]"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-2 text-xs text-[#45464d]">
          <img src="/pengaturan/info-2.svg" alt="" className="size-3.5" />
          Perubahan akan memicu kalkulasi ulang algoritma CAN-Bus edge device dalam 30 detik.
        </span>
        <button type="button" onClick={reset} className="rounded-sm bg-[#f2f4f6] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#191c1e] hover:bg-[#e6e8ea]">
          Reset Kategori Ini
        </button>
      </div>
    </div>
  );
}
