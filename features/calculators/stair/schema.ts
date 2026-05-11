import { z } from "zod";

export const stairSchema = z.object({
  floorHeight: z.coerce.number().min(120).max(600),
  availableLength: z.coerce.number().min(120).max(2000),
  stairWidth: z.coerce.number().min(60).max(400),
  stairType: z.enum(["straight", "l-shaped", "u-shaped"]),
  riserPreference: z.coerce.number().min(14).max(19)
});

export type StairFormValues = z.infer<typeof stairSchema>;
