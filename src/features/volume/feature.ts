import express from "express";
import fs from "fs";
import { z } from "zod";
import { convertVolume, normalizeUnit, parseValue } from "./logic";
import { v4 } from "uuid";
import { VolumeSchemaObject } from "./types";

export const volumeSchema = z.object({
  fromUnit: z.string().max(14).min(1),
  toUnit: z.string().max(14).min(1),
  value: z.string(),
});

export function createTemperatureFeature() {
  const service = createService();
  const router = createVolumeRouter(service);

  return {
    service,
    router,
  };
}

export function createVolumeRouter(service) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const volumeUnits = await service.getVolumeUnits();
    if (!volumeUnits) {
      res.status(401).json({ message: "error reading the file" });
    }
    res.json({ volumeUnits });
  });

  router.post("/convert", async (req, res) => {
    const convertedValue = await service.convertVolume(req.body);
    if (!convertedValue) {
      res.status(401).end();
    }
    res.json({ convertedValue });
  });

  router.get("/history", async (req, res) => {
    const files = await service.getHistory();
    if (!files) {
      res.status(404).end();
    }
    res.json({ files });
  });

  router.get("/history/:date", async (req, res) => {
    const date = req.params.date;
    const file = await service.getHistoryByDate(date);
    if (!file) {
      res.status(404).end();
    }
    res.json({ file });

  });

  router.delete("/history/:date", async (req, res) => {
    const date = req.params.date;
    const file = await service.deleteHistoryByDate(date)
    if (!file) {
      res.status(404).end();
    }
    res.json({ message: "Deleted" });

  });

  return router;
}

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
        resolve("deleted")
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

    async convertVolume(body: VolumeSchemaObject) {
      try {
        volumeSchema.parse(body);
        const volumeUnits = this.getVolumeUnits();
        const parsedInputs = this.parseVolumeInputs(body, volumeUnits);
        const { fromUnit, toUnit, value } = parsedInputs;
        const convertedValue = convertVolume(fromUnit, toUnit, value);
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
