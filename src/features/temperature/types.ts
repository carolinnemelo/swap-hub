import { z } from "zod";
import { createService, temperatureSchema } from "./service";

export type ConvertObject = z.infer<typeof temperatureSchema>;

export type Service = ReturnType<typeof createService>;


