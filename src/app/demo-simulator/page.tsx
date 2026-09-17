"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { SimulatorScenario, Vehicle } from "@/types/database";

const SCENARIOS: { key: SimulatorScenario; label: string; className: string }[] = [
  { key: "normal", label: "Normal", className: "bg-status-aman" },
  { key: "mulai_berisiko", label: "Mulai Berisiko", className: "bg-status-waspada" },
  { key: "bahaya", label: "Bahaya", className: "bg-status-bahaya" },
];

// TODO(Person 3, Figma): ganti dengan panel 3 tombol besar + pemilih kendaraan sesuai desain.
export default function DemoSimulatorPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    supabaseBrowser.from("vehicles").select("*").then(({ data }) => setVehicles(data ?? []));
  }, []);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  }

  async function trigger(scenario: SimulatorScenario) {
    if (selected.length === 0) return;
    setTriggering(true);
    await fetch("/api/simulator/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle_ids: selected, scenario }),
    });
    setTriggering(false);
  }

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-xl font-semibold">Demo Simulator</h1>

      <section>
        <h2 className="mb-2 font-medium">Pilih Kendaraan Target</h2>
        <div className="flex flex-wrap gap-2">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => toggle(v.id)}
              className={`rounded border px-3 py-1 text-sm ${selected.includes(v.id) ? "border-gray-900 bg-gray-900 text-white" : ""}`}
            >
              {v.plate_number}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-medium">Trigger Skenario</h2>
        <div className="flex gap-3">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              disabled={triggering || selected.length === 0}
              onClick={() => trigger(s.key)}
              className={`rounded px-6 py-3 font-semibold text-white disabled:opacity-40 ${s.className}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
