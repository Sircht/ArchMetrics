"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LandingMotion({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={cn(className)}>{children}</motion.div>;
}
