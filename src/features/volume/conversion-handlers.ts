import { v4 } from "uuid";
import fs from "fs";
import { volumeErrors } from "../error-messages";
import { normalizeUnit, parseValue } from "./logic";

export function getVolumeUnits() {
  try {
    const data = JSON.parse(fs.readFileSync("./data/volume.json", "utf-8"));
    return data[0].volumeUnits;
  } catch {
    throw new Error(volumeErrors.fileReadError);
  }
}

export function parseVolumeInputs(req, volumeUnits) {
  let { fromUnit, toUnit, value } = req;
  try {
    fromUnit = normalizeUnit(fromUnit, volumeUnits);
    toUnit = normalizeUnit(toUnit, volumeUnits);
    value = parseValue(value);
    return { fromUnit, toUnit, value };
  } catch (error) {
    return error.message;
  }
}

export function saveConversion({ fromUnit, toUnit, value, convertedValue }) {
  const id = generateId();
  const { filePath, time } = createConversionFilePerDay();
  const conversion = {
    id,
    time,
    fromUnit,
    value,
    toUnit,
    convertedValue,
  };
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const currentConversions = JSON.parse(fileContent);
  currentConversions.push(conversion);
  fs.writeFileSync(filePath, JSON.stringify(currentConversions, null, 2));
}

export function generateId() {
  return v4();
}

export function createConversionFilePerDay() {
  if (!fs.existsSync("data/volume-conversions-day")) {
    fs.mkdirSync("data/volume-conversions-day", { recursive: true });
  }
  const day = new Date().toString().toLowerCase();
  const dayArray = day.split(" ");
  const fileName = `${dayArray[3]}-${dayArray[1]}-${dayArray[2]}`;
  const time = dayArray[4];
  const filePath = `data/volume-conversions-day/${fileName}.json`;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
  return { filePath, time };
}
