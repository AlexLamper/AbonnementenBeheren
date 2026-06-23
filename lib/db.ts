import mongoose from "mongoose";

// Mongoose-connectie voor de app-modellen. Gecached over hot-reloads.

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI ontbreekt in de omgeving (.env.local)");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri!);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
