"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChecklistCondition, P2HChecklist } from "@/types/database";

const CHECKLIST_ITEMS: { key: keyof P2HChecklist; label: string }[] = [
  { key: "rem", label: "Rem" },
  { key: "ban", label: "Ban" },
  { key: "lampu", label: "Lampu" },
  { key: "klakson", label: "Klakson" },
];

const CONDITIONS: { value: ChecklistCondition; label: string }[] = [
  { value: "ok", label: "OK" },
  { value: "minor", label: "Minor" },
  { value: "rusak", label: "Rusak" },
];

// TODO(Person 1, Figma): ganti dengan form 3-step (Pass I -> II -> III) + progress
// indicator sesuai desain. Endpoint POST /api/p2h/submit sudah menangani logika
// validasi & efek samping (Work Order / notifikasi / engine cut-off) — tinggal
// dipanggil dari sini.
export default function P2HFormPage() {
  const router = useRouter();
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [simExpiry, setSimExpiry] = useState("");
  const [kirExpiry, setKirExpiry] = useState("");
  const [checklist, setChecklist] = useState<P2HChecklist>({
    rem: "ok",
    ban: "ok",
    lampu: "ok",
    klakson: "ok",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/p2h/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle_id: vehicleId, driver_id: driverId, sim_expiry: simExpiry, kir_expiry: kirExpiry, checklist }),
    });
    const { final_status, surat_jalan_id } = await res.json();
    const params = new URLSearchParams({ status: final_status });
    if (surat_jalan_id) params.set("surat_jalan_id", surat_jalan_id);
    router.push(`/p2h/hasil?${params.toString()}`);
  }

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-xl font-semibold">Form P2H</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full rounded border px-3 py-2" placeholder="ID Kendaraan" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="ID Driver" value={driverId} onChange={(e) => setDriverId(e.target.value)} />
        <label className="block text-sm">
          Tanggal berlaku SIM/SIO
          <input type="date" className="mt-1 w-full rounded border px-3 py-2" value={simExpiry} onChange={(e) => setSimExpiry(e.target.value)} />
        </label>
        <label className="block text-sm">
          Tanggal berlaku KIR/SILO
          <input type="date" className="mt-1 w-full rounded border px-3 py-2" value={kirExpiry} onChange={(e) => setKirExpiry(e.target.value)} />
        </label>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Checklist Fisik</legend>
          {CHECKLIST_ITEMS.map((item) => (
            <div key={item.key} className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <select
                value={checklist[item.key]}
                onChange={(e) => setChecklist({ ...checklist, [item.key]: e.target.value as ChecklistCondition })}
                className="rounded border px-2 py-1"
              >
                {CONDITIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </fieldset>
        <button type="submit" className="w-full rounded bg-gray-900 py-2 text-white">
          Submit P2H
        </button>
      </form>
    </main>
  );
}
