import mongoose from "mongoose";

export async function connectDb(uri) {
  if (!uri) throw new Error("MONGO_URI is missing");
  mongoose.set("strictQuery", true);
  // await mongoose.connect(uri);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
}
