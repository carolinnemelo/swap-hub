import convert from "convert-units";
import { volumeErrors } from "../error-messages";

export function convertVolume(fromUnit, toUnit, value) {
  if (!fromUnit || !toUnit || value === null || value === undefined) {
    throw new Error(volumeErrors.missingParameters);
  }
  const convertedValue = convert(value).from(fromUnit).to(toUnit);
  return convertedValue;
}

export function parseValue(value) {
  value = Number(value);
  if (isNaN(value)) {
    throw new Error(volumeErrors.invalidValue);
  }
  if (value < 0) {
    throw new Error(volumeErrors.negativeValue);
  }
  return value;
}

export function normalizeUnit(unit: string, volumeUnits) {
  unit = unit.toLowerCase(); 
  try {
    const values = Object.values(volumeUnits.volumeUnits);
    const unitByValue = values.filter((value) => value === unit);
    if (unitByValue.length === 0) {
      return volumeUnits.volumeUnits[unit];
    }
    return unitByValue[0];
  } catch {
    throw new Error(volumeErrors.invalidUnit);
  }
}
