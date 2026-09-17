export default function RiskGauge({ value, max, color = "#ba1a1a", size = 128 }: { value: number; max: number; color?: string; size?: number }) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));
  const dashOffset = circumference * (1 - pct);
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#e6e8ea" strokeWidth={10} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[40px] font-bold leading-none" style={{ color }}>
          {value}
        </span>
        <span className="text-[11px] font-bold tracking-wide text-[#45464d]">/ {max} PTS</span>
      </div>
    </div>
  );
}
