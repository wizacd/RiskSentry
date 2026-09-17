"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Potensi Risiko & P2H", href: "/anomali" },
  { label: "Notifikasi & Insiden", href: "/notifikasi" },
  { label: "Compliance Passport", href: "/compliance-passport/DT-042" },
  { label: "Detail Kendaraan / Telemetri", href: "/kendaraan/DT-042" },
  { label: "Laporan K3", href: "/laporan/export" },
  { label: "Pengaturan Sistem", href: "/pengaturan/threshold" },
];

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  return (
    <div
      className={`shrink-0 overflow-hidden border-r border-[#e6e8ea] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.04)] transition-[width] duration-200 ease-in-out ${
        open ? "w-72" : "w-0"
      }`}
    >
      <div className="flex h-full w-72 flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex h-16 items-center gap-2 px-5">
            <img src="/dashboard/logo-mark.svg" alt="" className="h-[17px] w-[13px]" />
            <div>
              <p className="text-lg font-semibold capitalize leading-6 text-[#191c1e]">RiskSentry</p>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">IDSurvey • Sucofindo</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#f2f4f6] px-3 py-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Command Station</span>
            <span className="rounded-sm bg-[#001d31]/10 px-1 py-0.5 text-[11px] font-bold tracking-wide text-[#188ace]">
              K3-CORE
            </span>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-sm px-3 py-2 text-sm font-semibold tracking-wide ${
                    active ? "bg-[#ba1a1a] text-white" : "text-[#45464d] hover:bg-[#f2f4f6]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3">
          <div className="space-y-1 rounded-sm bg-[#f2f4f6] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Protokol K3</span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">v4.2</span>
            </div>
            <p className="text-xs text-[#45464d]">Standar Keselamatan Operasional</p>
          </div>
        </div>
      </div>
    </div>
  );
}
