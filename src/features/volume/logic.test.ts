import test from "node:test";
import assert from "node:assert";
import { convertVolume } from "./logic";
import { volumeErrors } from "../error-messages";
import { deepEqual } from "node:assert/strict";

test("When one of the arguments isn't given, should throw an error.", async () => {
  assert.throws(
    () => {
      convertVolume("", "ml", 10);
    },
    { name: "Error", message: volumeErrors.missingParameters },
  );
});

test.only("Function converts the temperature", async () => {
  const result = convertVolume("cup", "ml", 1);
  deepEqual(result, 240);
});
