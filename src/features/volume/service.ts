import { Repository } from "./types";
import { volumeSchema } from "./z-schema";
import {
  convertVolume as convertLogic,
  normalizeUnit,
  parseValue,
} from "./logic";
import { v4 } from "uuid";

export function createService(repository: Repository) {
  return {
    async getHistory() {
      return repository.getHistory();
    },

    async getHistoryByDate(date: string) {
      return repository.getHistoryByDate(date);
    },

    async deleteHistoryByDate(date: string) {
      return repository.deleteHistoryByDate(date);
    },

    async getVolumeUnits() {
      return repository.getVolumeUnits();
    },

    async convertVolume(body) {
      try {
        volumeSchema.parse(body);
        const volumeUnits = await repository.getVolumeUnits();

        const parsedInputs = await this.parseVolumeInputs(body, volumeUnits);
        const { fromUnit, toUnit, value } = parsedInputs;

        const convertedValue = convertLogic(fromUnit, toUnit, value);

        await this.saveConversion({
          fromUnit,
          toUnit,
          value,
          convertedValue,
        });
        return convertedValue;
      } catch (error) {
        return error.message;
      }
    },

    async parseVolumeInputs(body, volumeUnits) {
      try {
        const rawFromUnit = body.fromUnit;
        const fromUnit = await normalizeUnit(rawFromUnit, volumeUnits);
        const rawToUnit = body.toUnit;
        const rawValue = body.value;
        const toUnit = normalizeUnit(rawToUnit, volumeUnits);
        const value = parseValue(rawValue);
        return { fromUnit, toUnit, value };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async saveConversion({ fromUnit, toUnit, value, convertedValue }) {
      const { filePath, time } = await this.createConversionFilePerDay();
      const id = await this.generateId();
      const conversion = {
        id,
        time,
        fromUnit,
        value,
        toUnit,
        convertedValue,
      };
      await repository.saveConversion({ filePath, conversion });
    },

    async generateId() {
      return v4();
    },

    createConversionFilePerDay() {
      return repository.createConversionFilePerDay();
    },
  };
}
