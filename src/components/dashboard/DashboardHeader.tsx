"use client";

export default function DashboardHeader({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-[#e6e8ea] bg-white/80 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
          aria-pressed={sidebarOpen}
          className="flex size-8 flex-col items-center justify-center gap-[3px] rounded-sm hover:bg-[#f2f4f6]"
        >
          <span className="h-[2px] w-4 rounded-full bg-[#191c1e]" />
          <span className="h-[2px] w-4 rounded-full bg-[#191c1e]" />
          <span className="h-[2px] w-4 rounded-full bg-[#191c1e]" />
        </button>
        <div className="flex items-center gap-1">
          <img src="/dashboard/logo-mark.svg" alt="" className="h-[17px] w-[13px]" />
          <span className="text-lg font-semibold capitalize text-[#191c1e]">RiskSentry</span>
        </div>
        <div className="h-4 w-px bg-[#c6c6cd]" />
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
          IDSurvey • Sucofindo Safety System
        </span>
      </div>
      <div className="flex items-center gap-1 rounded-sm border border-[#c6c6cd] bg-[#f2f4f6] px-[9px] py-[5px]">
        <span className="size-[6px] rounded-full bg-[#065f46]" />
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">K3 Certified Gateway</span>
      </div>
    </header>
  );
}
