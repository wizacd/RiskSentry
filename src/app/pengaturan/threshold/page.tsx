"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { ThresholdConfig } from "@/types/database";

// TODO(Person 2, Figma): ganti input number di bawah dengan slider sesuai desain.
export default function ThresholdSettingsPage() {
  const [configs, setConfigs] = useState<ThresholdConfig[]>([]);

  useEffect(() => {
    supabaseBrowser.from("threshold_configs").select("*").then(({ data }) => setConfigs(data ?? []));
  }, []);

  async function save(config: ThresholdConfig) {
    await supabaseBrowser
      .from("threshold_configs")
      .update({ waspada_threshold: config.waspada_threshold, bahaya_threshold: config.bahaya_threshold })
      .eq("id", config.id);
  }

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-xl font-semibold">Pengaturan Threshold Skor</h1>
      {configs.map((config, idx) => (
        <div key={config.id} className="max-w-sm space-y-2 rounded border bg-white p-4">
          <p className="font-medium">{config.fleet_type}</p>
          <label className="block text-sm">
            Ambang Waspada
            <input
              type="number"
              className="mt-1 w-full rounded border px-2 py-1"
              value={config.waspada_threshold}
              onChange={(e) => {
                const updated = [...configs];
                updated[idx] = { ...config, waspada_threshold: Number(e.target.value) };
                setConfigs(updated);
              }}
            />
          </label>
          <label className="block text-sm">
            Ambang Bahaya
            <input
              type="number"
              className="mt-1 w-full rounded border px-2 py-1"
              value={config.bahaya_threshold}
              onChange={(e) => {
                const updated = [...configs];
                updated[idx] = { ...config, bahaya_threshold: Number(e.target.value) };
                setConfigs(updated);
              }}
            />
          </label>
          <button onClick={() => save(configs[idx])} className="rounded bg-gray-900 px-3 py-1 text-sm text-white">
            Simpan
          </button>
        </div>
      ))}
    </main>
  );
}
