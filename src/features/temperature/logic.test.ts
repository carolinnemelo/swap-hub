import test from "node:test";
import {
  convertTemperature,
  isTemperatureRangeValid,
  normalizeUnit,
} from "./logic";
import { deepEqual } from "node:assert/strict";
import { temperatureErrors } from "../error-messages";
import assert from "node:assert";

test("When one of the arguments isn't given, should throw an error.", async () => {
  assert.throws(
    () => {
      convertTemperature("", "F", 25);
    },
    { name: "Error", message: temperatureErrors.missingParameters },
  );
});

test("Function converts the temperature", async () => {
  const result = convertTemperature("C", "F", 25);
  deepEqual(result, 77);
});

test("When units are lowercase letter or the whole word, should normalize them.", () => {
  const result: string[] = [];
  result.push(normalizeUnit("c"));
  result.push(normalizeUnit("fahrenheit"));
  result.push(normalizeUnit("celsius"));
  deepEqual(result, ["C", "F", "C"]);
});

test("If value is not a valid value given a temperature range, should return false.", async () => {
  assert.throws(
    () => {
      isTemperatureRangeValid("C", -300);
    },
    { name: "Error", message: temperatureErrors.celsius },
  );
});
