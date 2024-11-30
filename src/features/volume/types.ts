import { z } from "zod";
import { volumeSchema } from "./z-schema";

export type VolumeSchemaObject = z.infer<typeof volumeSchema>;

