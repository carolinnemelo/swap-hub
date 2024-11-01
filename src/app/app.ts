import express from "express";

function createApp() {
  const app = express();

  app.use(express.json());
  app.get("/status", (req, res) => {
    res.status(200).end()
  });
}
