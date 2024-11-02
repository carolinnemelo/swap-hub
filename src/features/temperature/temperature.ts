import { Router } from "express";
import fs from "fs";

export function convertTemperatureFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", async (req, res) => {
          fs.readFile("./data/temperature.json", "utf-8", (error, data) => {
            if (error) {
              console.log(error)
              res.status(401).send("error reading the file")
            }
            const parsedData = JSON.parse(data);
            res.status(200).send(parsedData);
          });
          
      });
      return router;
    },
  };
}

