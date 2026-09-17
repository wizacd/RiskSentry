import "dotenv/config";
import { supabaseServer } from "../src/lib/supabase/server";

async function main() {
  const supabase = supabaseServer();
  const email = "asesor.k3@sucofindo.co.id";
  const password = "demo-token-2024";

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: "Asesor K3 Utama (Demo)", role: "asesor" },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already been registered") || error.status === 422) {
      console.log(`User ${email} sudah ada, tidak perlu dibuat ulang.`);
      return;
    }
    throw error;
  }

  console.log(`Demo user dibuat: ${data.user?.email} (id: ${data.user?.id})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
