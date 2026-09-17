// Data generator — deliverable inti Person 3 (bagian 7 dokumen).
// Menghasilkan pola data REALISTIS (bukan acak murni) untuk 3 skenario demo:
// Normal, Mulai Berisiko, Bahaya. Dipakai oleh /demo-simulator dan endpoint
// /api/simulator/trigger untuk mensimulasikan telemetri tanpa perangkat IoT asli.

import type { SimulatorScenario, TelemetryLog, Weather } from "@/types/database";
import { assessRisk, DEFAULT_THRESHOLDS, type TelemetrySample } from "@/lib/scoring/scoringEngine";

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

const SCENARIO_PROFILES: Record<
  SimulatorScenario,
  { speed: [number, number]; hardBraking: [number, number]; weather: Weather[]; continuousDriving: [number, number]; odolChance: number; kirValidChance: number }
> = {
  normal: {
    speed: [50, 75],
    hardBraking: [0, 1],
    weather: ["cerah", "cerah", "hujan"],
    continuousDriving: [30, 120],
    odolChance: 0.02,
    kirValidChance: 0.98,
  },
  mulai_berisiko: {
    speed: [75, 95],
    hardBraking: [2, 4],
    weather: ["cerah", "hujan", "hujan"],
    continuousDriving: [150, 260],
    odolChance: 0.15,
    kirValidChance: 0.85,
  },
  bahaya: {
    speed: [95, 130],
    hardBraking: [4, 8],
    weather: ["hujan", "kabut", "kabut"],
    continuousDriving: [260, 400],
    odolChance: 0.4,
    kirValidChance: 0.55,
  },
};

/** Bangkitkan satu sample telemetri sesuai profil skenario. */
export function generateTelemetrySample(scenario: SimulatorScenario): TelemetrySample {
  const profile = SCENARIO_PROFILES[scenario];
  return {
    speedKmh: Math.round(randomBetween(...profile.speed)),
    hardBrakingCount: Math.round(randomBetween(...profile.hardBraking)),
    weather: pick(profile.weather),
    continuousDrivingMinutes: Math.round(randomBetween(...profile.continuousDriving)),
    odolIndicator: Math.random() < profile.odolChance,
    kirValid: Math.random() < profile.kirValidChance,
  };
}

/**
 * Bangkitkan satu baris telemetry_logs siap-insert (tanpa id/recorded_at, itu
 * default kolom DB) untuk sebuah kendaraan, berdasarkan skenario yang dipilih
 * operator simulator di /demo-simulator.
 */
export function generateTelemetryRow(
  vehicleId: string,
  scenario: SimulatorScenario,
  fleetType: "logistik" | "bus_penumpang",
): Omit<TelemetryLog, "id" | "recorded_at"> {
  const sample = generateTelemetrySample(scenario);
  const assessment = assessRisk(sample, DEFAULT_THRESHOLDS[fleetType]);

  return {
    vehicle_id: vehicleId,
    speed_kmh: sample.speedKmh,
    hard_braking_count: sample.hardBrakingCount,
    weather: sample.weather,
    continuous_driving_minutes: sample.continuousDrivingMinutes,
    odol_indicator: sample.odolIndicator,
    likelihood: assessment.likelihood,
    severity: assessment.severity,
    risk_score: assessment.riskScore,
    status: assessment.status,
  };
}
