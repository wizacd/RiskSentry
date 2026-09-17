"use client";

export default function TopActionHeader({ onReset, onSave, saved }: { onReset: () => void; onSave: () => void; saved: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded bg-white p-5 shadow-sm">
      <div className="max-w-xl">
        <h1 className="text-2xl font-bold tracking-tight text-[#191c1e]">Konfigurasi Ambang Batas Skor Risiko &amp; Sensitivitas Armada</h1>
        <p className="text-sm text-[#45464d]">
          Sesuaikan batas toleransi skor risiko K3 (Aman, Waspada, Bahaya/Grounded) berdasarkan profil risiko jenis armada sesuai standar Kepmen ESDM
          dan kebijakan audit keselamatan terpadu Sucofindo.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="flex items-center justify-end gap-1.5 text-[11px] font-bold text-[#191c1e]">
            <img src="/pengaturan/version-badge.svg" alt="" className="size-3" />
            Versi Aktif: v2.4-PROD
          </p>
          <p className="text-xs text-[#45464d]">Update: 28 Agustus 2026 • H. Gunawan, S.T.</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-sm bg-[#f2f4f6] px-3 py-2 text-xs font-semibold text-[#191c1e] hover:bg-[#e6e8ea]"
        >
          <img src="/pengaturan/reset.svg" alt="" className="size-3" />
          Reset
        </button>
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 rounded-sm bg-[#131b2e] px-5 py-2 text-xs font-semibold text-white shadow-sm"
        >
          <img src="/pengaturan/save.svg" alt="" className="size-3 invert" />
          {saved ? "✓ Tersimpan" : "Simpan Perubahan Threshold"}
        </button>
      </div>
    </div>
  );
}
