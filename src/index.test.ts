import express from "express";
import { deepEqual } from "node:assert";
import test from "node:test";
import request from "supertest";

test("supertest works!", async () => {
  const app = express();
  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
});
