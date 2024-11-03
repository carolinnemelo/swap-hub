import { z } from "zod";
import { normalizeUnit } from "./logic";

type ConvertObject = z.infer<typeof temperatureSchema>

export const temperatureSchema = z.object({
  fromUnit: z
    .string()
    .max(10)
    .transform((unit) => normalizeUnit(unit)),
  toUnit: z
    .string()
    .max(10)
    .transform((unit) => normalizeUnit(unit)),
  value: z.number().transform(() => {}),
});
