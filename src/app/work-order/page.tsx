"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { WorkOrder } from "@/types/database";

// TODO(Person 1, Figma): styling tabel sesuai desain.
export default function WorkOrderPage() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {
    supabaseBrowser
      .from("work_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, []);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Work Order</h1>
      <table className="w-full rounded-lg border bg-white text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Kendaraan</th>
            <th className="p-3">Komponen Bermasalah</th>
            <th className="p-3">Tanggal</th>
            <th className="p-3">Status Tiket</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3">{o.vehicle_id}</td>
              <td className="p-3">{o.problem_component}</td>
              <td className="p-3">{new Date(o.created_at).toLocaleDateString("id-ID")}</td>
              <td className="p-3">{o.ticket_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
