import { Card } from "@/components/ui/card";
import { StairDiagram } from "./stair-diagram";
import { calculateStair } from "./calculate-stair";

export function CalculatorPreview() {
  const result = calculateStair({ floorHeight: 306, availableLength: 520, stairWidth: 130, stairType: "straight", riserPreference: 17 });
  return <Card className="p-4"><div className="mb-4 flex items-center justify-between px-2"><p className="font-display text-lg font-semibold">Live stair section</p><span className="rounded-full bg-success/15 px-3 py-1 text-xs text-success">Compliant</span></div><StairDiagram result={result} /></Card>;
}
