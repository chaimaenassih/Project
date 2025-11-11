import "dotenv/config";
import express from "express";
import connectMongo from "./databases/connect-mongo.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "Freelance Hub API", ok: true });
});


// routes
app.use(routes);

// global error guard (kept simple)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err?.stack || err);
  res.status(500).json({ code: "SERVER_ERROR" });
});

async function start() {
  await connectMongo();
  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
}

start();
