import { Router } from "express";
import fs from "fs";
import { ZodError } from "zod";
import { volumeSchema } from "./types";
import { convertVolume, parseVolumeInputs } from "./logic";
import { v4 } from "uuid";

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
          const parsedInputs = parseVolumeInputs(req.body);
          const { fromUnit, toUnit, value } = parsedInputs;
          const convertedValue = convertVolume(fromUnit, toUnit, value);
          res.status(200).send({ convertedValue });
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

      return router;
    },
  };
}

function generateId() {
  return v4();
}


 function saveConversion({ fromUnit, toUnit, value, convertedValue }) {
   const id = generateId();
   const { filePath, time } = createConversionFilePerDay();
   const conversion = {
     id,
     time,
     fromUnit,
     value,
     toUnit,
     convertedValue,
   };
   const fileContent = fs.readFileSync(filePath, "utf-8");
   const currentConversions = JSON.parse(fileContent);
   currentConversions.push(conversion);
   fs.writeFileSync(filePath, JSON.stringify(currentConversions, null, 2));
 }

 function createConversionFilePerDay() {
   if (!fs.existsSync("data/volume-conversions-day")) {
     fs.mkdirSync("data/volume-conversions-day", { recursive: true });
   }
   const day = new Date().toString();
   const dayArray = day.split(" ");
   const fileName = `${dayArray[3]}-${dayArray[1]}-${dayArray[2]}`;
   const time = dayArray[4];
   const filePath = `data/volume-conversions-day/${fileName}.json`;
   if (!fs.existsSync(filePath)) {
     fs.writeFileSync(filePath, "[]", "utf-8");
   }
   return { filePath, time };
 }
