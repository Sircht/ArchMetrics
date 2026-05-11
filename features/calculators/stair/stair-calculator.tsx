"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileDown, Save } from "lucide-react";
import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber } from "@/lib/utils";
import { useCalculationStore } from "@/lib/store";
import { calculateStair } from "./calculate-stair";
import { StairDiagram } from "./stair-diagram";
import { stairSchema, type StairFormValues } from "./schema";

const defaults: StairFormValues = { floorHeight: 306, availableLength: 520, stairWidth: 130, stairType: "straight", riserPreference: 17 };

export function StairCalculator() {
  const [isPending, startTransition] = useTransition();
  const addHistory = useCalculationStore((state) => state.addHistory);
  const { register, watch, setValue, formState: { errors } } = useForm<StairFormValues>({ resolver: zodResolver(stairSchema), defaultValues: defaults, mode: "onChange" });
  const values = watch();
  const result = useMemo(() => {
    const parsed = stairSchema.safeParse(values);
    return calculateStair(parsed.success ? parsed.data : defaults);
  }, [values]);

  async function exportImage() {
    const node = document.getElementById("stair-diagram");
    if (!node) return;
    const dataUrl = await toPng(node, { pixelRatio: 2, backgroundColor: "#050816" });
    const link = document.createElement("a");
    link.download = "archmetrics-stair-diagram.png";
    link.href = dataUrl;
    link.click();
  }

  async function exportPdf() {
    const node = document.getElementById("stair-diagram");
    if (!node) return;
    const dataUrl = await toPng(node, { pixelRatio: 2, backgroundColor: "#050816" });
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    pdf.setTextColor(20, 20, 30);
    pdf.setFontSize(18);
    pdf.text("ArchMetrics Stair Calculation", 16, 18);
    pdf.setFontSize(10);
    pdf.text(`Riser ${formatNumber(result.riserHeight)} cm · Tread ${formatNumber(result.treadDepth)} cm · Blondel ${formatNumber(result.blondel)} cm`, 16, 26);
    pdf.addImage(dataUrl, "PNG", 16, 34, 265, 145);
    pdf.save("archmetrics-stair-calculation.pdf");
  }

  function saveCalculation() {
    startTransition(() => addHistory({ id: crypto.randomUUID(), tool: "Stair Calculator", createdAt: new Date().toISOString(), summary: `${result.steps} risers · ${formatNumber(result.riserHeight)} cm riser · ${formatNumber(result.treadDepth)} cm tread` }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <Card className="p-6">
        <div className="mb-6"><h2 className="font-display text-2xl font-semibold">Stair parameters</h2><p className="mt-2 text-sm text-muted">All dimensions are in centimeters and update the technical model in real time.</p></div>
        <div className="space-y-5">
          {[ ["floorHeight", "Floor-to-floor height"], ["availableLength", "Available horizontal length"], ["stairWidth", "Stair width"], ["riserPreference", "Preferred riser height"] ].map(([name, label]) => (
            <div key={name} className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} type="number" step="0.1" {...register(name as keyof StairFormValues)} />{errors[name as keyof StairFormValues] && <p className="text-xs text-danger">Enter a professional value within the accepted range.</p>}</div>
          ))}
          <div className="space-y-2"><Label>Stair type</Label><Select value={values.stairType} onValueChange={(value) => setValue("stairType", value as StairFormValues["stairType"], { shouldValidate: true })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="straight">Straight flight</SelectItem><SelectItem value="l-shaped">L-shaped with landing</SelectItem><SelectItem value="u-shaped">U-shaped switchback</SelectItem></SelectContent></Select></div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2"><Button variant="secondary" onClick={saveCalculation}><Save className="h-4 w-4" />Save</Button><Button variant="secondary" onClick={exportImage}><Download className="h-4 w-4" />PNG</Button><Button onClick={exportPdf} disabled={isPending}><FileDown className="h-4 w-4" />PDF</Button></div>
      </Card>

      <div className="space-y-6">
        <Card className="p-4"><StairDiagram result={result} /></Card>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Riser height", `${formatNumber(result.riserHeight)} cm`], ["Tread depth", `${formatNumber(result.treadDepth)} cm`], ["Total run", `${formatNumber(result.totalRun)} cm`], ["Slope angle", `${formatNumber(result.slopeAngle, 1)}°`], ["Blondel", `${formatNumber(result.blondel)} cm`], ["Landings", String(result.landings)]
          ].map(([label, value]) => <Card key={label} className="p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p><p className="mt-2 font-display text-2xl font-bold">{value}</p></Card>)}
        </div>
        <Card className="p-6"><h3 className="font-display text-xl font-semibold">Technical validation</h3><div className="mt-4 space-y-3">{result.messages.map((message) => <div key={message.label} className="rounded-2xl border border-border bg-white/[0.035] p-4"><div className={`text-sm font-semibold ${message.severity === "success" ? "text-success" : message.severity === "danger" ? "text-danger" : "text-warning"}`}>{message.label}</div><p className="mt-1 text-sm text-muted">{message.message}</p></div>)}</div></Card>
      </div>
    </div>
  );
}
