-- SIGAP core schema
-- Disepakati bertiga sebelum build paralel (lihat docs/API_CONTRACT.md).
-- Jalankan lewat Supabase SQL editor atau `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Kendaraan (armada yang dipantau)
-- ---------------------------------------------------------------------------
create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  plate_number text not null unique,
  fleet_type text not null check (fleet_type in ('logistik', 'bus_penumpang')),
  client_name text not null,
  kir_expiry date,
  stnk_expiry date,
  status text not null default 'aman' check (status in ('aman', 'waspada', 'bahaya')),
  risk_score numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Driver (subjek yang dipantau, bukan pengguna aplikasi)
-- ---------------------------------------------------------------------------
create table if not exists drivers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  sim_number text not null,
  sim_expiry date not null,
  vehicle_id uuid references vehicles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Riwayat P2H (checklist pra-operasional, dimiliki Person 1)
-- ---------------------------------------------------------------------------
create table if not exists p2h_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  driver_id uuid not null references drivers(id) on delete cascade,
  sim_valid boolean not null,
  unit_valid boolean not null,
  checklist jsonb not null, -- { rem, ban, lampu, klakson, kelengkapan_keselamatan: boolean }
  final_status text not null check (final_status in ('hijau', 'kuning', 'merah')),
  notes text,
  submitted_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Work Order (tiket otomatis dari status Kuning, dimiliki Person 1)
-- ---------------------------------------------------------------------------
create table if not exists work_orders (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  p2h_record_id uuid references p2h_records(id) on delete set null,
  problem_component text not null,
  ticket_status text not null default 'terbuka' check (ticket_status in ('terbuka', 'diproses', 'selesai')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Log Anomali / Telemetri (mesin skor risiko real-time, dimiliki Person 2)
-- ---------------------------------------------------------------------------
create table if not exists telemetry_logs (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  speed_kmh numeric not null,
  hard_braking_count integer not null default 0,
  weather text not null default 'cerah' check (weather in ('cerah', 'hujan', 'kabut')),
  continuous_driving_minutes integer not null default 0,
  odol_indicator boolean not null default false,
  likelihood integer not null check (likelihood between 1 and 5),
  severity integer not null check (severity between 1 and 5),
  risk_score numeric not null,
  status text not null check (status in ('aman', 'waspada', 'bahaya')),
  recorded_at timestamptz not null default now()
);

create index if not exists idx_telemetry_vehicle_time on telemetry_logs (vehicle_id, recorded_at desc);

-- ---------------------------------------------------------------------------
-- Notifikasi (dipicu saat status naik ke Bahaya)
-- ---------------------------------------------------------------------------
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  severity text not null check (severity in ('waspada', 'bahaya')),
  message text not null,
  recommended_action text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Threshold Config (ambang batas skor per jenis armada, diatur Asesor)
-- ---------------------------------------------------------------------------
create table if not exists threshold_configs (
  id uuid primary key default gen_random_uuid(),
  fleet_type text not null unique check (fleet_type in ('logistik', 'bus_penumpang')),
  waspada_threshold numeric not null default 40,
  bahaya_threshold numeric not null default 70,
  updated_at timestamptz not null default now()
);

insert into threshold_configs (fleet_type, waspada_threshold, bahaya_threshold)
values ('logistik', 40, 70), ('bus_penumpang', 35, 65)
on conflict (fleet_type) do nothing;

-- ---------------------------------------------------------------------------
-- Realtime: aktifkan supaya Dashboard (Person 2) bisa subscribe tanpa polling
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table vehicles;
alter publication supabase_realtime add table telemetry_logs;
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table work_orders;

-- Catatan RLS: untuk kecepatan hackathon, policy dibuat permisif (mock auth).
-- JANGAN dipakai apa adanya di production.
alter table vehicles enable row level security;
alter table drivers enable row level security;
alter table p2h_records enable row level security;
alter table work_orders enable row level security;
alter table telemetry_logs enable row level security;
alter table notifications enable row level security;
alter table threshold_configs enable row level security;

create policy "allow all (hackathon demo)" on vehicles for all using (true) with check (true);
create policy "allow all (hackathon demo)" on drivers for all using (true) with check (true);
create policy "allow all (hackathon demo)" on p2h_records for all using (true) with check (true);
create policy "allow all (hackathon demo)" on work_orders for all using (true) with check (true);
create policy "allow all (hackathon demo)" on telemetry_logs for all using (true) with check (true);
create policy "allow all (hackathon demo)" on notifications for all using (true) with check (true);
create policy "allow all (hackathon demo)" on threshold_configs for all using (true) with check (true);
