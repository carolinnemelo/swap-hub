import convert, { Unit } from "convert-units";

export function convertTemperature(fromUnit, toUnit, value: number) {

  const convertedValue = convert(value).from(fromUnit).to(toUnit);

  return convertedValue;
}


