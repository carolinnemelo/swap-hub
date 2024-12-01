import fs from "fs";
import { volumeSchema } from "./z-schema";
import {
  convertVolume as convertLogic,
  normalizeUnit,
  parseValue,
} from "./logic";
import { v4 } from "uuid";

export function createService() {
  return {
    async getHistory() {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        if (!files) {
          reject();
          return;
        }
        resolve(files);
      });
    },

    async getHistoryByDate(date) {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        const file = files.find((file) => file === `${date}.json`);
        if (!file) {
          reject();
          return;
        }
        resolve(file);
      });
    },

    async deleteHistoryByDate(date: string) {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        const file = files.find((file) => file === `${date}.json`);
        if (!file) {
          reject();
          return;
        }
        fs.unlinkSync(`data/volume-conversions-day/${file}`);
        resolve("deleted");
      });
    },

    async getVolumeUnits() {
      return new Promise((resolve, reject) => {
        fs.readFile(
          "src/features/volume/volume.json",
          "utf-8",
          (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            const volumeUnits = JSON.parse(data)[0].volumeUnits;
            resolve(volumeUnits);
          },
        );
      });
    },

    async convertVolume(body) {
      try {
        volumeSchema.parse(body);
        const volumeUnits = await this.getVolumeUnits();
        const parsedInputs = await this.parseVolumeInputs(body, volumeUnits);

        let { fromUnit, toUnit, value } = parsedInputs;
        const convertedValue = convertLogic(fromUnit, toUnit, value);
        await this.saveConversion({ fromUnit, toUnit, value, convertedValue });
        return convertedValue;
      } catch (error) {
        return;
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

    async generateId() {
      return v4();
    },

    async saveConversion({ fromUnit, toUnit, value, convertedValue }) {
      const id = await this.generateId();
      const { filePath, time } = await this.createConversionFilePerDay();
      const conversion = {
        id,
        time,
        fromUnit,
        value,
        toUnit,
        convertedValue,
      };
      const fileContent = await new Promise((resolve, reject) => {
        fs.readFile(
          "data/volume-conversions-day/2024-dec-01.json",
          "utf-8",
          (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(data);
            return;
          },
        );
      });
      if (typeof fileContent !== "string") {
        return;
      }
      const currentConversions = JSON.parse(fileContent);
      currentConversions.push(conversion);
      fs.writeFileSync(filePath, JSON.stringify(currentConversions, null, 2));
      return;
    },

    createConversionFilePerDay() {
      return new Promise((resolve, reject) => {
        try {
          if (!fs.existsSync("data/volume-conversions-day")) {
            fs.mkdirSync("data/volume-conversions-day", { recursive: true });
          }
          const day = new Date().toString().toLowerCase();
          const dayArray = day.split(" ");
          const fileName = `${dayArray[3]}-${dayArray[1]}-${dayArray[2]}`;
          const time = dayArray[4];
          const filePath = `data/volume-conversions-day/${fileName}.json`;
          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "[]", "utf-8");
          }
          resolve({ filePath, time });
          return;
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
