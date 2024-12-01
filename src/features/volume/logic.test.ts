import test from "node:test";
import assert from "node:assert";
import { convertVolume, normalizeUnit } from "./logic";
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

test("Function converts the volume", async () => {
  const result = convertVolume("l", "ml", 1);
  deepEqual(result, 1000);
});

test("When units are lowercase letter or the whole word, should normalize them.", () => {
  const units = {
    volumeUnits: {
      milliliter: "ml",
      liter: "l",
      cubicCentimeter: "cm3",
      cubicMillimeter: "mm3",
      kiloliter: "kl",
      cubicMeter: "m3",
      cubicKilometer: "km3",
      teaspoon: "tsp",
      tablespoon: "Tbs",
      cubicInch: "in3",
      fluidOunce: "fl-oz",
    },
  };
  
  const result: string[] = [];
  result.push(normalizeUnit("L", units));
  result.push(normalizeUnit("milliliter", units));
  deepEqual(result, ["l", "ml"]);
});
