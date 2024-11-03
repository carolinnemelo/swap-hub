import { z } from "zod";

type ConvertObject = z.infer<typeof temperatureSchema>

export const temperatureSchema = z.object({
  fromUnit: z.string(),
  toUnit: z.string(),
  value: z.number(),
});
