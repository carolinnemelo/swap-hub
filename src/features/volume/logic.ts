import convert from "convert-units";
import { volumeErrors } from "../error-messages";
import fs from "fs";


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

export function normalizeUnit(unit: string, volumeUnits) {
  unit = unit.toLowerCase();
  try {
    if (volumeUnits[unit]) {
      return volumeUnits[unit];
    }
    const values = Object.values(volumeUnits);
    const unitByValue = values.filter((value) => value === unit);
    return unit[0];
  } catch {
    throw new Error(volumeErrors.invalidUnit);
  }
}