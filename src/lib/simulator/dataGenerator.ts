// Data generator — diselaraskan dengan spec data-pendukung-hackathon.
// Menghasilkan pola data REALISTIS (bukan acak murni) untuk 3 skenario demo:
// Normal, Mulai Berisiko, Bahaya. Cabang berbeda untuk kendaraan_darat vs
// alat_berat karena field sensornya beda total (lihat scoringEngine.ts).
// Dipakai oleh /demo-simulator dan endpoint /api/simulator/trigger.

import type { FleetCategory, FleetType, TelemetryLog, Weather } from "@/types/database";
import { assessRisk, DEFAULT_THRESHOLDS, type AlatBeratSample, type DaratSample } from "@/lib/scoring/scoringEngine";
import type { SimulatorScenario } from "@/types/database";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

const DARAT_PROFILES: Record<
  SimulatorScenario,
  { speed: [number, number]; hardBraking: [number, number]; weather: Weather[]; continuousDriving: [number, number]; odolChance: number; docValidChance: number; muatan: [number, number] }
> = {
  normal: {
    speed: [40, 60],
    hardBraking: [0, 0],
    weather: ["cerah", "cerah", "hujan"],
    continuousDriving: [0, 90],
    odolChance: 0.02,
    docValidChance: 0.98,
    muatan: [70, 95],
  },
  mulai_berisiko: {
    speed: [61, 90],
    hardBraking: [0, 1],
    weather: ["cerah", "hujan", "hujan"],
    continuousDriving: [91, 180],
    odolChance: 0.15,
    docValidChance: 0.85,
    muatan: [96, 110],
  },
  bahaya: {
    speed: [91, 130],
    hardBraking: [1, 3],
    weather: ["hujan", "kabut", "kabut"],
    continuousDriving: [181, 320],
    odolChance: 0.4,
    docValidChance: 0.4,
    muatan: [111, 140],
  },
};

const ALAT_BERAT_PROFILES: Record<
  SimulatorScenario,
  { continuousDriving: [number, number]; kemiringan: [number, number]; bebanAngkat: [number, number]; getaran: ("normal" | "sedang" | "tinggi")[]; suhu: [number, number]; docValidChance: number }
> = {
  normal: {
    continuousDriving: [0, 120],
    kemiringan: [0, 5],
    bebanAngkat: [50, 85],
    getaran: ["normal"],
    suhu: [40, 70],
    docValidChance: 0.98,
  },
  mulai_berisiko: {
    continuousDriving: [121, 240],
    kemiringan: [6, 12],
    bebanAngkat: [86, 100],
    getaran: ["sedang"],
    suhu: [71, 90],
    docValidChance: 0.85,
  },
  bahaya: {
    continuousDriving: [241, 400],
    kemiringan: [13, 25],
    bebanAngkat: [101, 130],
    getaran: ["tinggi"],
    suhu: [91, 130],
    docValidChance: 0.4,
  },
};

export function generateDaratSample(scenario: SimulatorScenario): DaratSample {
  const p = DARAT_PROFILES[scenario];
  const docValid = Math.random() < p.docValidChance;
  return {
    category: "darat",
    speedKmh: Math.round(randomBetween(...p.speed)),
    hardBrakingCount: Math.round(randomBetween(...p.hardBraking)),
    weather: pick(p.weather),
    continuousDrivingMinutes: Math.round(randomBetween(...p.continuousDriving)),
    odolIndicator: Math.random() < p.odolChance,
    muatanPercent: Math.round(randomBetween(...p.muatan)),
    operatorDocValid: docValid,
    unitDocValid: docValid,
  };
}

export function generateAlatBeratSample(scenario: SimulatorScenario): AlatBeratSample {
  const p = ALAT_BERAT_PROFILES[scenario];
  const docValid = Math.random() < p.docValidChance;
  return {
    category: "alat_berat",
    continuousDrivingMinutes: Math.round(randomBetween(...p.continuousDriving)),
    kemiringanArea: Math.round(randomBetween(...p.kemiringan)),
    bebanAngkatPercent: Math.round(randomBetween(...p.bebanAngkat)),
    getaranLevel: pick(p.getaran),
    suhuKomponen: Math.round(randomBetween(...p.suhu)),
    operatorDocValid: docValid,
    unitDocValid: docValid,
  };
}

/**
 * Bangkitkan satu baris telemetry_logs siap-insert (tanpa id/recorded_at, itu
 * default kolom DB) untuk sebuah kendaraan, berdasarkan skenario yang dipilih
 * operator simulator di /demo-simulator, dan kelas asetnya (category).
 */
export function generateTelemetryRow(
  vehicleId: string,
  scenario: SimulatorScenario,
  fleetType: FleetType,
  category: FleetCategory,
): Omit<TelemetryLog, "id" | "recorded_at"> {
  const sample = category === "darat" ? generateDaratSample(scenario) : generateAlatBeratSample(scenario);
  const assessment = assessRisk(sample, DEFAULT_THRESHOLDS[fleetType]);

  const isDarat = sample.category === "darat";

  return {
    vehicle_id: vehicleId,
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
  };
}
