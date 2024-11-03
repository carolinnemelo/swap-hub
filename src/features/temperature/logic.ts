import { error } from "console";
import convert from "convert-units";
import { temperatureErrors } from "./error-messages";

export function convertTemperature(fromUnit, toUnit, value: number) {
  if (!fromUnit || !toUnit || !value) {
    return "fail";
  }
  fromUnit = normalizeUnit(fromUnit);
  toUnit = normalizeUnit(toUnit);
  const convertedValue = convert(value).from(fromUnit).to(toUnit);

  return convertedValue;
}

export function normalizeUnit(unit: string) {
  unit = unit.toLowerCase();
  if (unit === "c" || unit === "celsius") {
    return "C";
  }
  if (unit === "f" || unit === "fahrenheit") {
    return "F";
  }
  if (unit === "k" || unit === "kelvin") {
    return "K";
  }

  return "Not a acceptable unit";
}

export function isTemperatureRangeValid(fromUnit, value) {
  if (fromUnit === "K" && value < 0) {
    throw new Error(temperatureErrors.kelvin);
  }

  if (fromUnit === "C" && value < -273.15) {
    throw new Error(temperatureErrors.celsius);
  }

  if (fromUnit === "F" && value < -459.67) {
    throw new Error(temperatureErrors.fahrenheit);
  }

  return true;
}
