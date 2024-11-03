import { z } from "zod";
import { volumeErrors } from "../error-messages";

type ConvertObject = z.infer<typeof volumeSchema>

export const volumeSchema = z.object({
  fromUnit: z.string().max(14).min(1),
  toUnit: z.string().max(14).min(1),
  value: z.string(),
});

