import { Router } from "express";
import fs from "fs";
import { ZodError } from "zod";
import { volumeSchema } from "./types";
import { convertVolume} from "./logic";
import { volumeErrors } from "../error-messages";
import { getVolumeUnits, parseVolumeInputs, saveConversion } from "./conversion-handlers";

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

      router.post("/convert", (req, res) => {
        try {
          volumeSchema.parse(req.body);
          const volumeUnits = getVolumeUnits()
          const parsedInputs = parseVolumeInputs(req.body, volumeUnits);
          const { fromUnit, toUnit, value } = parsedInputs;
          const convertedValue = convertVolume(fromUnit, toUnit, value);
          res.status(201).send({ convertedValue });
          saveConversion({ fromUnit, toUnit, value, convertedValue });
        } catch (error) {
          if (error instanceof ZodError) {
            const zodErrorMessage = JSON.stringify(error.issues[0].message);
            res.status(400).send(zodErrorMessage);
          } else {
            res.status(400).send(error.message);
          }
        }
      });

      router.get("/history", (req, res) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        res.status(200).send(files);
      });

      router.get("/history/:date", (req, res) => {
        const date = req.params.date;
        const files = fs.readdirSync("data/volume-conversions-day");
        const file = files.find((file) => file === `${date}.json`);
        if (file) {
          const fileContent = JSON.parse(fs.readFileSync(`data/volume-conversions-day/${file}`, "utf-8"));
          res.status(200).send(fileContent);
        } else {
          res.status(404).send(volumeErrors.invalidFileName);
        }
      });

      router.delete("/history/:date", (req, res) => {
        const date = req.params.date;
        const files = fs.readdirSync("data/volume-conversions-day");
        const file = files.find((file) => file === `${date}.json`);
        if (file) {
          fs.unlinkSync(`data/volume-conversions-day/${file}`)
          res.status(200).send(`${file} deleted.`);
        } else {
          res.status(404).send(volumeErrors.invalidFileName);
        }
      });

      return router;
    },
  };
}
