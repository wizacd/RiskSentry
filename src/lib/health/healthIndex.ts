// Health Index Score — deliverable Person 3 untuk Compliance Passport (bagian 7 & 3.4).
// Kombinasi kepatuhan P2H + kebersihan riwayat anomali telematika sepanjang periode.
// Skala 0-100, makin tinggi makin layak fast-track verifikasi KIR.

import type { P2HRecord, TelemetryLog } from "@/types/database";

export interface HealthIndexResult {
  score: number; // 0-100
  p2hComplianceRate: number; // 0-1, proporsi P2H berstatus hijau
  criticalAnomalyCount: number; // jumlah log status "bahaya" pada periode
  fastTrackEligible: boolean;
}

const FAST_TRACK_MIN_SCORE = 80;
const FAST_TRACK_MAX_CRITICAL_ANOMALIES = 0;

export function computeHealthIndex(
  p2hRecords: P2HRecord[],
  telemetryLogs: TelemetryLog[],
): HealthIndexResult {
  const p2hComplianceRate =
    p2hRecords.length === 0
      ? 1
      : p2hRecords.filter((r) => r.final_status === "hijau").length / p2hRecords.length;

  const criticalAnomalyCount = telemetryLogs.filter((log) => log.status === "bahaya").length;
  const warningAnomalyCount = telemetryLogs.filter((log) => log.status === "waspada").length;

  // Bobot: 60% kepatuhan P2H, 40% kebersihan telematika (dikurangi tiap anomali).
  const telemetryPenalty = criticalAnomalyCount * 15 + warningAnomalyCount * 5;
  const telemetryScore = Math.max(0, 100 - telemetryPenalty);

  const score = Math.round(p2hComplianceRate * 100 * 0.6 + telemetryScore * 0.4);

  return {
    score,
    p2hComplianceRate,
    criticalAnomalyCount,
    fastTrackEligible:
      score >= FAST_TRACK_MIN_SCORE && criticalAnomalyCount <= FAST_TRACK_MAX_CRITICAL_ANOMALIES,
  };
}
