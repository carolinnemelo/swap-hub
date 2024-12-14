import { z } from "zod";
import { volumeSchema } from "./z-schema";
import { createService } from "./service";
import { createRepository } from "./repository";

export type VolumeSchemaObject = z.infer<typeof volumeSchema>;

export type Repository = ReturnType< typeof createRepository> ;
export type Service = ReturnType<typeof createService>;