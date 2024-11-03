import { z } from "zod";

type ConvertObject = z.infer<typeof temperatureSchema>

export const temperatureSchema = z.object({
  fromUnit: z.string().max(10).min(1),
  toUnit: z.string().max(10).min(1),
  value: z.string(),
});