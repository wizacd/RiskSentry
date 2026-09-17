// Seed data — armada mining/darat dengan narasi lengkap (temuan legalitas,
// checklist fisik) yang dipakai Dashboard & Anomali versi Figma. Skor risiko &
// status TIDAK di-hardcode — dihitung asli lewat assessRisk() dari sample
// telemetri per unit (formula weighted sesuai spec data-pendukung-hackathon),
// supaya konsisten dengan /api/simulator/trigger. Jalankan `npm run seed`
// setelah semua migration di supabase/migrations dieksekusi berurutan.
import "dotenv/config";
import { supabaseServer } from "../src/lib/supabase/server";
import { assessRisk, DEFAULT_THRESHOLDS, recommendedAction, type AlatBeratSample, type DaratSample } from "../src/lib/scoring/scoringEngine";
import type { FleetCategory, FleetType } from "../src/types/database";

function daysFromNow(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString();
}

interface FleetSeed {
  unitCode: string;
  subCode: string;
  category: FleetCategory;
  unitType: string;
  fleetType: FleetType;
  clientName: string;
  kirExpiryOffsetDays: number;
  legalitasTitle: string;
  legalitasLines: string[];
  checklistTitle: string;
  checklistNote: string;
  operatorName: string;
  simExpiryOffsetDays: number;
  // sample telemetri dari lama -> baru; entri terakhir jadi status/risk_score kendaraan.
  telemetrySeries: (DaratSample | AlatBeratSample)[];
}

