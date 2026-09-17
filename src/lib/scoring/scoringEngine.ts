// Scoring engine — prinsip HIRARC (Hazard Identification, Risk Assessment and Risk
// Control): risk_score = Likelihood x Severity, keduanya diskala 1-5.
// Dimiliki Person 2 (lihat bagian 6 dokumen jobdesc), diletakkan di sini supaya
// dipakai bareng oleh data generator (Person 3) dan dashboard (Person 2) — satu
// sumber kebenaran, bukan diduplikat di FE.

import type { FleetType, RiskStatus, ThresholdConfig } from "@/types/database";

export interface TelemetrySample {
  speedKmh: number;
  hardBrakingCount: number;
  weather: "cerah" | "hujan" | "kabut";
  continuousDrivingMinutes: number;
  odolIndicator: boolean;
  kirValid: boolean;
}

export interface RiskAssessment {
  likelihood: number; // 1-5
  severity: number; // 1-5
  riskScore: number; // likelihood * severity, range 1-25 dinormalisasi ke 0-100
  status: RiskStatus;
}

const SPEED_LIMIT_KMH = 80;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Likelihood: seberapa mungkin insiden terjadi, dari pola perilaku mengemudi. */
function computeLikelihood(sample: TelemetrySample): number {
  let score = 1;
  if (sample.speedKmh > SPEED_LIMIT_KMH) score += 1;
  if (sample.hardBrakingCount >= 3) score += 1;
  if (sample.continuousDrivingMinutes > 240) score += 1; // >4 jam nonstop
  if (sample.weather !== "cerah") score += 1;
  return clamp(score, 1, 5);
}

/** Severity: seberapa parah dampaknya kalau insiden benar terjadi. */
function computeSeverity(sample: TelemetrySample): number {
  let score = 1;
  if (!sample.kirValid) score += 2; // unit tidak laik jalan = dampak berat
  if (sample.odolIndicator) score += 1; // over dimension/overload
  if (sample.weather === "kabut") score += 1;
  return clamp(score, 1, 5);
}

/** Skor 1-25 (likelihood x severity) dinormalisasi ke skala 0-100 untuk threshold. */
export function assessRisk(
  sample: TelemetrySample,
  thresholds: Pick<ThresholdConfig, "waspada_threshold" | "bahaya_threshold">,
): RiskAssessment {
  const likelihood = computeLikelihood(sample);
  const severity = computeSeverity(sample);
  const raw = likelihood * severity; // 1-25
  const riskScore = Math.round((raw / 25) * 100);

  let status: RiskStatus = "aman";
  if (riskScore >= thresholds.bahaya_threshold) status = "bahaya";
  else if (riskScore >= thresholds.waspada_threshold) status = "waspada";

  return { likelihood, severity, riskScore, status };
}

export const DEFAULT_THRESHOLDS: Record<
  FleetType,
  Pick<ThresholdConfig, "waspada_threshold" | "bahaya_threshold">
> = {
  logistik: { waspada_threshold: 40, bahaya_threshold: 70 },
  bus_penumpang: { waspada_threshold: 35, bahaya_threshold: 65 },
};

export function recommendedAction(status: RiskStatus): string | null {
  switch (status) {
    case "bahaya":
      return "Hubungi driver, minta kurangi kecepatan & istirahat di titik aman terdekat.";
    case "waspada":
      return "Pantau terus, ingatkan driver untuk jaga jarak & kecepatan.";
    default:
      return null;
  }
}
