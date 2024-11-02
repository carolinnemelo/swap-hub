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