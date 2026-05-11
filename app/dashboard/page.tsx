import { Clock, FileDown, FolderKanban, Star, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const items: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: FolderKanban, title: "Projects", copy: "Organize calculations by client, studio, semester, or construction phase." },
  { icon: Clock, title: "History", copy: "Reopen previous stair, ramp, scale, built-area, and parking calculations." },
  { icon: Star, title: "Favorites", copy: "Pin high-frequency tools to reduce repetitive navigation." },
  { icon: FileDown, title: "Exports", copy: "Download technical PDFs and images for coordination packets." }
];

export default function DashboardPage(){return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h1 className="font-display text-5xl font-bold text-gradient">Workspace dashboard</h1><p className="mt-4 max-w-3xl text-muted">A production SaaS command center for saved calculations, favorites, project organization, and export management.</p><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{items.map(({ icon: Icon, title, copy })=><Card key={title} className="p-6"><Icon className="h-6 w-6 text-secondary"/><h2 className="mt-5 font-display text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></Card>)}</div></main>}
