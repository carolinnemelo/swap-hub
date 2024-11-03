import convert from "convert-units";
import { volumeErrors } from "../error-messages";
import fs from "fs";

export function parseVolumeInputs(req) {
  let { fromUnit, toUnit, value } = req;
  try {
    fromUnit = normalizeUnit(fromUnit);
    toUnit = normalizeUnit(toUnit);
    value = parseValue(value)
    return { fromUnit, toUnit, value };
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

export function parseValue (value) {
  value = Number(value);
  if(isNaN(value)) {
    throw new Error(volumeErrors.invalidValue);
  }
  if(value< 0) {
    throw new Error(volumeErrors.negativeValue);
  }
return value
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