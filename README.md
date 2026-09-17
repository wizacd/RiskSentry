# SIGAP — Hackathon UI 2026

Sistem Informasi Gawat & Antisipasi Pengemudi — alat bantu asesmen risiko K3
transportasi darat untuk PT Sucofindo & IDSurvey. Lihat pembagian tugas tim di
`docs/API_CONTRACT.md` dan skenario lengkap di dokumen "SIGAP - Skenario
Website & Pembagian Tugas Tim" yang dibagikan tim.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres +
realtime + Auth).

## Setup

1. Buat project di [supabase.com](https://supabase.com), copy `.env.example`
   ke `.env` dan isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY` dari Project Settings > API.
2. Jalankan `supabase/migrations/0001_init.sql` lewat Supabase SQL editor
   (atau `supabase db push` kalau pakai Supabase CLI).
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Opsional) Seed data demo (3 kendaraan + driver):
   ```bash
   npm run seed
   ```
5. Jalankan dev server:
   ```bash
   npm run dev
   ```
   Buka http://localhost:3000 — akan redirect ke `/login`.

## Struktur Project

```
src/
  app/                     # halaman & API routes (App Router)
    login/, dashboard/, kendaraan/[id]/, anomali/, notifikasi/,
    pengaturan/threshold/, p2h/, p2h/hasil/, work-order/,
    compliance-passport/[id]/, laporan/export/, demo-simulator/
    api/p2h/submit/, api/simulator/trigger/, api/health-index/[vehicleId]/
  lib/
    supabase/              # client (browser) & server (service role) client
    scoring/                # scoring engine (Likelihood x Severity, HIRARC)
    simulator/              # data generator 3 skenario demo
    health/                  # Health Index Score (Compliance Passport)
    auth/                    # mock auth (cukup untuk hackathon)
  types/database.ts         # kontrak tipe data bersama — mirror skema SQL
supabase/migrations/        # schema database (source of truth)
docs/API_CONTRACT.md        # kontrak endpoint & tabel untuk kerja paralel
scripts/seed.ts             # seed data demo
```

Setiap halaman punya komentar `TODO(Person X, Figma): ...` menandai bagian yang
perlu diganti dengan desain Figma final — wiring data & API-nya sudah jalan,
tinggal poles UI.

## Pembagian Kerja

Ringkas dari dokumen skenario (lihat `docs/API_CONTRACT.md` untuk detail
kepemilikan tabel & endpoint):

- **Person 1** — P2H Digital & Design System (`/p2h`, `/p2h/hasil`, `/work-order`)
- **Person 2** — Telematika Real-Time & Dashboard (`/dashboard`, `/kendaraan/:id`, `/anomali`, `/notifikasi`, `/pengaturan/threshold`)
- **Person 3** — Compliance Passport, Data Generator, Auth & Infra (`/compliance-passport/:id`, `/laporan/export`, `/demo-simulator`, `/login`, seluruh backend)
