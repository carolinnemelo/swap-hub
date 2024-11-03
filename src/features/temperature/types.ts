import { z } from "zod";
import { isTemperatureRangeValid, normalizeUnit } from "./logic";

type ConvertObject = z.infer<typeof temperatureSchema>

export const temperatureSchema = z.object({
  fromUnit: z
    .string()
    .max(10)
    .transform((fromUnit) => normalizeUnit(fromUnit)),
  toUnit: z
    .string()
    .max(10)
    .transform((toUnit) => normalizeUnit(toUnit)),
  value: z.number(),
});
