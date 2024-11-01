import express from "express";

export function createApp() { 
  const app = express();

  app.use(express.json());
  app.get("/status", (req, res) => {
    res.status(200).end()
  });

  return app
}
