// Scoring engine — diselaraskan dengan spec data-pendukung-hackathon
// (github.com/wizacd/data-pendukung-hackathon): skor 0-100 dihitung dari
// weighted average beberapa faktor sensor yang di-mapping ke skala 0-100
// dulu, BUKAN lagi Likelihood x Severity biner. Dua formula terpisah sesuai
// kelas aset — kendaraan_darat (kecepatan/durasi/cuaca/hard-braking/
// dokumen/muatan) dan alat_berat (durasi/kemiringan/beban angkat/getaran/
// suhu/dokumen) — karena sensor yang relevan beda total antar kelas.
//
// Klasifikasi status (aman/waspada/bahaya) TETAP pakai threshold configurable
// per fleet_type (lihat threshold_configs / Pengaturan Threshold), bukan
// angka fix 40/70 dari spec — supaya fitur yang sudah dibangun tetap valid.

import type { FleetType, RiskStatus, ThresholdConfig, VibrationLevel, Weather } from "@/types/database";

export interface DocumentValidity {
  operatorDocValid: boolean; // SIM (kendaraan_darat) / SIO (alat_berat)
  unitDocValid: boolean; // KIR (kendaraan_darat) / SILO (alat_berat)
}

export interface DaratSample extends DocumentValidity {
  category: "darat";
  speedKmh: number;
  hardBrakingCount: number;
  weather: Weather;
  continuousDrivingMinutes: number;
  odolIndicator: boolean;
  muatanPercent: number;
}

export interface AlatBeratSample extends DocumentValidity {
  category: "alat_berat";
  continuousDrivingMinutes: number;
  kemiringanArea: number;
  bebanAngkatPercent: number;
  getaranLevel: VibrationLevel;
  suhuKomponen: number;
}

export type TelemetrySample = DaratSample | AlatBeratSample;

