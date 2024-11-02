import { Router } from "express";
import fs from "fs";

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
        router.post("/convert", (req, res) => {
          req.body.value = 298.15;
          req.body["convertedValue"] = req.body["value"];
          delete req.body["value"];
          res.status(200).send(req.body);
        });
        return router;
    },
  };
}

