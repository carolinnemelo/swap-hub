import { z } from "zod";
import { createService } from "./service";
import { temperatureSchema } from "./z-schema";

export type ConvertObject = z.infer<typeof temperatureSchema>;

export type Service = ReturnType<typeof createService>;


