# SIGAP — Kontrak Data & API

Referensi bersama untuk 3 orang tim. Kalau ada perubahan skema/endpoint, update
dokumen ini + `supabase/migrations/` + `src/types/database.ts` dalam PR yang sama,
supaya tidak ada yang kerja berdasarkan kontrak basi.

## Skema Data

Lihat `supabase/migrations/0001_init.sql` (definisi tabel) dan
`src/types/database.ts` (tipe TypeScript, wajib dipakai di komponen — jangan
duplikat tipe manual).

| Tabel | Dimiliki | Dipakai oleh |
|---|---|---|
| `vehicles` | Person 3 (skema) | Person 1, 2, 3 |
| `drivers` | Person 3 (skema) | Person 1 |
| `p2h_records` | Person 1 | Person 2 (dashboard), Person 3 (health index) |
| `work_orders` | Person 1 | Person 1 (`/work-order`) |
| `telemetry_logs` | Person 2 (scoring), Person 3 (generator) | Person 2 |
| `notifications` | Person 2 | Person 2 |
| `threshold_configs` | Person 2 | Person 2 |

## Koneksi ke Frontend

- **Baca data / realtime** → langsung dari komponen client pakai
  `src/lib/supabase/client.ts` (`supabaseBrowser`). Contoh: `dashboard/page.tsx`.
- **Tulis data dengan efek samping** (validasi, trigger notifikasi, dsb.) → lewat
  API routes di `src/app/api/**`, JANGAN insert langsung dari client supaya
  logikanya satu tempat.

## API Routes

### `POST /api/p2h/submit`
Dipakai oleh `/p2h` (Person 1). Body:
```ts
{ vehicle_id: string; driver_id: string; sim_expiry: string; kir_expiry: string; checklist: P2HChecklist }
```
Response: `{ record: P2HRecord; final_status: "hijau" | "kuning" | "merah" }`.
Efek samping: insert `work_orders` kalau kuning, insert `notifications` + update
`vehicles.status` kalau merah.

### `POST /api/simulator/trigger`
Dipakai oleh `/demo-simulator` (Person 3). Body:
```ts
{ vehicle_ids: string[]; scenario: "normal" | "mulai_berisiko" | "bahaya" }
```
Response: `{ inserted: number; scenario: string }`.
Efek samping: insert baris `telemetry_logs`, update `vehicles.status`/`risk_score`,
insert `notifications` kalau status waspada/bahaya. Dashboard (`/dashboard`,
`/anomali`, `/notifikasi`) menangkap perubahan lewat Supabase realtime — tidak
perlu polling manual.

### `GET /api/health-index/:vehicleId`
Dipakai oleh `/compliance-passport/:id` dan `/laporan/export` (Person 3).
Response: `{ score: number; p2hComplianceRate: number; criticalAnomalyCount: number; fastTrackEligible: boolean }`.

## Realtime

Tabel `vehicles`, `telemetry_logs`, `notifications`, `work_orders` sudah
ditambahkan ke publication `supabase_realtime` di migration. Subscribe dari
client:
```ts
supabaseBrowser
  .channel("nama-channel")
  .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, (payload) => { ... })
  .subscribe();
```

## Scoring Engine (Person 2)

`src/lib/scoring/scoringEngine.ts` berisi implementasi awal (Likelihood x
Severity, prinsip HIRARC) yang sudah dipakai data generator supaya skor di DB
konsisten dengan yang ditampilkan dashboard. Person 2 silakan sesuaikan bobot
variabelnya (kecepatan, hard-braking, cuaca, dst.) — cukup ubah file ini, semua
pemanggil (data generator, API routes) otomatis ikut.
