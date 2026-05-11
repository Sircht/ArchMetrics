import { formatNumber } from "@/lib/utils";
import type { StairResult } from "./calculate-stair";

export function StairDiagram({ result }: { result: StairResult }) {
  const width = 640;
  const height = 360;
  const margin = 48;
  const run = width - margin * 2;
  const rise = height - margin * 2;
  const steps = Math.min(result.steps, 18);
  const points = Array.from({ length: steps + 1 }, (_, i) => `${margin + (run / steps) * i},${height - margin - (rise / steps) * i}`).join(" ");
  const stairPath = Array.from({ length: steps }, (_, i) => {
    const x = margin + (run / steps) * i;
    const y = height - margin - (rise / steps) * i;
    const nx = margin + (run / steps) * (i + 1);
    const ny = height - margin - (rise / steps) * (i + 1);
    return `L ${x} ${ny} L ${nx} ${ny}`;
  }).join(" ");

  return (
    <div id="stair-diagram" className="rounded-[1.5rem] border border-border bg-slate-950/70 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Live technical stair diagram" className="h-auto w-full">
        <defs>
          <linearGradient id="stairGlow" x1="0" x2="1"><stop stopColor="#7C3AED" /><stop offset="1" stopColor="#A78BFA" /></linearGradient>
          <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d={`M ${margin} ${height - margin} ${stairPath}`} fill="none" stroke="url(#stairGlow)" strokeWidth="4" strokeLinejoin="round" filter="url(#softGlow)" />
        <polyline points={points} fill="none" stroke="rgba(255,255,255,0.16)" strokeDasharray="6 8" />
        <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="rgba(255,255,255,0.35)" />
        <line x1={margin} y1={height - margin} x2={margin} y2={margin} stroke="rgba(255,255,255,0.35)" />
        <text x={width / 2} y={height - 16} textAnchor="middle" fill="#94A3B8" fontSize="14">Total run: {formatNumber(result.totalRun)} cm</text>
        <text x={18} y={height / 2} transform={`rotate(-90 18 ${height / 2})`} textAnchor="middle" fill="#94A3B8" fontSize="14">Rise: {formatNumber(result.riserHeight * result.steps)} cm</text>
        <text x={width - margin - 8} y={margin + 22} textAnchor="end" fill="#F8FAFC" fontSize="16">{result.steps} risers · {formatNumber(result.slopeAngle, 1)}°</text>
        <text x={margin + 12} y={height - margin - 12} fill="#A78BFA" fontSize="13">Tread {formatNumber(result.treadDepth)} cm</text>
        <text x={margin + 12} y={height - margin - 34} fill="#A78BFA" fontSize="13">Riser {formatNumber(result.riserHeight)} cm</text>
      </svg>
    </div>
  );
}
