import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectMongo, mongoReady, disconnectMongo } from "#@/databases/connect-mongo";


const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

// Root
app.get("/", (_req, res) => {
  res.json({ name: "Freelance Hub API", ok: true });
});

// Liveness
app.get("/health", (_req, res) => {
  res.json({ status: "ok", db: mongoReady() ? "up" : "down" });
});

// Readiness
app.get("/ready", (_req, res) => {
  if (mongoReady()) return res.json({ ready: true });
  return res.status(503).json({ ready: false });
});

async function start() {
  await connectMongo(); // retries internally if DB not ready

  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });

  // graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}, closing server...`);
    server.close(async () => {
      await disconnectMongo();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  console.error("Fatal start error:", err);
  process.exit(1);
});
