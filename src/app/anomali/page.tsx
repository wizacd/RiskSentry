"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Vehicle } from "@/types/database";

// TODO(Person 2, Figma): tambahkan filter tingkat keparahan + styling kartu anomali.
export default function AnomaliPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    supabaseBrowser
      .from("vehicles")
      .select("*")
      .in("status", ["waspada", "bahaya"])
      .order("risk_score", { ascending: false })
      .then(({ data }) => setVehicles(data ?? []));
  }, []);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Daftar Anomali</h1>
      <ul className="space-y-2">
        {vehicles.map((v) => (
          <li key={v.id} className="rounded border bg-white p-3">
            <Link href={`/kendaraan/${v.id}`} className="font-medium underline">
              {v.plate_number}
            </Link>{" "}
            — status {v.status.toUpperCase()}, skor {v.risk_score}
          </li>
        ))}
      </ul>
    </main>
  );
}
