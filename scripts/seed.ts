// Seed data — kendaraan awal (generic, demo lama) + armada mining/darat dengan
// narasi lengkap (temuan legalitas, checklist fisik) yang dipakai Dashboard &
// Anomali versi Figma. Skor risiko & status TIDAK di-hardcode — dihitung asli
// lewat assessRisk() dari sample telemetri per unit, supaya konsisten dengan
// /api/simulator/trigger. Jalankan dengan `npm run seed` setelah migration
// 0001_init.sql + 0002_fleet_narrative_fields.sql dieksekusi.
import "dotenv/config";
import { supabaseServer } from "../src/lib/supabase/server";
import { assessRisk, DEFAULT_THRESHOLDS, recommendedAction, type TelemetrySample } from "../src/lib/scoring/scoringEngine";
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
  telemetrySeries: TelemetrySample[];
}

const FLEET_SEED: FleetSeed[] = [
  {
    unitCode: "DT-042",
    subCode: "PML-042",
    category: "alat_berat",
    unitType: "Dump Truck",
    fleetType: "logistik",
    clientName: "PT Antam SBU Nikel • HD 91T",
    kirExpiryOffsetDays: -12,
    legalitasTitle: "SIA KEMENAKER HABIS",
    legalitasLines: ["Masa Uji Alat Habis 12 Hari", "Izin Masuk Pit Dibekukan"],
    checklistTitle: "BOCOR OLI HOIST SILINDER • BRAKE ACCUMULATOR 4.1 BAR",
    checklistNote: "Tekanan rem darurat di bawah ambang aman.",
    operatorName: "Ahmad Dahlan",
    simExpiryOffsetDays: -20,
    telemetrySeries: [
      { speedKmh: 62, hardBrakingCount: 1, weather: "cerah", continuousDrivingMinutes: 120, odolIndicator: false, kirValid: true },
      { speedKmh: 78, hardBrakingCount: 2, weather: "cerah", continuousDrivingMinutes: 200, odolIndicator: false, kirValid: true },
      { speedKmh: 95, hardBrakingCount: 5, weather: "hujan", continuousDrivingMinutes: 300, odolIndicator: true, kirValid: false },
    ],
  },
  {
    unitCode: "TRK-108",
    subCode: "B 9421 UEK",
    category: "darat",
    unitType: "Truk Tronton",
    fleetType: "logistik",
    clientName: "PT Sinar Logistik Nusantara",
    kirExpiryOffsetDays: -5,
    legalitasTitle: "KIR KEMENHUB: KADALUARSA",
    legalitasLines: ["Mati Uji Berkala 5 Hari", "STNK Pajak Aktif"],
    checklistTitle: "REM KAKI BLONG • MINYAK REM BOCOR • LAMPU REM MATI",
    checklistNote: "Pedal rem amblas ke lantai kabin.",
    operatorName: "Ahmad Supardi",
    simExpiryOffsetDays: -12,
    telemetrySeries: [
      { speedKmh: 70, hardBrakingCount: 1, weather: "cerah", continuousDrivingMinutes: 150, odolIndicator: false, kirValid: true },
      { speedKmh: 90, hardBrakingCount: 3, weather: "hujan", continuousDrivingMinutes: 260, odolIndicator: false, kirValid: false },
      { speedKmh: 115, hardBrakingCount: 6, weather: "kabut", continuousDrivingMinutes: 320, odolIndicator: false, kirValid: false },
    ],
  },
  {
    unitCode: "EX-008",
    subCode: "K3-EX-08",
    category: "alat_berat",
    unitType: "Excavator",
    fleetType: "logistik",
    clientName: "PT Freeport Indonesia",
    kirExpiryOffsetDays: 240,
    legalitasTitle: "SIA ESDM K3 TERVERIFIKASI",
    legalitasLines: ["Uji Kelayakan Rig & Boom Sah", "Area Grasberg Pit Open"],
    checklistTitle: "SUHU ENGINE 98°C • TRACK SHOE KIRI AUS 75%",
    checklistNote: "Perlu pengencangan & inspeksi ulang track shoe.",
    operatorName: "Bambang Hendarto",
    simExpiryOffsetDays: 440,
    telemetrySeries: [
      { speedKmh: 20, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 90, odolIndicator: false, kirValid: true },
      { speedKmh: 60, hardBrakingCount: 1, weather: "cerah", continuousDrivingMinutes: 180, odolIndicator: false, kirValid: true },
      { speedKmh: 85, hardBrakingCount: 3, weather: "hujan", continuousDrivingMinutes: 250, odolIndicator: true, kirValid: true },
    ],
  },
  {
    unitCode: "BUS-024",
    subCode: "B 7812 TGA",
    category: "darat",
    unitType: "Bus AKAP",
    fleetType: "bus_penumpang",
    clientName: "PO Harapan Prima • AKAP",
    kirExpiryOffsetDays: 300,
    legalitasTitle: "KIR BLUE AKTIF",
    legalitasLines: ["STNK & Izin Trayek AKAP Sah", "Asuransi Jasa Raharja Ada"],
    checklistTitle: "BAN DEPAN KANAN 1.8MM • KLAKSON ANGIN MACET",
    checklistNote: "Wiper kiri bergetar saat kecepatan tinggi.",
    operatorName: "Hendra Setiawan",
    simExpiryOffsetDays: 420,
    telemetrySeries: [
      { speedKmh: 65, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 120, odolIndicator: false, kirValid: true },
      { speedKmh: 78, hardBrakingCount: 2, weather: "hujan", continuousDrivingMinutes: 200, odolIndicator: false, kirValid: true },
      { speedKmh: 85, hardBrakingCount: 3, weather: "kabut", continuousDrivingMinutes: 245, odolIndicator: false, kirValid: true },
    ],
  },
  {
    unitCode: "WT-015",
    subCode: "WT-015-SCF",
    category: "alat_berat",
    unitType: "Water Truck",
    fleetType: "logistik",
    clientName: "PT Vale Indonesia Tbk",
    kirExpiryOffsetDays: 400,
    legalitasTitle: "SIA & KALIBRASI TANGKI SAH",
    legalitasLines: ["Sertifikat Uji Hydrostatic Terbit", "Masa Berlaku s/d Des 2025"],
    checklistTitle: "POMPA SPRAY NORMAL • RETARDER PRIMA • APAR 100%",
    checklistNote: "Sistem kemudi ganda berfungsi normal.",
    operatorName: "Dani Prasetyo",
    simExpiryOffsetDays: 600,
    telemetrySeries: [
      { speedKmh: 40, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 80, odolIndicator: false, kirValid: true },
      { speedKmh: 42, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 85, odolIndicator: false, kirValid: true },
      { speedKmh: 45, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 90, odolIndicator: false, kirValid: true },
    ],
  },
  {
    unitCode: "BUS-089",
    subCode: "B 7123 PQA",
    category: "darat",
    unitType: "Bus AKAP",
    fleetType: "bus_penumpang",
    clientName: "PO Bintang Pantura Express",
    kirExpiryOffsetDays: 350,
    legalitasTitle: "KIR ELEKTRONIK BLUE SAH",
    legalitasLines: ["Bukti Lulus Uji Elektronik Dishub", "Izin Trayek Antar Provinsi Sah"],
    checklistTitle: "CHECKLIST RAMPCHECK SEMPURNA (12/12 LOLOS)",
    checklistNote: "Rem angin, palu pemecah kaca, & APAR lengkap.",
    operatorName: "Markus Wibowo",
    simExpiryOffsetDays: 500,
    telemetrySeries: [
      { speedKmh: 55, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 100, odolIndicator: false, kirValid: true },
      { speedKmh: 58, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 110, odolIndicator: false, kirValid: true },
      { speedKmh: 60, hardBrakingCount: 0, weather: "cerah", continuousDrivingMinutes: 120, odolIndicator: false, kirValid: true },
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

    await supabase.from("drivers").insert({
      full_name: unit.operatorName,
      sim_number: `SIM-${unit.unitCode}`,
      sim_expiry: daysFromNow(unit.simExpiryOffsetDays).slice(0, 10),
      vehicle_id: vehicle.id,
    });

    const telemetryRows = unit.telemetrySeries.map((sample, i) => {
      const assessment = assessments[i];
      const daysAgo = (unit.telemetrySeries.length - 1 - i) * 3;
      return {
        vehicle_id: vehicle.id,
        speed_kmh: sample.speedKmh,
        hard_braking_count: sample.hardBrakingCount,
        weather: sample.weather,
        continuous_driving_minutes: sample.continuousDrivingMinutes,
        odol_indicator: sample.odolIndicator,
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
