"use client";

import { FORMAT_SPECS, PRESET_ITEMS, REGULATION_STANDARD } from "./mockLaporanExport";

export default function DocumentPresetBox({
  selected,
  onToggle,
}: {
  selected: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-sm bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#191c1e]">Konfigurasi Berkas</h3>
        <img src="/laporan/settings.svg" alt="" className="size-[13.5px]" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Standar Regulasi Pengesahan</p>
        <div className="flex flex-col gap-1 rounded-sm bg-[#f2f4f6] p-2">
          <p className="text-xs font-bold text-[#191c1e]">
            {REGULATION_STANDARD.code.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="text-xs text-[#45464d]">
            {REGULATION_STANDARD.description.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#45464d]">Lampiran Yang Disertakan</p>
        {PRESET_ITEMS.map((item) => (
          <label key={item.id} className="flex cursor-pointer gap-2 rounded-sm bg-[#f7f9fb] p-2 hover:bg-[#f2f4f6]">
            <input
              type="checkbox"
              checked={selected[item.id] ?? true}
              onChange={() => onToggle(item.id)}
              className="mt-1 size-[13px] accent-[#0075ff]"
            />
            <span className="flex flex-col">
              <span className="text-xs font-semibold tracking-wide text-[#191c1e]">{item.title}</span>
              <span className="text-xs text-[#45464d]">{item.description}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-1 pt-1">
        {FORMAT_SPECS.map((spec) => (
          <div key={spec.label} className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wide text-[#45464d]">{spec.label}</span>
            <span className="text-[11px] font-bold tracking-wide text-[#191c1e]">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
