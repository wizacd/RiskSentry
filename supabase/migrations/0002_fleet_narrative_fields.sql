-- Fleet narrative fields — supaya Dashboard & Anomali (redesain Figma) bisa
-- baca cerita per unit (temuan legalitas, checklist fisik, kategori armada)
-- dari data asli, bukan mock. Kolom skor/status/trend/lisensi operator tetap
-- dihitung dari data yang sudah ada (risk_score, status, telemetry_logs,
-- drivers.sim_expiry) — bukan didobelin di sini.

alter table vehicles add column if not exists unit_code text;
alter table vehicles add column if not exists sub_code text;
alter table vehicles add column if not exists category text check (category in ('alat_berat', 'darat'));
alter table vehicles add column if not exists unit_type text;
alter table vehicles add column if not exists legalitas_title text;
alter table vehicles add column if not exists legalitas_lines text[];
alter table vehicles add column if not exists checklist_title text;
alter table vehicles add column if not exists checklist_note text;

comment on column vehicles.unit_code is 'Kode unit tampilan (mis. DT-042), beda dari plate_number.';
comment on column vehicles.category is 'alat_berat (tambang) atau darat (jalan raya) — dipakai filter kategori Dashboard.';
comment on column vehicles.legalitas_lines is 'Baris detail temuan legalitas (SIA, KIR, dst), ditampilkan apa adanya di kartu unit.';
