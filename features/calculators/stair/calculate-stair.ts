import type { ValidationMessage } from "@/types/calculators";
import type { StairFormValues } from "./schema";

export interface StairResult {
  riserHeight: number;
  treadDepth: number;
  steps: number;
  totalRun: number;
  slopeAngle: number;
  blondel: number;
  landings: number;
  messages: ValidationMessage[];
}

export function calculateStair(input: StairFormValues): StairResult {
  const steps = Math.max(2, Math.round(input.floorHeight / input.riserPreference));
  const riserHeight = input.floorHeight / steps;
  const maxRun = input.stairType === "straight" ? input.availableLength : input.availableLength * 0.92;
  const treadDepth = maxRun / steps;
  const totalRun = treadDepth * steps;
  const slopeAngle = Math.atan(input.floorHeight / totalRun) * (180 / Math.PI);
  const blondel = 2 * riserHeight + treadDepth;
  const landings = input.stairType === "straight" ? Math.max(0, Math.floor(steps / 16)) : 1;
  const messages: ValidationMessage[] = [];

  messages.push(blondel >= 63 && blondel <= 65
    ? { label: "Blondel formula", message: `${blondel.toFixed(1)} cm is inside the 63–65 cm comfort band.`, severity: "success" }
    : { label: "Blondel formula", message: `${blondel.toFixed(1)} cm is outside the preferred 63–65 cm ergonomic band.`, severity: "warning" });

  messages.push(riserHeight >= 16 && riserHeight <= 18
    ? { label: "Riser comfort", message: `${riserHeight.toFixed(2)} cm risers are comfortable for daily use.`, severity: "success" }
    : { label: "Riser comfort", message: "Adjust floor height distribution or riser preference to target 16–18 cm.", severity: "warning" });

  messages.push(treadDepth >= 28
    ? { label: "Tread depth", message: `${treadDepth.toFixed(2)} cm treads satisfy a professional comfort target.`, severity: "success" }
    : { label: "Tread depth", message: "Tread depth is below 28 cm. Increase horizontal length or reduce riser count.", severity: "danger" });

  messages.push(input.stairWidth >= 120
    ? { label: "NBR 9050 circulation", message: "Width supports accessible public circulation planning guidance.", severity: "success" }
    : { label: "NBR 9050 circulation", message: "Consider at least 120 cm clear width for accessible public routes.", severity: "warning" });

  messages.push(slopeAngle >= 30 && slopeAngle <= 37
    ? { label: "Slope angle", message: `${slopeAngle.toFixed(1)}° is within the common architectural stair range.`, severity: "success" }
    : { label: "Slope angle", message: `${slopeAngle.toFixed(1)}° may feel too shallow or too steep.`, severity: "warning" });

  return { riserHeight, treadDepth, steps, totalRun, slopeAngle, blondel, landings, messages };
}
