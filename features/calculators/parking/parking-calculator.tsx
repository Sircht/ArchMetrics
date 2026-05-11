"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ParkingCalculator() {
  const [area, setArea] = useState(1200); const [stall, setStall] = useState(12.5); const [efficiency, setEfficiency] = useState(62);
  const spaces = useMemo(() => Math.floor((area * (efficiency / 100)) / stall), [area, stall, efficiency]);
  return <Card className="mx-auto max-w-4xl p-6"><h2 className="font-display text-2xl font-semibold">Parking Space Calculator</h2><div className="mt-6 grid gap-4 sm:grid-cols-3"><Field label="Parking area (m²)" value={area} set={setArea}/><Field label="Stall module (m²)" value={stall} set={setStall}/><Field label="Layout efficiency (%)" value={efficiency} set={setEfficiency}/></div><div className="mt-6 rounded-[1.5rem] border border-border bg-white/[0.04] p-8 text-center"><p className="text-muted">Estimated spaces</p><p className="font-display text-6xl font-bold text-gradient">{spaces}</p><p className="mt-3 text-sm text-muted">Includes circulation efficiency; confirm local zoning and accessible space ratios.</p></div></Card>;
}
function Field({label,value,set}:{label:string;value:number;set:(n:number)=>void}){return <div className="space-y-2"><Label>{label}</Label><Input type="number" value={value} onChange={(e)=>set(Number(e.target.value))}/></div>}
