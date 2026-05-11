import Link from "next/link";
import { ArrowRight, CheckCircle2, Ruler, ShieldCheck, Sparkles, Waves, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LandingMotion } from "@/components/landing-motion";
import { CalculatorPreview } from "@/features/calculators/stair/calculator-preview";

const calculators = ["Stair Calculator", "Ramp Calculator", "Scale Converter", "Built Area", "Parking Layout"];
const benefits = [
  "Real-time SVG diagrams with export-ready measurements",
  "NBR 9050 accessibility validation and ergonomic warnings",
  "Project history, favorites, and professional PDF outputs",
  "Responsive workflows for architects, students, and engineers"
];
const productCards: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Ruler, title: "Calculation-grade UX", copy: "Every input updates measurements, diagrams, and compliance feedback instantly." },
  { icon: ShieldCheck, title: "Validated by standards", copy: "NBR 9050 checks, Blondel formula bands, and ergonomic guidance are built in." },
  { icon: Waves, title: "Premium workflow", copy: "Save work, organize projects, export PDFs, and keep a searchable technical history." }
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-x-0 top-10 mx-auto h-72 max-w-4xl rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <LandingMotion className="space-y-8">
            <Badge><Sparkles className="mr-2 h-3.5 w-3.5" />Technical design intelligence for architecture teams</Badge>
            <div className="space-y-5"><h1 className="font-display text-5xl font-bold tracking-tight text-gradient sm:text-6xl lg:text-7xl">Architecture calculations that feel as precise as your drawings.</h1><p className="max-w-2xl text-lg leading-8 text-muted">ArchMetrics combines code-aware validation, live diagrams, and professional exports for stair, ramp, scale, built-area, and parking calculations.</p></div>
            <form className="glass-panel flex max-w-2xl flex-col gap-3 rounded-[1.5rem] p-2 sm:flex-row" role="search"><label className="sr-only" htmlFor="calculator-search">Search calculators</label><input id="calculator-search" className="min-h-12 flex-1 rounded-2xl bg-transparent px-4 text-white outline-none placeholder:text-muted" placeholder="Search stair, ramp, scale…" /><Button asChild size="lg"><Link href="/calculators/stair">Open flagship stair tool<ArrowRight className="h-4 w-4" /></Link></Button></form>
            <div className="flex flex-wrap gap-3">{calculators.map((item) => <span key={item} className="rounded-full border border-border bg-white/[0.04] px-4 py-2 text-sm text-muted">{item}</span>)}</div>
          </LandingMotion>
          <LandingMotion delay={0.15}><CalculatorPreview /></LandingMotion>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-3">{productCards.map(({ icon: Icon, title, copy }) => <Card key={title} className="p-6"><Icon className="mb-5 h-6 w-6 text-secondary" /><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></Card>)}</div></section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8"><div><Badge>Technical accuracy</Badge><h2 className="mt-5 font-display text-4xl font-bold">Designed for professional confidence, not napkin math.</h2></div><div className="space-y-4">{benefits.map((benefit) => <div key={benefit} className="flex gap-3 rounded-2xl border border-border bg-white/[0.035] p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /><p className="text-muted">{benefit}</p></div>)}</div></section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><Card className="overflow-hidden p-8 md:p-12"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><Badge>Trusted by studios</Badge><h2 className="mt-5 font-display text-4xl font-bold">“The fastest way to validate stairs before committing to a section.”</h2><p className="mt-4 text-muted">Early testers use ArchMetrics to cut iteration time and document design decisions with clear, accessible outputs.</p></div><div className="grid gap-4 sm:grid-cols-3">{["42% faster checks", "5 flagship tools", "WCAG-aware UI"].map((stat) => <div key={stat} className="rounded-2xl bg-white/[0.05] p-5 text-center font-display text-2xl font-bold">{stat}</div>)}</div></div></Card></section>
      <footer className="border-t border-border px-4 py-10 text-center text-sm text-muted">© 2026 ArchMetrics. Precision tools for the built environment.</footer>
    </main>
  );
}
