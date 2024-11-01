import express from "express";
import { convertTemperatureFeature } from "../features";


export function createApp() { 
  const app = express();

  app.use(express.json());
  app.get("/status", (req, res) => {
    res.status(200).end()
  });

  const temperatureFeature = convertTemperatureFeature()

  return app
}
