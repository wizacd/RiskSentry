import Link from "next/link";
import { NotificationItem, TONE_STYLES } from "./mockNotifications";

const HAS_DETAIL_PAGE = new Set(["DT-042"]);

export default function NotificationCard({
  item,
  onMarkRead,
}: {
  item: NotificationItem;
  onMarkRead: (id: string) => void;
}) {
  const tone = TONE_STYLES[item.tone];
  const hasDetail = HAS_DETAIL_PAGE.has(item.vehicleId);

  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-5 shadow-sm">
      <div className={`absolute inset-y-0 left-0 w-1.5 ${tone.bar}`} />
      <div className="flex flex-wrap items-start justify-between gap-4 pl-1">
        <div className="flex flex-1 gap-3">
          <span className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-lg ${tone.iconBg}`}>
            {item.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {!item.read && <span className="size-2.5 rounded-full bg-[#ba1a1a]" />}
              <span className={`rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${tone.badgeBg} ${tone.badgeText}`}>
                {item.tone === "bahaya" ? "Bahaya Kritis" : item.tone === "waspada" ? "Waspada" : "Status Pulih (Fit)"}
              </span>
              <span className="text-lg font-bold text-[#191c1e]">{item.vehicleLabel}</span>
              <span className="text-xs text-[#45464d]">• {item.site}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
              <span className={`font-medium ${item.read ? "text-[#45464d]" : "text-[#ba1a1a]"}`}>
                {item.timeAgo} • {item.timestamp}
              </span>
              <span className="text-[#45464d]">•</span>
              <span className="font-bold text-[#45464d]">ID Kasus: {item.caseId}</span>
            </div>

            <div className="mt-2 space-y-2 rounded bg-[#f2f4f6] p-3">
              <p className="text-sm text-[#191c1e]">
                {item.messageBefore}
                {item.messageBold && <span className="font-bold text-[#ba1a1a]">{item.messageBold}</span>}
                {item.messageAfter}
              </p>
              {item.messageLine2 && <p className="text-sm text-[#191c1e]">{item.messageLine2}</p>}
              <div className="flex items-start gap-2 rounded-sm bg-[#eceef0] p-2">
                <img src={item.recommendationIcon} alt="" className="mt-0.5 size-3 shrink-0" />
                <span className="text-[11px] font-bold text-[#45464d]">{item.recommendation}</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className={`rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-wide ${
                  item.read ? "bg-[#f2f4f6] text-[#45464d]" : "bg-[#ba1a1a] text-white"
                }`}
              >
                {item.read ? "Sudah Dibaca" : "Belum Dibaca"}
              </span>
              {item.statusBadges.map((b) => (
                <span key={b.label} className="rounded-sm bg-[#e6e8ea] px-2 py-1 text-[11px] font-bold text-[#191c1e]">
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-stretch gap-1.5 sm:w-44">
          {item.actions.map((action) => {
            if (action.kind === "investigate" || action.kind === "detail") {
              const className =
                action.kind === "investigate"
                  ? "flex items-center justify-center gap-1.5 rounded bg-black px-3 py-2 text-xs font-bold text-white"
                  : "flex items-center justify-center gap-1.5 rounded bg-[#e6e8ea] px-3 py-2 text-xs font-bold text-[#191c1e]";
              if (hasDetail) {
                return (
                  <Link key={action.label} href={`/kendaraan/${item.vehicleId}`} className={className}>
                    {action.label}
                    {action.icon && <img src={action.icon} alt="" className="h-[11px] w-[11px]" />}
                  </Link>
                );
              }
              return (
                <button
                  key={action.label}
                  type="button"
                  disabled
                  title={`Halaman detail belum dibuat untuk unit ${item.vehicleId}`}
                  className={`${className} cursor-not-allowed opacity-50`}
                >
                  {action.label}
                  {action.icon && <img src={action.icon} alt="" className="h-[11px] w-[11px]" />}
                </button>
              );
            }
            if (action.kind === "markRead") {
              return (
                <button
                  key={action.label}
                  type="button"
                  disabled={item.read}
                  onClick={() => onMarkRead(item.id)}
                  className={`flex items-center justify-center gap-1.5 rounded px-3 py-2 text-xs font-bold ${
                    item.read ? "cursor-default bg-[#f2f4f6] text-[#94a3b8]" : "bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e6e8ea]"
                  }`}
                >
                  {action.icon && <img src={action.icon} alt="" className="size-2.5" />}
                  {item.read ? "Sudah Ditandai" : action.label}
                </button>
              );
            }
            return (
              <button
                key={action.label}
                type="button"
                className="flex items-center justify-center gap-1.5 rounded bg-[#f2f4f6] px-3 py-2 text-xs font-bold text-[#191c1e] hover:bg-[#e6e8ea]"
              >
                {action.icon && <img src={action.icon} alt="" className="size-3" />}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