const FLEET_SEED: FleetSeed[] = [
  {
    unitCode: "DT-042",
    subCode: "PML-042",
    category: "alat_berat",
    unitType: "Dump Truck",
    fleetType: "dumptruck",
    clientName: "PT Antam SBU Nikel • HD 91T",
    kirExpiryOffsetDays: -12,
    legalitasTitle: "SIA KEMENAKER HABIS",
    legalitasLines: ["Masa Uji Alat Habis 12 Hari", "Izin Masuk Pit Dibekukan"],
    checklistTitle: "BOCOR OLI HOIST SILINDER • BRAKE ACCUMULATOR 4.1 BAR",
    checklistNote: "Tekanan rem darurat di bawah ambang aman.",
    operatorName: "Ahmad Dahlan",
    simExpiryOffsetDays: -20,
    telemetrySeries: [
      { category: "alat_berat", continuousDrivingMinutes: 90, kemiringanArea: 3, bebanAngkatPercent: 70, getaranLevel: "normal", suhuKomponen: 55, operatorDocValid: true, unitDocValid: true },
      { category: "alat_berat", continuousDrivingMinutes: 200, kemiringanArea: 10, bebanAngkatPercent: 95, getaranLevel: "sedang", suhuKomponen: 80, operatorDocValid: true, unitDocValid: true },
      { category: "alat_berat", continuousDrivingMinutes: 300, kemiringanArea: 20, bebanAngkatPercent: 125, getaranLevel: "tinggi", suhuKomponen: 95, operatorDocValid: true, unitDocValid: true },
    ],
  },
  {
    unitCode: "TRK-108",
    subCode: "B 9421 UEK",
    category: "darat",
    unitType: "Truk Tronton",
    fleetType: "dumptruck",
    clientName: "PT Sinar Logistik Nusantara",
    kirExpiryOffsetDays: -5,
    legalitasTitle: "KIR KEMENHUB: KADALUARSA",
    legalitasLines: ["Mati Uji Berkala 5 Hari", "STNK Pajak Aktif"],
    checklistTitle: "REM KAKI BLONG • MINYAK REM BOCOR • LAMPU REM MATI",
    checklistNote: "Pedal rem amblas ke lantai kabin.",
    operatorName: "Ahmad Supardi",
    simExpiryOffsetDays: -12,
    telemetrySeries: [
      { category: "darat", speedKmh: 55, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 100, odolIndicator: false, muatanPercent: 80, operatorDocValid: true, unitDocValid: true },
      { category: "darat", speedKmh: 90, hardBrakingCount: 2, weather: "hujan", continuousDrivingMinutes: 200, odolIndicator: false, muatanPercent: 105, operatorDocValid: true, unitDocValid: false },
      { category: "darat", speedKmh: 110, hardBrakingCount: 3, weather: "hujan", continuousDrivingMinutes: 300, odolIndicator: false, muatanPercent: 90, operatorDocValid: true, unitDocValid: false },
    ],
  },
  {
    unitCode: "EX-008",
    subCode: "K3-EX-08",
    category: "alat_berat",
    unitType: "Excavator",
    fleetType: "excavator",
    clientName: "PT Freeport Indonesia",
    kirExpiryOffsetDays: 240,
    legalitasTitle: "SIA ESDM K3 TERVERIFIKASI",
    legalitasLines: ["Uji Kelayakan Rig & Boom Sah", "Area Grasberg Pit Open"],
    checklistTitle: "SUHU ENGINE 98°C • TRACK SHOE KIRI AUS 75%",
    checklistNote: "Perlu pengencangan & inspeksi ulang track shoe.",
    operatorName: "Bambang Hendarto",
    simExpiryOffsetDays: 440,
    telemetrySeries: [
      { category: "alat_berat", continuousDrivingMinutes: 60, kemiringanArea: 2, bebanAngkatPercent: 60, getaranLevel: "normal", suhuKomponen: 45, operatorDocValid: true, unitDocValid: true },
      { category: "alat_berat", continuousDrivingMinutes: 180, kemiringanArea: 8, bebanAngkatPercent: 90, getaranLevel: "sedang", suhuKomponen: 85, operatorDocValid: true, unitDocValid: true },
      { category: "alat_berat", continuousDrivingMinutes: 150, kemiringanArea: 8, bebanAngkatPercent: 90, getaranLevel: "sedang", suhuKomponen: 98, operatorDocValid: true, unitDocValid: true },
    ],
  },
  {
    unitCode: "BUS-024",
    subCode: "B 7812 TGA",
    category: "darat",
    unitType: "Bus AKAP",
    fleetType: "bus",
    clientName: "PO Harapan Prima • AKAP",
    kirExpiryOffsetDays: 300,
    legalitasTitle: "KIR BLUE AKTIF",
    legalitasLines: ["STNK & Izin Trayek AKAP Sah", "Asuransi Jasa Raharja Ada"],
    checklistTitle: "BAN DEPAN KANAN 1.8MM • KLAKSON ANGIN MACET",
    checklistNote: "Wiper kiri bergetar saat kecepatan tinggi.",
    operatorName: "Hendra Setiawan",
    simExpiryOffsetDays: 420,
    telemetrySeries: [
      { category: "darat", speedKmh: 55, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 90, odolIndicator: false, muatanPercent: 85, operatorDocValid: true, unitDocValid: true },
      { category: "darat", speedKmh: 78, hardBrakingCount: 1, weather: "hujan", continuousDrivingMinutes: 150, odolIndicator: false, muatanPercent: 98, operatorDocValid: true, unitDocValid: true },
      { category: "darat", speedKmh: 85, hardBrakingCount: 1, weather: "hujan", continuousDrivingMinutes: 150, odolIndicator: false, muatanPercent: 95, operatorDocValid: true, unitDocValid: true },
    ],
  },
  {
    unitCode: "WT-015",
    subCode: "WT-015-SCF",
    category: "alat_berat",
    unitType: "Water Truck",
    fleetType: "tanker",
    clientName: "PT Vale Indonesia Tbk",
    kirExpiryOffsetDays: 400,
    legalitasTitle: "SIA & KALIBRASI TANGKI SAH",
    legalitasLines: ["Sertifikat Uji Hydrostatic Terbit", "Masa Berlaku s/d Des 2025"],
    checklistTitle: "POMPA SPRAY NORMAL • RETARDER PRIMA • APAR 100%",
    checklistNote: "Sistem kemudi ganda berfungsi normal.",
    operatorName: "Dani Prasetyo",
    simExpiryOffsetDays: 600,
    telemetrySeries: [
      { category: "alat_berat", continuousDrivingMinutes: 70, kemiringanArea: 2, bebanAngkatPercent: 65, getaranLevel: "normal", suhuKomponen: 50, operatorDocValid: true, unitDocValid: true },
      { category: "alat_berat", continuousDrivingMinutes: 75, kemiringanArea: 3, bebanAngkatPercent: 68, getaranLevel: "normal", suhuKomponen: 52, operatorDocValid: true, unitDocValid: true },
      { category: "alat_berat", continuousDrivingMinutes: 80, kemiringanArea: 3, bebanAngkatPercent: 70, getaranLevel: "normal", suhuKomponen: 55, operatorDocValid: true, unitDocValid: true },
    ],
  },
  {
    unitCode: "BUS-089",
    subCode: "B 7123 PQA",
    category: "darat",
    unitType: "Bus AKAP",
    fleetType: "bus",
    clientName: "PO Bintang Pantura Express",
    kirExpiryOffsetDays: 350,
    legalitasTitle: "KIR ELEKTRONIK BLUE SAH",
    legalitasLines: ["Bukti Lulus Uji Elektronik Dishub", "Izin Trayek Antar Provinsi Sah"],
    checklistTitle: "CHECKLIST RAMPCHECK SEMPURNA (12/12 LOLOS)",
    checklistNote: "Rem angin, palu pemecah kaca, & APAR lengkap.",
    operatorName: "Markus Wibowo",
    simExpiryOffsetDays: 500,
    telemetrySeries: [
      { category: "darat", speedKmh: 50, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 90, odolIndicator: false, muatanPercent: 85, operatorDocValid: true, unitDocValid: true },
      { category: "darat", speedKmh: 52, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 95, odolIndicator: false, muatanPercent: 88, operatorDocValid: true, unitDocValid: true },
      { category: "darat", speedKmh: 55, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 100, odolIndicator: false, muatanPercent: 90, operatorDocValid: true, unitDocValid: true },
    ],
  },
];

