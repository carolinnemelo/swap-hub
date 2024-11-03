import convert from "convert-units";
import { volumeErrors } from "../error-messages";

export function convertVolume(fromUnit, toUnit, value) {
  if (!fromUnit || !toUnit || value === null || value === undefined) {
    throw new Error(volumeErrors.missingParameters);
  }
  const convertedValue = convert(value).from(fromUnit).to(toUnit);
}


