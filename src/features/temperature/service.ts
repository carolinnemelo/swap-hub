import fs from "fs";
import { convertTemperature, isTemperatureRangeValid, normalizeUnit } from "./logic";
import { ConvertObject } from "./types";
import { temperatureSchema } from "./z-schema";

export function createService() {
  return {
    async getTemperatureUnits() {
      return new Promise((resolve, reject) => {
        fs.readFile("src/features/temperature/temperature.json", "utf-8", (error, data) => {
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
        const parsedInputs = await this.parseTemperatureInputs(body);
        const { fromUnit, toUnit, value } = parsedInputs;
        console.log({parsedInputs})
        const convertedValue = convertTemperature(fromUnit, toUnit, value);
        return convertedValue.toString();
      } catch (error) {
        return;
      }
    },
    
    async parseTemperatureInputs(req) {
      let { fromUnit, toUnit, value } = req;
      try {
        fromUnit = normalizeUnit(fromUnit);
        toUnit = normalizeUnit(toUnit);
        isTemperatureRangeValid(fromUnit, value);
        return { fromUnit, toUnit, value };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
}
