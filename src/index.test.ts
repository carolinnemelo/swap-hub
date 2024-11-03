import { deepEqual } from "node:assert";
import test from "node:test";
import request from "supertest";
import { createApp } from "./app";
import { convertTemperature } from "./features/temperature/logic";
import { temperatureSchema } from "./features/temperature/types";

test("supertest works!", async () => {
  const app = createApp();
  const result = await request(app).get("/");

  deepEqual(result.status, 200);
});

test("GET /temperature", async () => {
  const app = createApp();
  const result = await request(app).get("/temperature");

  deepEqual(result.status, 200);
  deepEqual(result.body, ["Kelvin", "Celsius", "Fahrenheit"]);
});

test("POST /temperature/convert", async () => {
  const app = createApp();
  const testConvertTemperature = {
    fromUnit: "C",
    toUnit: "F",
    value: "25",
  };
  const result = await request(app)
    .post("/temperature/convert")
    .send(testConvertTemperature);
  const expectedValue = convertTemperature("C", "F", 25);
  deepEqual(result.status, 200);
  deepEqual(result.body.convertedValue, expectedValue);
});


test("POST /temperature/convert - bad request.", async () => {
  const app = createApp();
  const testConvertTemperature = {
    fromUnit: "moreThanTenLetters",
    toUnit: "F",
    value: 25,
  };
  const result = await request(app)
    .post("/temperature/convert")
    .send(testConvertTemperature);
    
  deepEqual(result.status, 400);
});


test.only("GET /volume", async () => {
  const app = createApp();
  const result = await request(app).get("/volume");

  const volumeUnits = {
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
    cup: "cup",
  };

  deepEqual(result.status, 200);
  deepEqual(result.body, volumeUnits);
});