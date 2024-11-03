import { Router } from "express";
import fs from "fs";

export function convertVolumeFeature() {
  return {
    getRouter() {
      const router = Router();

      router.get("/", (req, res) => {
        fs.readFile("./data/volume.json", "utf-8", (error, data) => {
          if (error) {
            console.log(error);
            res.status(401).send("error reading the file" + error);
          }
          const volumeUnits = JSON.parse(data)[0].volumeUnits;
          res.status(200).send(volumeUnits);
        });
      });
      return router;
    },
  };
}
