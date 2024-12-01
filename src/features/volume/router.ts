import express from "express";
import { Service } from "./types";

export function createVolumeRouter(service: Service) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const volumeUnits = await service.getVolumeUnits();
    if (!volumeUnits) {
      res.status(401).json({ message: "error reading the file" });
    }
    res.json(volumeUnits);
  });

  router.post("/convert", async (req, res) => {
    const convertedValue = await service.convertVolume(req.body);
    if (!convertedValue) {
      res.status(401).end();
      return;
    }
    res.json( convertedValue );
  });

  router.get("/history", async (req, res) => {
    const files = await service.getHistory();
    if (!files) {
      res.status(404).end();
    }
    res.json({ files });
  });

  router.get("/history/:date", async (req, res) => {
    const date = req.params.date;
    const file = await service.getHistoryByDate(date);
    if (!file) {
      res.status(404).end();
    }
    res.json({ file });
  });

  router.delete("/history/:date", async (req, res) => {
    const date = req.params.date;
    const file = await service.deleteHistoryByDate(date);
    if (!file) {
      res.status(404).end();
    }
    res.json({ message: "Deleted" });
  });

  return router;
}
