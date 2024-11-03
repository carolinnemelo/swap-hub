import test from "node:test";
import { convertTemperature } from "./logic";
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
