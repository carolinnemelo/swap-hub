import { z } from "zod";

export const volumeSchema = z.object({
  fromUnit: z.string().min(1),
  toUnit: z.string().min(1),
  value: z.string(),
});