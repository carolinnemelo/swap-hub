import convert from "convert-units";
import { volumeErrors } from "../error-messages";
import fs from "fs";

export function parseVolumeInputs(req) {
  let { fromUnit, toUnit } = req;
  try {
    fromUnit = normalizeUnit(fromUnit);
    toUnit = normalizeUnit(toUnit);

    return { fromUnit, toUnit };
  } catch (error) {
    return  error.message;
  }
}

export function convertVolume(fromUnit, toUnit, value) {
  if (!fromUnit || !toUnit || value === null || value === undefined) {
    throw new Error(volumeErrors.missingParameters);
  }
  const convertedValue = convert(value).from(fromUnit).to(toUnit);
  return convertedValue;
}

export function normalizeUnit(unit: string) {
  unit = unit.toLowerCase();
  try {
    const data = JSON.parse(fs.readFileSync("./data/volume.json", "utf-8"));
    const volumeUnits = data[0].volumeUnits;
    if (volumeUnits[unit]) {
      return volumeUnits[unit];
    }
    const values = Object.values(volumeUnits);
    const unitByValue = values.filter((value) => value === unit);
    console.log({ unitByValue });
    return unit[0];
  } catch {
    throw new Error(volumeErrors.invalidUnit);
  }
}