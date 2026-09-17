// Seed data minimal untuk demo — jalankan dengan `npm run seed` setelah
// migration 0001_init.sql dieksekusi dan .env berisi SUPABASE_SERVICE_ROLE_KEY.
import "dotenv/config";
import { supabaseServer } from "../src/lib/supabase/server";

async function main() {
  const supabase = supabaseServer();

  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .insert([
      { plate_number: "B 1234 SIG", fleet_type: "logistik", client_name: "PT Logistik Nusantara" },
      { plate_number: "B 5678 SIG", fleet_type: "bus_penumpang", client_name: "PO Trans Jaya" },
      { plate_number: "B 9012 SIG", fleet_type: "logistik", client_name: "PT Logistik Nusantara" },
    ])
    .select();

  if (error) throw error;

  const driverRows = vehicles.map((v, i) => ({
    full_name: `Driver ${i + 1}`,
    sim_number: `SIM-${1000 + i}`,
    sim_expiry: "2027-01-01",
    vehicle_id: v.id,
  }));

  const { error: driverError } = await supabase.from("drivers").insert(driverRows);
  if (driverError) throw driverError;

  console.log(`Seeded ${vehicles.length} kendaraan + ${driverRows.length} driver.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
