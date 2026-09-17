"use client";

import Link from "next/link";
import type { AnomalyItem } from "./anomaliTypes";

const SEVERITY_STYLES = {
  bahaya: {
    stripe: "bg-[#ba1a1a]",
    tagBg: "bg-[#ffdad6]",
    tagText: "text-[#93000a]",
    scoreText: "text-[#ba1a1a]",
    primaryBtn: "bg-[#ba1a1a] hover:bg-[#93000a]",
    highlight: "text-[#ba1a1a]",
  },
  waspada: {
    stripe: "bg-[#d5e0f8]",
    tagBg: "bg-[#d5e0f8]",
    tagText: "text-[#586377]",
    scoreText: "text-[#586377]",
    primaryBtn: "bg-[#131b2e] hover:bg-[#1f2a44]",
    highlight: "text-[#586377]",
  },
};

export default function AnomalyCard({
  item,
  acknowledged,
  onAcknowledge,
}: {
  item: AnomalyItem;
  acknowledged: boolean;
  onAcknowledge: () => void;
}) {
  const s = SEVERITY_STYLES[item.severity];

  return (
    <article className="relative flex items-start justify-between overflow-hidden rounded bg-white p-3 pl-5 shadow-sm">
      <div className={`absolute inset-y-0 left-0 w-2 ${s.stripe}`} />
      <div className="flex min-w-0 flex-1 flex-col gap-1 pl-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`flex items-center gap-1 rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wide ${s.tagBg} ${s.tagText}`}>
            <img src={item.tagIcon} alt="" className="size-3" />
            {item.tagLabel}
          </span>
          <span className="rounded-sm bg-[#e6e8ea] px-1 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#45464d]">
            {item.sourceTag}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[13px] text-[#45464d]">
          <img src="/anomali/location-pin-small.svg" alt="" className="h-[11.7px] w-[9.3px]" />
          {item.location}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xl font-bold tracking-tight text-[#191c1e]">{item.vehicleCode}</span>
          <span className="text-sm font-semibold text-[#45464d]">{item.vehicleModel}</span>
          <span className="rounded-sm bg-[#f2f4f6] px-1.5 py-0.5 text-[13px] text-[#45464d]">Plat: {item.plate}</span>
          <span className="text-[11px] font-bold text-[#45464d]">
            {item.contextLabel}: <span className="font-bold">{item.contextValue}</span>
          </span>
        </div>

        <div className="mt-1 flex flex-col gap-2 rounded-sm bg-[#f2f4f6] p-2">
          <div className="flex gap-2">
            <img src={item.problemIcon} alt="" className="mt-0.5 size-4 shrink-0" />
            <p className="text-sm text-[#191c1e]">
              {item.descLine1.map((seg, i) => (
                <span key={i} className={seg.bold ? "font-bold" : "font-normal"}>
                  {seg.text}
                </span>
              ))}
              <br />
              <span className="font-normal">{item.descLine2}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pl-6 text-[11px] font-bold text-[#45464d]">
            {item.metaParts.map((part, i) => (
              <span key={i} className={i === item.metaHighlightIndex ? s.highlight : undefined}>
                {i > 0 && <span className="mr-2 text-[#45464d]">•</span>}
                {part}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-[220px] shrink-0 flex-col items-end gap-2 pl-4">
        <div className="flex items-baseline gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Skor Risiko K3</span>
          <span className={`text-[28px] font-bold tracking-tight ${s.scoreText}`}>{item.riskScore}</span>
          <span className="text-[11px] font-bold text-[#45464d]">/ 100</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={onAcknowledge}
            disabled={acknowledged}
            className={`flex items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-[11px] font-bold tracking-wide text-white disabled:cursor-default disabled:bg-[#059669] ${s.primaryBtn}`}
          >
            {!acknowledged && <img src={item.primaryActionIcon} alt="" className="size-3" />}
            {acknowledged ? `✓ ${item.primaryActionDoneLabel}` : item.primaryActionLabel}
          </button>
          {item.hasDetailPage ? (
            <Link
              href={`/kendaraan/${item.vehicleCode}`}
              className="flex items-center justify-center gap-1 rounded-sm bg-[#f2f4f6] px-3 py-1.5 text-center text-[11px] font-bold tracking-wide text-[#191c1e] hover:bg-[#e6e8ea]"
            >
              {item.secondaryActionLabel}
              <img src="/anomali/link-arrow.svg" alt="" className="size-2.5" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title="Detail unit ini belum tersedia pada versi demo."
              className="flex items-center justify-center gap-1 rounded-sm bg-[#f2f4f6] px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#191c1e] opacity-50 disabled:cursor-not-allowed"
            >
              {item.secondaryActionLabel}
              <img src="/anomali/link-arrow.svg" alt="" className="size-2.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
