export default function Sparkline({
  data,
  color,
  width = 64,
  height = 24,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (data.length === 0) return null;

  const padding = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;

  const points = data.map((value, i) => {
    const x = padding + i * stepX;
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const last = points[points.length - 1];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Tren: ${data.join(" -> ")}`}>
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r={2.25} fill={color} />
    </svg>
  );
}
