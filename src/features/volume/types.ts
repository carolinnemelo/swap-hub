import { z } from "zod";
import { volumeSchema } from "./feature";

export type VolumeSchemaObject = z.infer<typeof volumeSchema>;

