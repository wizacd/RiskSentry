import type { Vehicle } from "@/types/database";

function formatDateID(iso: string | null) {
  if (!iso) return "Belum tercatat";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function IdentityCard({ vehicle }: { vehicle: Vehicle }) {
  const expired = vehicle.kir_expiry ? new Date(vehicle.kir_expiry) < new Date() : false;

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:col-span-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#45464d]">
            {vehicle.category === "alat_berat" ? "Spesifikasi Alat Berat" : "Spesifikasi Kendaraan Darat"}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#191c1e]">{vehicle.unit_type ?? "Unit Belum Terklasifikasi"}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-[#e6e8ea] px-2 py-0.5 text-base font-bold tracking-wide text-[#191c1e]">
              {vehicle.unit_code ?? "—"}
            </span>
            <span className="rounded-sm bg-[#f2f4f6] px-2 py-0.5 text-sm font-bold text-[#45464d]">{vehicle.plate_number}</span>
            <span className="rounded-sm bg-[#001d31]/10 px-2 py-0.5 text-[11px] font-bold text-[#188ace]">
              {vehicle.category === "alat_berat" ? "Alat Berat" : "Darat"}
            </span>
          </div>
        </div>
        <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f6]">
          <img src="/kendaraan/truck-badge.svg" alt="" className="h-6 w-[33px]" />
        </div>
      </div>

      <div className="mt-3 flex gap-8 rounded bg-[#f2f4f6]/50 px-2 pb-2 pt-3">
        <div>
          <p className="text-[11px] font-bold text-[#45464d]">Klien / Site Operasional</p>
          <p className="text-xs font-bold text-[#191c1e]">{vehicle.client_name}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#45464d]">Skor Risiko K3</p>
          <p className="text-[13px] font-bold text-[#191c1e]">{vehicle.risk_score} / 100</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <img src="/kendaraan/cert-badge.svg" alt="" className="h-[12px] w-[13px]" />
          <span className="text-[11px] font-bold text-[#45464d]">
            {vehicle.category === "alat_berat" ? "Sertifikasi SILO Kemenaker" : "Uji Berkala KIR Kemenhub"}
          </span>
        </div>
        <span className={`text-[11px] font-bold ${expired ? "text-[#ba1a1a]" : "text-[#191c1e]"}`}>
          {expired ? "Kedaluwarsa" : "Valid"} s.d. {formatDateID(vehicle.kir_expiry)}
        </span>
      </div>
    </div>
  );
}
