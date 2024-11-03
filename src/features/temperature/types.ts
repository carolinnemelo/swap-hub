import { z } from "zod";
import { isTemperatureRangeValid, normalizeUnit } from "./logic";

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
  value: z.number().transform((value, fromUnit) => isTemperatureRangeValid(fromUnit, value)),
});
