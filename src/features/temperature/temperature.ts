import { Router } from "express";
import fs from "fs";
import { convertTemperature, isTemperatureRangeValid, normalizeUnit } from "./logic";
import { temperatureSchema } from "./types";

export function convertTemperatureFeature() {
  return {
    getRouter() {
      const router = Router();

      router.get("/", (req, res) => {
        fs.readFile("./data/temperature.json", "utf-8", (error, data) => {
          if (error) {
            console.log(error);
            res.status(401).send("error reading the file" + error);
          }
          const temperatureUnits = JSON.parse(data)[0].temperatureUnits;
          res.status(200).send(temperatureUnits);
        });
      });

      router.get("/units", (req, res) => {
        fs.readFile("./data/temperature.json", "utf-8", (error, data) => {
          if (error) {
            console.log(error);
            res.status(401).send("error reading the file" + error);
          }
          const temperatureUnits = JSON.parse(data)[0].temperatureUnits;
          res.status(200).send(temperatureUnits);
        });
      });

      router.post("/convert", (req, res) => {
        temperatureSchema.parse(req.body)
        const { fromUnit, toUnit, value } = req.body

        const convertedValue = convertTemperature(fromUnit, toUnit, value);
        res.status(200).send({convertedValue});
      });
      return router;
    },
  };
}

