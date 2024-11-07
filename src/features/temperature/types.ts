import { z } from "zod";

type ConvertObject = z.infer<typeof temperatureSchema>;

export const temperatureSchema = z.object({
  fromUnit: z.string().min(1),
  toUnit: z.string().min(1),
  value: z.string(),
});
