import convert, { Unit } from "convert-units";

export function convertTemperature(
  value: number,
  fromUnit: Unit,
  toUnit: Unit
) {
  const convertedValue = convert(value).from(fromUnit).to(toUnit);

  return convertedValue;
}


