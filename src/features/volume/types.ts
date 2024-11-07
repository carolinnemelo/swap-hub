import { z } from "zod";

export type VolumeSchemaObject = z.infer<typeof volumeSchema>;

export const volumeSchema = z.object({
  fromUnit: z.string().max(14).min(1),
  toUnit: z.string().max(14).min(1),
  value: z.string(),
});
