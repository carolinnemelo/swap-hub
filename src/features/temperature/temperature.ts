import { Router } from "express";

export function convertTemperatureFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", (req, res) => {
        res.status(200);
        res.send("from router")
      });
      return router;
    },
  }; 
}

