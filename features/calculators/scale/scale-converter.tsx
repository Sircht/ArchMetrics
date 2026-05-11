"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber } from "@/lib/utils";

const scales = [25, 50, 75, 100, 250, 500];
export function ScaleConverter() {
  const [mode, setMode] = useState("real-to-scale");
  const [scale, setScale] = useState(50);
  const [value, setValue] = useState(100);
  const converted = useMemo(() => mode === "real-to-scale" ? value / scale : value * scale, [mode, scale, value]);
  return <Card className="mx-auto max-w-3xl p-6"><h2 className="font-display text-2xl font-semibold">Architectural Scale Converter</h2><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="space-y-2"><Label>Mode</Label><Select value={mode} onValueChange={setMode}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="real-to-scale">Real to scale</SelectItem><SelectItem value="scale-to-real">Scale to real</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Scale</Label><Select value={String(scale)} onValueChange={(v)=>setScale(Number(v))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{scales.map((item)=><SelectItem key={item} value={String(item)}>1:{item}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Measurement (cm)</Label><Input type="number" value={value} onChange={(e)=>setValue(Number(e.target.value))} /></div></div><div className="mt-6 rounded-[1.5rem] bg-primary/15 p-6 text-center"><p className="text-sm text-muted">Converted result</p><p className="font-display text-5xl font-bold">{formatNumber(converted)} cm</p></div></Card>;
}
