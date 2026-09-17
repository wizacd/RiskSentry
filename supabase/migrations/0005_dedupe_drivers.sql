-- Bersihkan driver duplikat (seed.ts sebelumnya INSERT polos, jadi tiap
-- `npm run seed` numpuk baris baru per kendaraan) + cegah kejadian lagi
-- dengan unique constraint di sim_number (seed.ts sekarang upsert ke sini).

delete from drivers a
using drivers b
where a.vehicle_id = b.vehicle_id
  and a.vehicle_id is not null
  and a.created_at < b.created_at;

alter table drivers add constraint drivers_sim_number_key unique (sim_number);
