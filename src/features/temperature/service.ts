import fs from "fs";
import { convertTemperature } from "./logic";
import { z } from "zod";
import { parseTemperatureInputs } from "./conversion-handler";
import { ConvertObject } from "./types";

export const temperatureSchema = z.object({
  fromUnit: z.string().min(1),
  toUnit: z.string().min(1),
  value: z.string(),
});

export function createService() {
  return {
    async getTemperatureUnits() {
      return new Promise((resolve, reject) => {
        fs.readFile("./data/temperature.json", "utf-8", (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          const temperatureUnits = JSON.parse(data)[0].temperatureUnits;
          resolve(temperatureUnits);
        });
      });
    },

    async convertTemperature(body: ConvertObject) {
      try {
        temperatureSchema.parse(body);
        const parsedInputs = parseTemperatureInputs(body);
        const { fromUnit, toUnit, value } = parsedInputs;
        const convertedValue = convertTemperature(fromUnit, toUnit, value);
        return convertedValue;
      } catch (error) {
        return;
      }
    },
  };
}
