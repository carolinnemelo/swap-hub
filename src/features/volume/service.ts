import fs from "fs";
import { volumeSchema } from "./z-schema";
import { normalizeUnit, parseValue } from "./logic";
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
        fs.readFile("./data/volume.json", "utf-8", (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          const temperatureUnits = JSON.parse(data)[0].volumeUnits;
          resolve(temperatureUnits);
        });
      });
    },

    async convertVolume(body) {
      try {
        volumeSchema.parse(body);
        const volumeUnits = this.getVolumeUnits();
        const parsedInputs = this.parseVolumeInputs(body, volumeUnits);
        const { fromUnit, toUnit, value } = parsedInputs;
        const convertedValue = this.convertVolume(fromUnit, toUnit, value);
        this.saveConversion({ fromUnit, toUnit, value, convertedValue });
        return convertedValue;
      } catch (error) {
        return;
      }
    },

    async parseVolumeInputs(req, volumeUnits) {
      let { fromUnit, toUnit, value } = req;
      try {
        fromUnit = normalizeUnit(fromUnit, volumeUnits);
        toUnit = normalizeUnit(toUnit, volumeUnits);
        value = parseValue(value);
        return { fromUnit, toUnit, value };
      } catch (error) {
        return error.message;
      }
    },

    async generateId() {
      return v4();
    },

    async saveConversion({ fromUnit, toUnit, value, convertedValue }) {
      const id = this.generateId();
      const { filePath, time } = this.createConversionFilePerDay();
      const conversion = {
        id,
        time,
        fromUnit,
        value,
        toUnit,
        convertedValue,
      };
      const fileContent = this.readJsonContent(filePath);
      const currentConversions = JSON.parse(fileContent);
      currentConversions.push(conversion);
      fs.writeFileSync(filePath, JSON.stringify(currentConversions, null, 2));
    },

    createConversionFilePerDay() {
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
      return { filePath, time };
    },
  };
}
