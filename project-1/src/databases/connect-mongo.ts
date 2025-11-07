import mongoose from "mongoose";

const DEFAULT_RETRY_MS = 3000;

export function mongoReady() {
  // 1 = connected, 2 = connecting, 0 = disconnected, 3 = disconnecting
  return mongoose.connection.readyState === 1;
}

export async function connectMongo(uri = process.env.MONGO_URL!, retryMs = DEFAULT_RETRY_MS) {
  if (!uri) {
    throw new Error("MONGO_URL is not defined in environment");
  }

  // idempotent: if already connected, return the connection
  if (mongoReady()) return mongoose.connection;

  try {
    await mongoose.connect(uri, {
      // add options here if needed
    });
    console.log("🟢 MongoDB connected");
  } catch (err) {
    console.error("🔴 MongoDB connection error:", (err as Error).message);
    // basic retry loop (simple and effective for dev)
    setTimeout(() => {
      connectMongo(uri, retryMs).catch(() => void 0);
    }, retryMs);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("🟠 MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🟢 MongoDB reconnected");
  });

  return mongoose.connection;
}

export async function disconnectMongo() {
  try {
    await mongoose.connection.close();
    console.log("🟡 MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB connection:", (err as Error).message);
  }
}
