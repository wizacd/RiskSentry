// Tipe data anomali. Data asli dipetakan dari tabel `vehicles`/`drivers`/
// `telemetry_logs` Supabase lewat useAnomaliData.ts — lihat mapping di sana.
export interface DescSegment {
  text: string;
  bold?: boolean;
}

export type Severity = "bahaya" | "waspada";

export interface AnomalyItem {
  id: string;
  severity: Severity;
  tagLabel: string;
  tagIcon: string;
  sourceTag: string;
  location: string;
  vehicleCode: string;
  vehicleModel: string;
  plate: string;
  contextLabel: string;
  contextValue: string;
  problemIcon: string;
  descLine1: DescSegment[];
  descLine2: string;
  metaParts: string[];
  metaHighlightIndex?: number;
  riskScore: number;
  primaryActionLabel: string;
  primaryActionDoneLabel: string;
  primaryActionIcon: string;
  secondaryActionLabel: string;
  category: string;
  vehicleType: string;
  hasDetailPage: boolean;
}
