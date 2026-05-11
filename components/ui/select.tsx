import type * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({ className, children }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) {
  return <SelectPrimitive.Trigger className={cn("flex h-11 w-full items-center justify-between rounded-2xl border border-border bg-white/[0.04] px-4 text-sm text-white focus-ring", className)}>{children}<ChevronDown className="h-4 w-4 text-muted" /></SelectPrimitive.Trigger>;
}

export function SelectContent({ className, children }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
  return <SelectPrimitive.Portal><SelectPrimitive.Content className={cn("z-50 overflow-hidden rounded-2xl border border-border bg-surface p-1 text-white shadow-premium", className)}><SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport></SelectPrimitive.Content></SelectPrimitive.Portal>;
}

export function SelectItem({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) {
  return <SelectPrimitive.Item className={cn("relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm outline-none data-[highlighted]:bg-white/[0.08]", className)} {...props}><SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText><SelectPrimitive.ItemIndicator className="absolute right-3"><Check className="h-4 w-4" /></SelectPrimitive.ItemIndicator></SelectPrimitive.Item>;
}
