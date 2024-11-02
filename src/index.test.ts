import { deepEqual } from "node:assert";
import test from "node:test";
import request from "supertest";
import { createApp } from "./app";

test("supertest works!", async () => {
  const app = createApp();
  const result = await request(app).get("/");

  deepEqual(result.status, 200);
});

test("GET /temperature", async () => {
  const app = createApp();
  const result = await request(app).get("/temperature");

  deepEqual(result.status, 200);
  deepEqual(result.body, ["Kelvin", "Celsius", "Fahrenheit"])
});

test("POST /temperature/convert", async () => {
  const app = createApp();
  const convertTemperature = {
    fromUnit: "C",
    toUnit: "F",
    value: 25, 
  }
  const result = await request(app).post("/temperature/convert").send(convertTemperature);

  deepEqual(result.status, 200);
  deepEqual(result.body.convertedValue, 77)
});