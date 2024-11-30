import express from "express";
import { Service } from "./types";

export function createTemperatureRouter(service: Service) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const temperatureUnits = await service.getTemperatureUnits();
    if (!temperatureUnits) {
      res.status(401).json({ message: "error reading the file" });
    }
    res.json({ temperatureUnits });
  });

  router.get("/units", async (req, res) => {
    const temperatureUnits = await service.getTemperatureUnits();
    if (!temperatureUnits) {
      res.status(401).json({ message: "error reading the file" });
    }
    res.json({ temperatureUnits });
  });

  router.post("/convert", async (req, res) => {
    const convertedValue = await service.convertTemperature(req.body);
    if (!convertedValue) {
      res.status(401).end();
    }
    res.status(200).json({ convertedValue });
  });
  return router;
}

