import express from "express";
import { convertTemperatureFeature } from "../features/temperature/temperature";
import { convertVolumeFeature } from "../features/volume/volume";

export function createApp() {
  const app = express();

  app.use(express.json());

  const temperatureFeature = convertTemperatureFeature();
  app.use("/temperature", temperatureFeature.getRouter());

  const volumeFeature = convertVolumeFeature();
  app.use("/volume", volumeFeature.getRouter());


  app.get("/", (req, res) => {
    res.status(200);
    res.send("createApp function");
  });
  return app;
}
