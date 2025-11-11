import mongoose from "mongoose";

export default async function connectMongo(): Promise<void> {
  const url = process.env.MONGO_URL;
  if (!url) throw new Error("MONGO_URL is not defined in .env");

  mongoose.connection.on("connected", () => console.log("🟢 MongoDB connected"));
  mongoose.connection.on("error", (err) => console.error("🔴 MongoDB error:", err.message));
  mongoose.connection.on("disconnected", () => console.warn("🟠 MongoDB disconnected"));

  await mongoose.connect(url);
}
