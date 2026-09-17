"use client";

import { useEffect, useState } from "react";
import type { Vehicle } from "@/types/database";

function daysUntil(iso: string | null) {
  if (!iso) return null;
  return Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

async function sha256Hex(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function UnitIdentityCard({ vehicle }: { vehicle: Vehicle }) {
  const [hash, setHash] = useState<string | null>(null);
  const kirDaysLeft = daysUntil(vehicle.kir_expiry);

  useEffect(() => {
    sha256Hex(JSON.stringify(vehicle)).then(setHash);
  }, [vehicle]);

  const SPECS = [
    { label: "Plat Nomor / No. Lambung", value: vehicle.plate_number },
    { label: "Klien / Pemegang IUP", value: vehicle.client_name },
    { label: "Kategori Armada", value: vehicle.category === "alat_berat" ? "Alat Berat" : "Kendaraan Darat" },
    { label: "Kelas Threshold (Fleet Type)", value: vehicle.fleet_type.toUpperCase() },
  ];

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-sm lg:col-span-7">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-t-lg bg-[#f2f4f6]/50 p-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-[#ba1a1a] text-lg font-bold text-white">
              {(vehicle.unit_code ?? "??").slice(0, 2)}
            </span>
            <div>
              <p className="text-xl font-bold text-[#191c1e]">Unit {vehicle.unit_code}</p>
              <p className="text-xs text-[#45464d]">{vehicle.unit_type ?? "Belum terklasifikasi"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Masa Berlaku Uji KIR</p>
            <p className="flex items-center justify-end gap-1.5 text-sm font-bold text-[#b45309]">
              <img src="/compliance/calendar-kir.svg" alt="" className="size-3.5" />
              {vehicle.kir_expiry ? new Date(vehicle.kir_expiry).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "Belum tercatat"}
            </p>
            {kirDaysLeft !== null && (
              <p className={`text-[11px] font-medium ${kirDaysLeft < 0 ? "text-[#ba1a1a]" : "text-[#45464d]"}`}>
                {kirDaysLeft < 0 ? `Kedaluwarsa ${Math.abs(kirDaysLeft)} Hari Lalu` : `Sisa ${kirDaysLeft} Hari Operasional`}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SPECS.map((spec) => (
            <div key={spec.label} className="rounded-sm bg-[#f2f4f6] p-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">{spec.label}</p>
              <p className="text-[13px] font-bold text-[#191c1e]">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-sm bg-[#f2f4f6]/40 p-3 font-mono text-[11px] text-[#45464d]">
        <p className="max-w-[70%] break-all">
          SHA256 (Snapshot Data Unit):
          <br />
          {hash ?? "Menghitung..."}
        </p>
        <p className="text-right font-sans font-medium text-[#191c1e]">
          Skor Risiko Saat Ini
          <br />
          {vehicle.risk_score} / 100 ({vehicle.status.toUpperCase()})
        </p>
      </div>
    </div>
  );
}
