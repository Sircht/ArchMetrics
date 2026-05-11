"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";

export function RampCalculator() {
  const [height, setHeight] = useState(80);
  const [width, setWidth] = useState(120);
  const [slope, setSlope] = useState(8.33);
  const result = useMemo(() => {
    const length = height / (slope / 100);
    const landings = Math.max(0, Math.floor(length / 900));
    const compliant = slope <= 8.33 && width >= 120;
    return { length, landings, compliant };
  }, [height, width, slope]);
  return <div className="grid gap-6 lg:grid-cols-[380px_1fr]"><Card className="space-y-4 p-6"><h2 className="font-display text-2xl font-semibold">Ramp inputs</h2><div className="space-y-2"><Label>Height difference (cm)</Label><Input type="number" value={height} onChange={(e)=>setHeight(Number(e.target.value))} /></div><div className="space-y-2"><Label>Ramp width (cm)</Label><Input type="number" value={width} onChange={(e)=>setWidth(Number(e.target.value))} /></div><div className="space-y-2"><Label>Slope preference (%)</Label><Input type="number" step="0.01" value={slope} onChange={(e)=>setSlope(Number(e.target.value))} /></div></Card><Card className="p-6"><div className="mb-4 flex justify-between"><h3 className="font-display text-xl font-semibold">Live ramp section</h3><span className={result.compliant ? "text-success" : "text-warning"}>{result.compliant ? "NBR accessible target" : "Needs review"}</span></div><svg viewBox="0 0 680 260" className="w-full rounded-2xl bg-slate-950"><path d="M 70 200 L 610 200 L 610 70 Z" fill="rgba(124,58,237,.18)" stroke="#A78BFA" strokeWidth="4"/><text x="340" y="226" textAnchor="middle" fill="#94A3B8">Required length: {formatNumber(result.length)} cm</text><text x="622" y="140" fill="#94A3B8">Rise {height} cm</text></svg><div className="mt-5 grid gap-3 sm:grid-cols-3"><Metric label="Slope" value={`${formatNumber(slope)}%`} /><Metric label="Landings" value={String(result.landings)} /><Metric label="Width" value={`${width} cm`} /></div></Card></div>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-white/[0.05] p-4"><p className="text-xs uppercase text-muted">{label}</p><p className="font-display text-2xl font-bold">{value}</p></div>; }
