import type { Driver } from "@/types/database";

function formatDateID(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function OperatorCard({ driver }: { driver: Driver | null }) {
  const expired = driver ? new Date(driver.sim_expiry) < new Date() : false;

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] lg:col-span-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#45464d]">Operator Kabin</p>
          {driver && (
            <span
              className={`rounded-sm px-2 py-0.5 text-[11px] font-bold ${
                expired ? "bg-[#ffdad6] text-[#93000a]" : "bg-[#d1fae5] text-[#065f46]"
              }`}
            >
              {expired ? "SIM/SIO Kedaluwarsa" : "Fit To Work"}
            </span>
          )}
        </div>
        {driver ? (
          <div className="flex items-center gap-3">
            <div className="h-14 w-[53px] shrink-0 rounded-xl bg-[#e6e8ea] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div>
              <p className="text-lg font-bold leading-tight text-[#191c1e]">{driver.full_name}</p>
              <p className="text-[11px] font-bold text-[#45464d]">No. SIM/SIO: {driver.sim_number}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#45464d]">Belum ada operator ditugaskan ke unit ini.</p>
        )}
      </div>

      {driver && (
        <div className="mt-3 space-y-1.5 rounded bg-[#f2f4f6] p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img src="/kendaraan/calendar.svg" alt="" className="h-[13px] w-[11px]" />
              <span className="text-[11px] font-bold text-[#45464d]">Masa Berlaku SIM/SIO</span>
            </div>
            <span className={`text-[13px] font-bold ${expired ? "text-[#ba1a1a]" : "text-[#191c1e]"}`}>
              {formatDateID(driver.sim_expiry)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
