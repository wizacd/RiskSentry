-- Selaraskan backend dengan spec data-pendukung-hackathon:
-- 1) telemetry_logs perlu field sensor KHUSUS alat berat (kemiringan, beban
--    angkat, getaran, suhu komponen) — sebelumnya cuma ada field kendaraan
--    darat, jadi alat berat (excavator/dumptruck/tanker) dinilai pakai sensor
--    yang gak relevan. Juga tambah persen_muatan buat formula kendaraan darat.
-- 2) p2h_records perlu surat_jalan_id (buat di-generate jadi QR di frontend
--    saat status Hijau) dan work_orders perlu deadline_hours (SLA 24 jam
--    sesuai spec P2H Pass III).
-- Threshold klasifikasi (aman/waspada/bahaya) TETAP pakai sistem configurable
-- per-kategori yang sudah ada (threshold_configs), bukan angka fix 40/70 dari
-- spec — supaya halaman Pengaturan Threshold yang sudah dibangun tetap valid.

alter table telemetry_logs add column if not exists kemiringan_area numeric;
alter table telemetry_logs add column if not exists beban_angkat_persen numeric;
alter table telemetry_logs add column if not exists getaran_level text check (getaran_level in ('normal', 'sedang', 'tinggi'));
alter table telemetry_logs add column if not exists suhu_komponen numeric;
alter table telemetry_logs add column if not exists persen_muatan numeric;

alter table p2h_records add column if not exists surat_jalan_id text;
alter table work_orders add column if not exists deadline_hours integer;

comment on column telemetry_logs.kemiringan_area is 'Derajat kemiringan area operasi — dipakai formula skor alat_berat, null untuk kendaraan_darat.';
comment on column telemetry_logs.persen_muatan is 'Persentase muatan vs kapasitas nominal — dipakai formula skor kendaraan_darat, null untuk alat_berat.';
comment on column p2h_records.surat_jalan_id is 'ID surat jalan (format SJ-XXXXXX) diterbitkan saat P2H status Hijau, untuk digenerate jadi QR di frontend.';
comment on column work_orders.deadline_hours is 'SLA penyelesaian tiket dalam jam, mis. 24 untuk temuan minor P2H.';
