import { z } from "zod";

export const temperatureSchema = z.object({
  fromUnit: z.string().min(1),
  toUnit: z.string().min(1),
  value: z.string(),
});
