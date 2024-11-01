import { Router } from "express";

export function convertTemperatureFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", (req, res) => {
        res.send(200);
      });
      return router;
    },
  };
}

