import { createClient } from "@supabase/supabase-js";

// Dipakai HANYA di API routes / server components / scripts (punya akses service role,
// bypass RLS). Jangan pernah import file ini dari komponen client.
export function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
