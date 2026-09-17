import { SPEED_LIMIT_KMH, TelemetryPoint } from "./mockVehicleDetail";

const SERIES = [
  { key: "speed" as const, label: "Kecepatan (km/h)", color: "#131b2e" },
  { key: "gbrake" as const, label: "G-Braking (-m/s²)", color: "#f59e0b" },
];

export default function TelemetryChart({
  data,
  visibleSeries,
  height = 260,
}: {
  data: TelemetryPoint[];
  visibleSeries: Set<string>;
  height?: number;
}) {
  const width = 100;
  const padding = 4;

  function buildPath(key: "speed" | "gbrake") {
    const values = data.map((d) => d[key]);
    const max = Math.max(...values, 1);
    const stepX = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;
    return data
      .map((d, i) => {
        const x = padding + i * stepX;
        const y = padding + (1 - d[key] / max) * (100 - padding * 2);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  }

  const speedMax = Math.max(...data.map((d) => d.speed), 1);
  const speedLimitY = padding + (1 - SPEED_LIMIT_KMH / speedMax) * (100 - padding * 2);
  const showSpeedLimit = visibleSeries.has("speed") && SPEED_LIMIT_KMH <= speedMax * 1.2;

  return (
    <div className="rounded-[4px] bg-[#f2f4f6]/40 p-2" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[calc(100%-20px)] w-full">
        {showSpeedLimit && (
          <line x1={0} y1={speedLimitY} x2={100} y2={speedLimitY} stroke="#ba1a1a" strokeWidth={0.6} strokeDasharray="2,2" vectorEffect="non-scaling-stroke" />
        )}
        {SERIES.filter((s) => visibleSeries.has(s.key)).map((s) => (
          <path key={s.key} d={buildPath(s.key)} fill="none" stroke={s.color} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="flex justify-between px-1 pt-1 text-[10px] text-[#76777d]">
        {data.map((d) => (
          <span key={d.t}>{d.t}</span>
        ))}
      </div>
    </div>
  );
}