export interface RiskAssessment {
  likelihood: number; // 1-5, proksi informasional (bukan sumber riskScore lagi)
  severity: number; // 1-5, proksi informasional
  riskScore: number; // 0-100, weighted average faktor sensor
  status: RiskStatus;
  breakdown: Record<string, number>;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// ===== Fungsi bantu: petakan nilai mentah ke skala 0-100 =====
function mapKecepatan(v: number) {
  if (v <= 60) return 20;
  if (v <= 80) return 50;
  if (v <= 100) return 75;
  return 100;
}
function mapDurasi(menit: number) {
  if (menit <= 120) return 20;
  if (menit <= 240) return 60;
  return 100;
}
function mapCuaca(c: Weather) {
  if (c === "cerah") return 10;
  if (c === "hujan") return 50; // varian "gerimis" di spec ~ hujan ringan di skema kita
  return 100; // kabut / hujan lebat
}
function mapHardBraking(count: number) {
  if (count === 0) return 0;
  if (count === 1) return 50;
  return 100;
}
function mapDokumen(operatorValid: boolean, unitValid: boolean) {
  if (operatorValid && unitValid) return 0;
  if (!operatorValid && !unitValid) return 100;
  return 60; // salah satu expired
}
function mapMuatan(persen: number) {
  if (persen <= 100) return 0;
  if (persen <= 120) return 60;
  return 100;
}
function mapKemiringan(derajat: number) {
  if (derajat <= 5) return 20;
  if (derajat <= 12) return 60;
  return 100;
}
function mapBebanAngkat(persen: number) {
  if (persen <= 85) return 20;
  if (persen <= 100) return 60;
  return 100;
}
function mapGetaran(level: VibrationLevel) {
  if (level === "normal") return 10;
  if (level === "sedang") return 55;
  return 100; // tinggi
}
function mapSuhu(c: number) {
  if (c <= 70) return 20;
  if (c <= 90) return 55;
  return 100;
}

/** Skor kendaraan_darat: kecepatan 30%, durasi 20%, cuaca 15%, hard braking 20%, dokumen 10%, muatan 5%. */
function scoreDarat(sample: DaratSample) {
  const nilai = {
    kecepatan: mapKecepatan(sample.speedKmh),
    durasi: mapDurasi(sample.continuousDrivingMinutes),
    cuaca: mapCuaca(sample.weather),
    hardBraking: mapHardBraking(sample.hardBrakingCount),
    dokumen: mapDokumen(sample.operatorDocValid, sample.unitDocValid),
    muatan: mapMuatan(sample.muatanPercent),
  };
  const skor =
    nilai.kecepatan * 0.3 + nilai.durasi * 0.2 + nilai.cuaca * 0.15 + nilai.hardBraking * 0.2 + nilai.dokumen * 0.1 + nilai.muatan * 0.05;
  // Likelihood: seberapa mungkin (dinamika berkendara) — severity: seberapa parah (dokumen & muatan).
  const likelihood = clamp(Math.round(((nilai.kecepatan + nilai.durasi + nilai.hardBraking + nilai.cuaca) / 4 / 100) * 5) || 1, 1, 5);
  const severity = clamp(Math.round(((nilai.dokumen + nilai.muatan) / 2 / 100) * 5) || 1, 1, 5);
  return { skor, breakdown: nilai, likelihood, severity };
}

/** Skor alat_berat: durasi 25%, kemiringan 20%, beban angkat 25%, getaran 15%, suhu 5%, dokumen 10%. */
function scoreAlatBerat(sample: AlatBeratSample) {
  const nilai = {
    durasi: mapDurasi(sample.continuousDrivingMinutes),
    kemiringan: mapKemiringan(sample.kemiringanArea),
    bebanAngkat: mapBebanAngkat(sample.bebanAngkatPercent),
    getaran: mapGetaran(sample.getaranLevel),
    suhu: mapSuhu(sample.suhuKomponen),
    dokumen: mapDokumen(sample.operatorDocValid, sample.unitDocValid),
  };
  const skor =
    nilai.durasi * 0.25 + nilai.kemiringan * 0.2 + nilai.bebanAngkat * 0.25 + nilai.getaran * 0.15 + nilai.suhu * 0.05 + nilai.dokumen * 0.1;
  const likelihood = clamp(Math.round(((nilai.durasi + nilai.kemiringan + nilai.getaran) / 3 / 100) * 5) || 1, 1, 5);
  const severity = clamp(Math.round(((nilai.bebanAngkat + nilai.suhu + nilai.dokumen) / 3 / 100) * 5) || 1, 1, 5);
  return { skor, breakdown: nilai, likelihood, severity };
}

export function assessRisk(
  sample: TelemetrySample,
  thresholds: Pick<ThresholdConfig, "waspada_threshold" | "bahaya_threshold">,
): RiskAssessment {
  const { skor, breakdown, likelihood, severity } = sample.category === "darat" ? scoreDarat(sample) : scoreAlatBerat(sample);
  const riskScore = Math.round(skor * 10) / 10;

  let status: RiskStatus = "aman";
  if (riskScore >= thresholds.bahaya_threshold) status = "bahaya";
  else if (riskScore >= thresholds.waspada_threshold) status = "waspada";

  return { likelihood, severity, riskScore, status, breakdown };
}

export const DEFAULT_THRESHOLDS: Record<
  FleetType,
  Pick<ThresholdConfig, "waspada_threshold" | "bahaya_threshold">
> = {
  bus: { waspada_threshold: 30, bahaya_threshold: 65 },
  dumptruck: { waspada_threshold: 35, bahaya_threshold: 75 },
  lv: { waspada_threshold: 40, bahaya_threshold: 70 },
  excavator: { waspada_threshold: 35, bahaya_threshold: 70 },
  tanker: { waspada_threshold: 25, bahaya_threshold: 60 },
};

export interface RiskContributor {
  label: string;
  pct: number;
  color: string;
}

function contributorColor(pct: number) {
  if (pct >= 15) return "#ba1a1a";
  if (pct >= 8) return "#f59e0b";
  return "#059669";
}

/** Rekonstruksi kontributor risiko dari satu baris telemetry_logs TERSIMPAN
 * (bukan dari sample transien) — dipakai kartu Skor Risiko K3 di Detail
 * Kendaraan. Kelas aset dideteksi dari kolom mana yang terisi (kemiringan_area
 * non-null = alat_berat). */
export function explainTelemetryLog(log: {
  kemiringan_area: number | null;
  beban_angkat_persen: number | null;
  getaran_level: VibrationLevel | null;
  suhu_komponen: number | null;
  speed_kmh: number;
  hard_braking_count: number;
  weather: Weather;
  continuous_driving_minutes: number;
  persen_muatan: number | null;
}): RiskContributor[] {
  const isAlatBerat = log.kemiringan_area !== null;

  const entries: { label: string; nilai: number; weight: number }[] = isAlatBerat
    ? [
        { label: "Durasi Operasi Kontinu", nilai: mapDurasi(log.continuous_driving_minutes), weight: 0.25 },
        { label: "Kemiringan Area Kerja", nilai: mapKemiringan(log.kemiringan_area ?? 0), weight: 0.2 },
        { label: "Beban Angkat vs Kapasitas", nilai: mapBebanAngkat(log.beban_angkat_persen ?? 0), weight: 0.25 },
        { label: "Level Getaran Komponen", nilai: mapGetaran(log.getaran_level ?? "normal"), weight: 0.15 },
        { label: "Suhu Komponen Kritis", nilai: mapSuhu(log.suhu_komponen ?? 0), weight: 0.05 },
      ]
    : [
        { label: "Kecepatan Berkendara", nilai: mapKecepatan(log.speed_kmh), weight: 0.3 },
        { label: "Durasi Operasi Kontinu", nilai: mapDurasi(log.continuous_driving_minutes), weight: 0.2 },
        { label: "Kondisi Cuaca", nilai: mapCuaca(log.weather), weight: 0.15 },
        { label: "Pola Hard-Braking", nilai: mapHardBraking(log.hard_braking_count), weight: 0.2 },
        { label: "Muatan vs Kapasitas", nilai: mapMuatan(log.persen_muatan ?? 0), weight: 0.05 },
      ];

  return entries
    .map((e) => ({ label: e.label, pct: Math.round(e.nilai * e.weight), color: "" }))
    .filter((e) => e.pct > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3)
    .map((e) => ({ ...e, color: contributorColor(e.pct) }));
}

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
