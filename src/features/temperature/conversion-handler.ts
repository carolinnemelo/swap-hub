import { normalizeUnit, isTemperatureRangeValid } from "./logic";

export function parseTemperatureInputs(req) {
  let { fromUnit, toUnit, value } = req;
  try {
    fromUnit = normalizeUnit(fromUnit);
    toUnit = normalizeUnit(toUnit);
    isTemperatureRangeValid(fromUnit, value);

    return { fromUnit, toUnit, value };
  } catch (error) {
    return error.message;
  }
}
  