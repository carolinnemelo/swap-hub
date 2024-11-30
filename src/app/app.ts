import express from "express";
import { createTemperatureFeature } from "../features/temperature/feature";


export function createApp() {
  const app = express();

  app.use(express.json());

  const temperatureFeature = createTemperatureFeature();
  app.use("/temperature", temperatureFeature.router);

  const volumeFeature = convertVolumeFeature();
  app.use("/volume", volumeFeature.getRouter());

  app.get("/", (req, res) => {
    res.status(200);
    res.send("Welcome to SwapUnit");
  });
  return app;
}
