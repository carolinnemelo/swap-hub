import convert, { Unit } from "convert-units";

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
  if (unit === "c" || unit ==="celsius") {
    return "C";
  }
  if (unit === "f" || unit ==="fahrenheit") {
    return "F";
  }
  if (unit === "k" || unit ==="kelvin") {
    return "K";
  }

  return "Not a acceptable unit";
}