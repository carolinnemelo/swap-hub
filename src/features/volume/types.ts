import { z } from "zod";
import { volumeSchema } from "./z-schema";
import { createService } from "./service";

export type VolumeSchemaObject = z.infer<typeof volumeSchema>;

export type Service = ReturnType<typeof createService>;