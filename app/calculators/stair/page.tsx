import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { StairCalculator } from "@/features/calculators/stair/stair-calculator";

export const metadata: Metadata = { title: "Stair Calculator", description: "Professional stair calculator with live SVG diagram, Blondel validation, NBR 9050 guidance, and PDF export." };

export default function StairPage() {
  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><Badge>Flagship calculator</Badge><h1 className="mt-5 font-display text-4xl font-bold text-gradient sm:text-5xl">Professional Stair Calculator</h1><p className="mt-4 max-w-3xl text-muted">Validate risers, treads, slope angle, Blondel ergonomics, accessibility guidance, landings, and export-ready drawings in one production workflow.</p><div className="mt-10"><StairCalculator /></div></main>;
}
