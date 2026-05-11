import Link from "next/link";
import { Calculator, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/calculators/stair", label: "Calculators" },
  { href: "/documentation", label: "Documentation" },
  { href: "/pricing", label: "Pricing" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-3 focus-ring rounded-2xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary shadow-glow"><Calculator className="h-5 w-5" /></span>
          <span className="font-display text-lg font-bold tracking-tight">ArchMetrics</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-2 text-sm text-muted transition hover:bg-white/[0.06] hover:text-white">{link.label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Dark mode enabled"><Moon className="h-4 w-4" /></Button>
          <Button variant="secondary" size="sm" asChild><Link href="/api/auth/signin">Login</Link></Button>
          <Button size="sm" className="hidden sm:inline-flex" asChild><Link href="/dashboard"><Sparkles className="h-4 w-4" />Start free</Link></Button>
        </div>
      </nav>
    </header>
  );
}
