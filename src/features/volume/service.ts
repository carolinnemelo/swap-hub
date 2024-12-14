import { v4 } from "uuid";
import { Repository } from "./types";

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
      return repository.convertVolume(body);
    },

    async parseVolumeInputs(body, volumeUnits) {
      return repository.parseVolumeInputs(body, volumeUnits);
    },

    async generateId() {
      return v4();
    },

    async saveConversion({ fromUnit, toUnit, value, convertedValue }) {
      return repository.saveConversion({
        fromUnit,
        toUnit,
        value,
        convertedValue,
      });
    },
    
    createConversionFilePerDay() {
      return repository.createConversionFilePerDay();
    },
  };
}
