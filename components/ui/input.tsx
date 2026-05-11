import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("h-11 w-full rounded-2xl border border-border bg-white/[0.04] px-4 text-sm text-white placeholder:text-muted/70 transition focus-ring hover:bg-white/[0.06]", className)}
    {...props}
  />
));
Input.displayName = "Input";