async function main() {
  const supabase = supabaseServer();

  for (const [index, unit] of FLEET_SEED.entries()) {
    const thresholds = DEFAULT_THRESHOLDS[unit.fleetType];
    const assessments = unit.telemetrySeries.map((sample) => assessRisk(sample, thresholds));
    const latest = assessments[assessments.length - 1];

    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .upsert(
        {
          plate_number: unit.subCode,
          fleet_type: unit.fleetType,
          client_name: unit.clientName,
          kir_expiry: daysFromNow(unit.kirExpiryOffsetDays).slice(0, 10),
          stnk_expiry: daysFromNow(unit.kirExpiryOffsetDays + 30).slice(0, 10),
          status: latest.status,
          risk_score: latest.riskScore,
          unit_code: unit.unitCode,
          sub_code: unit.subCode,
          category: unit.category,
          unit_type: unit.unitType,
          legalitas_title: unit.legalitasTitle,
          legalitas_lines: unit.legalitasLines,
          checklist_title: unit.checklistTitle,
          checklist_note: unit.checklistNote,
        },
        { onConflict: "plate_number" }
      )
      .select()
      .single();

    if (vehicleError || !vehicle) {
      throw vehicleError ?? new Error(`Gagal upsert ${unit.unitCode}`);
    }

    await supabase.from("drivers").upsert(
      {
        full_name: unit.operatorName,
        sim_number: `SIM-${unit.unitCode}`,
        sim_expiry: daysFromNow(unit.simExpiryOffsetDays).slice(0, 10),
        vehicle_id: vehicle.id,
      },
      { onConflict: "sim_number" }
    );

    // Reset riwayat lama vehicle ini biar seed idempotent (re-run gak numpuk duplikat).
    await supabase.from("telemetry_logs").delete().eq("vehicle_id", vehicle.id);
    await supabase.from("notifications").delete().eq("vehicle_id", vehicle.id);

    const telemetryRows = unit.telemetrySeries.map((sample, i) => {
      const assessment = assessments[i];
      const daysAgo = (unit.telemetrySeries.length - 1 - i) * 3;
      const isDarat = sample.category === "darat";
      return {
        vehicle_id: vehicle.id,
        speed_kmh: isDarat ? (sample as DaratSample).speedKmh : 0,
        hard_braking_count: isDarat ? (sample as DaratSample).hardBrakingCount : 0,
        weather: isDarat ? (sample as DaratSample).weather : "cerah",
        continuous_driving_minutes: sample.continuousDrivingMinutes,
        odol_indicator: isDarat ? (sample as DaratSample).odolIndicator : false,
        persen_muatan: isDarat ? (sample as DaratSample).muatanPercent : null,
        kemiringan_area: !isDarat ? (sample as AlatBeratSample).kemiringanArea : null,
        beban_angkat_persen: !isDarat ? (sample as AlatBeratSample).bebanAngkatPercent : null,
        getaran_level: !isDarat ? (sample as AlatBeratSample).getaranLevel : null,
        suhu_komponen: !isDarat ? (sample as AlatBeratSample).suhuKomponen : null,
        likelihood: assessment.likelihood,
        severity: assessment.severity,
        risk_score: assessment.riskScore,
        status: assessment.status,
        recorded_at: daysFromNow(-daysAgo),
      };
    });

    await supabase.from("telemetry_logs").insert(telemetryRows);

    if (latest.status !== "aman") {
      await supabase.from("notifications").insert({
        vehicle_id: vehicle.id,
        severity: latest.status,
        message: `${unit.legalitasTitle} — ${unit.checklistTitle}`,
        recommended_action: recommendedAction(latest.status),
      });
    }

    console.log(`[${index + 1}/${FLEET_SEED.length}] ${unit.unitCode} seeded — status ${latest.status}, skor ${latest.riskScore}.`);
  }

  console.log("Seed armada mining/darat selesai.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
