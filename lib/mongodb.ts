import { MongoClient } from "mongodb";

// Gedeelde MongoClient promise voor de NextAuth MongoDB-adapter.
// In development hergebruiken we de connectie over hot-reloads heen.

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI ontbreekt in de omgeving (.env.local)");
}

const options = {};

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;
