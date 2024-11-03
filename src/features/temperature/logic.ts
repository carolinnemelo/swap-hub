import convert, { Unit } from "convert-units";

export function convertTemperature(fromUnit, toUnit, value: number) {
    if(!fromUnit || !toUnit || !value) {
        return "fail"
    }

  const convertedValue = convert(value).from(fromUnit).to(toUnit);

  return convertedValue;
}


