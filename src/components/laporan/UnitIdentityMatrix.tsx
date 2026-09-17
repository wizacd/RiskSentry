import type { Vehicle } from "@/types/database";

export default function UnitIdentityMatrix({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="rounded-sm bg-[#e6e8ea] px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#191c1e]">I. Identitas Kendaraan &amp; Pemegang Izin (IUP)</p>
      </div>
      <div className="grid grid-cols-1 gap-x-3 gap-y-2 rounded-sm bg-[#f7f9fb] p-2 sm:grid-cols-3">
        <div>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">Nomor Lambung / Unit:</p>
          <p className="text-lg font-bold tracking-tight text-[#191c1e]">{vehicle.unit_code}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">No. Registrasi Kendaraan:</p>
          <p className="text-lg font-bold tracking-tight text-[#191c1e]">{vehicle.plate_number}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">Model / Tipe Armada:</p>
          <p className="truncate text-sm font-bold text-[#191c1e]">{vehicle.unit_type ?? "Belum terklasifikasi"}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">Kategori Armada:</p>
          <p className="text-xs font-semibold text-[#191c1e]">{vehicle.category === "alat_berat" ? "Alat Berat" : "Kendaraan Darat"}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">Perusahaan Pemegang IUP / Site:</p>
          <p className="truncate text-xs font-semibold text-[#191c1e]">{vehicle.client_name}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wide text-[#45464d]">Masa Berlaku KIR/SILO:</p>
          <p className="text-xs font-bold text-[#191c1e]">
            {vehicle.kir_expiry ? new Date(vehicle.kir_expiry).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "Belum tercatat"}
          </p>
        </div>
      </div>
    </div>
  );
}
