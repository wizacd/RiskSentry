-- Ganti taksonomi fleet_type 2 nilai (logistik/bus_penumpang) jadi 5 kategori
-- asli sesuai Pengaturan Threshold (Figma): bus, dumptruck, lv, excavator,
-- tanker. Dipakai vehicles.fleet_type & threshold_configs.fleet_type supaya
-- kelima tab kategori di halaman Pengaturan beneran baca/tulis skor asli.

-- 1) Drop dulu CHECK constraint lama SEBELUM data diubah/dihapus.
alter table vehicles drop constraint if exists vehicles_fleet_type_check;
alter table threshold_configs drop constraint if exists threshold_configs_fleet_type_check;

-- 2) Migrasi/bersihkan data lama SEBELUM constraint baru dipasang — constraint
--    baru divalidasi ke semua baris yang ADA saat itu, jadi baris lama yang
--    belum sesuai harus sudah diubah/dihapus dulu.
update vehicles set fleet_type = 'dumptruck' where fleet_type = 'logistik';
update vehicles set fleet_type = 'bus' where fleet_type = 'bus_penumpang';
delete from threshold_configs;

-- 3) Baru pasang CHECK constraint baru.
alter table vehicles add constraint vehicles_fleet_type_check
  check (fleet_type in ('bus', 'dumptruck', 'lv', 'excavator', 'tanker'));
alter table threshold_configs add constraint threshold_configs_fleet_type_check
  check (fleet_type in ('bus', 'dumptruck', 'lv', 'excavator', 'tanker'));

-- 4) Isi ulang threshold_configs dengan 5 kategori baru.
insert into threshold_configs (fleet_type, waspada_threshold, bahaya_threshold) values
  ('bus', 30, 65),
  ('dumptruck', 35, 75),
  ('lv', 40, 70),
  ('excavator', 35, 70),
  ('tanker', 25, 60)
on conflict (fleet_type) do update set
  waspada_threshold = excluded.waspada_threshold,
  bahaya_threshold = excluded.bahaya_threshold;
