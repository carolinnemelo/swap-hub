import convert from "convert-units";
import { volumeErrors } from "../error-messages";

export function convertVolume(fromUnit, toUnit, value) {
  if (!fromUnit || !toUnit || typeof value !== "number") {
    throw new Error(volumeErrors.missingParameters);
  }
  const convertedValue = convert(value).from(fromUnit).to(toUnit);
  return convertedValue;
}

export function parseValue(value) {
  const numberValue = Number(value);
  if (isNaN(value)) {
    throw new Error(volumeErrors.invalidValue);
  }
  if (value < 0) {
    throw new Error(volumeErrors.negativeValue);
  }
  return numberValue;
}

export function normalizeUnit(unit, volumeUnits) {
  try {
    const lowerCaseUnit = unit.toLowerCase(); 
    const keys = Object.keys(volumeUnits);
    const values = Object.values(volumeUnits); 
    if (lowerCaseUnit === "tablespoon") {
      const correctUnit = "Tbs"; 
        return correctUnit; 

    }
    if (keys.includes(lowerCaseUnit)) {
      return volumeUnits[lowerCaseUnit];
    }
    if (values.includes(lowerCaseUnit)) {
      return lowerCaseUnit;
    }
    console.log("INVALID UINT")
  } catch (error) {
    console.log(error.message);
    throw new Error(volumeErrors.invalidUnit || "Invalid unit");
  }
}
