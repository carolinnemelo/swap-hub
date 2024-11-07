import test from "node:test";
import assert from "node:assert";
import { convertVolume, normalizeUnit } from "./logic";
import { volumeErrors } from "../error-messages";
import { deepEqual } from "node:assert/strict";
import { getVolumeUnits } from "./conversion-handlers";

test("When one of the arguments isn't given, should throw an error.", async () => {
  assert.throws(
    () => {
      convertVolume("", "ml", 10);
    },
    { name: "Error", message: volumeErrors.missingParameters },
  );
});

test("Function converts the volume", async () => {
  const result = convertVolume("l", "ml", 1);
  deepEqual(result, 1000);
});

test("When units are lowercase letter or the whole word, should normalize them.", () => {
  const result: string[] = [];
  const volumeUnits = getVolumeUnits();
  result.push(normalizeUnit("L", volumeUnits));
  result.push(normalizeUnit("milliliter", volumeUnits));
  deepEqual(result, ["l", "ml"]);
});
