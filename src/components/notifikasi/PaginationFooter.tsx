export default function PaginationFooter({ shown, total }: { shown: number; total: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white p-3 shadow-sm">
      <p className="text-xs text-[#45464d]">
        Menampilkan <span className="font-bold text-[#191c1e]">{shown}</span> dari{" "}
        <span className="font-bold text-[#191c1e]">{total}</span> log rekaman kepatuhan
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled
          title="Data contoh (mock) hanya mencakup halaman 1"
          className="cursor-not-allowed rounded-sm bg-[#f2f4f6] px-3 py-1.5 text-[11px] font-bold text-[#c6c6cd]"
        >
          Sebelumnya
        </button>
        <button type="button" aria-current="page" className="flex size-8 items-center justify-center rounded-sm bg-black text-[11px] font-bold text-white">
          1
        </button>
        <button
          type="button"
          disabled
          title="Data contoh (mock) hanya mencakup halaman 1"
          className="flex size-8 cursor-not-allowed items-center justify-center rounded-sm bg-[#f2f4f6] text-[11px] font-bold text-[#c6c6cd]"
        >
          2
        </button>
        <button
          type="button"
          disabled
          title="Data contoh (mock) hanya mencakup halaman 1"
          className="flex size-8 cursor-not-allowed items-center justify-center rounded-sm bg-[#f2f4f6] text-[11px] font-bold text-[#c6c6cd]"
        >
          3
        </button>
        <button
          type="button"
          disabled
          title="Data contoh (mock) hanya mencakup halaman 1"
          className="cursor-not-allowed rounded-sm bg-[#f2f4f6] px-3 py-1.5 text-[11px] font-bold text-[#c6c6cd]"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
