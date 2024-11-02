import express from "express";
import { convertTemperatureFeature } from "../features/temperature/temperature";

export function createApp() {
  const app = express();

  app.use(express.json());

  const temperatureFeature = convertTemperatureFeature()
  app.use("/temperature", temperatureFeature.getRouter() )

  app.get("/status", (req, res) => {
    res.status(200);
    res.send("createApp function");
  });
  return app;
}
