"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";

export function BuiltAreaCalculator() {
  const [plot, setPlot] = useState(450); const [footprint, setFootprint] = useState(185); const [floors, setFloors] = useState(2);
  const data = useMemo(() => [{ name: "Built", value: footprint * floors }, { name: "Open plot", value: Math.max(plot - footprint, 0) }], [plot, footprint, floors]);
  return <div className="grid gap-6 lg:grid-cols-2"><Card className="space-y-4 p-6"><h2 className="font-display text-2xl font-semibold">Built Area Calculator</h2><Field label="Plot area (m²)" value={plot} set={setPlot}/><Field label="Ground footprint (m²)" value={footprint} set={setFootprint}/><Field label="Floors" value={floors} set={setFloors}/></Card><Card className="p-6"><p className="text-muted">Total built area</p><p className="font-display text-5xl font-bold">{formatNumber(footprint*floors)} m²</p><div className="h-72"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" outerRadius={100}><Cell fill="#7C3AED"/><Cell fill="#1E293B"/></Pie><Tooltip /></PieChart></ResponsiveContainer></div></Card></div>;
}
function Field({label,value,set}:{label:string;value:number;set:(n:number)=>void}){return <div className="space-y-2"><Label>{label}</Label><Input type="number" value={value} onChange={(e)=>set(Number(e.target.value))}/></div>}
