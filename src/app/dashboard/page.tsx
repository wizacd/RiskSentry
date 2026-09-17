"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Vehicle } from "@/types/database";

const STATUS_STYLE: Record<Vehicle["status"], string> = {
  aman: "bg-status-aman/10 text-status-aman",
  waspada: "bg-status-waspada/10 text-status-waspada",
  bahaya: "bg-status-bahaya/10 text-status-bahaya",
};

// TODO(Person 2, Figma): ganti tabel sederhana ini dengan card grid/peta armada
// dari desain Figma. Bagian yang perlu dipertahankan: subscribe realtime di bawah,
// supaya badge status ikut berubah saat /demo-simulator dipicu.
export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    supabaseBrowser
      .from("vehicles")
      .select("*")
      .order("risk_score", { ascending: false })
      .then(({ data }) => setVehicles(data ?? []));

    const channel = supabaseBrowser
      .channel("vehicles-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, (payload) => {
        setVehicles((prev) => {
          const updated = payload.new as Vehicle;
          const exists = prev.some((v) => v.id === updated.id);
          return exists ? prev.map((v) => (v.id === updated.id ? updated : v)) : [...prev, updated];
        });
      })
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Dashboard Multi-Armada</h1>
      <table className="w-full overflow-hidden rounded-lg border bg-white text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Plat Nomor</th>
            <th className="p-3">Klien</th>
            <th className="p-3">Skor Risiko</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-3">
                <Link href={`/kendaraan/${v.id}`} className="underline">
                  {v.plate_number}
                </Link>
              </td>
              <td className="p-3">{v.client_name}</td>
              <td className="p-3">{v.risk_score}</td>
              <td className="p-3">
                <span className={`rounded px-2 py-1 text-xs font-medium ${STATUS_STYLE[v.status]}`}>
                  {v.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
