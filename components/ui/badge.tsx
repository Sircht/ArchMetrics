import { cn } from "@/lib/utils";

export function Badge({ className, children }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-border bg-white/[0.06] px-3 py-1 text-xs font-medium text-secondary", className)}>{children}</span>;
}
