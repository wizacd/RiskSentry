"use client";

import { createClient } from "@supabase/supabase-js";

// Dipakai di komponen client (dashboard, form P2H, dsb). Pakai anon key —
// aman diexpose ke browser karena akses row-level dibatasi RLS policy.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
