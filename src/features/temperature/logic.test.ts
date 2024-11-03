import test from "node:test";
import { convertTemperature, normalizeUnit } from "./logic";
import { deepEqual } from "node:assert/strict";

test("When one of the arguments isn't given, should return error message", async () => {
  const result = convertTemperature("", "F", 25);
  const errorMessage = "fail"
  deepEqual(result, errorMessage);
});

test("function converts the temperature", async () => {
  const result = convertTemperature("C", "F", 25);
  deepEqual(result, 77);
});

test("When units are lowercase letter or the whole word", () => {
  const result: string[] = [];
  result.push(normalizeUnit("c"));
  result.push(normalizeUnit("fahrenheit"));
  result.push(normalizeUnit("celsius"));
  deepEqual(result, ["C", "F", "C"]);
}); 