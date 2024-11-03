import test from "node:test";
import { convertTemperature } from "./logic";
import { deepEqual } from "node:assert/strict";

test("function converts the temperature", async () => {
  const result = convertTemperature("C", "F", 25);
  deepEqual(result, 77);
});
