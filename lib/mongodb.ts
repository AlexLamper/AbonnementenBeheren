import { MongoClient } from "mongodb";

// Gedeelde MongoClient promise voor de NextAuth MongoDB-adapter.
// Lazy: pas verbinden (en MONGODB_URI controleren) wanneer de promise echt
// wordt opgevraagd, zodat de build niet faalt tijdens page-data collection.
// In development hergebruiken we de connectie over hot-reloads heen.

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI ontbreekt in de omgeving (.env.local)");
  }
  return new MongoClient(uri).connect();
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = connect();
    }
    return global._mongoClientPromise;
  }
  return connect();
}

// Proxy zodat de verbinding pas wordt opgezet bij de eerste await/then.
const clientPromise: Promise<MongoClient> = {
  then: (onFulfilled, onRejected) =>
    getClientPromise().then(onFulfilled, onRejected),
  catch: (onRejected) => getClientPromise().catch(onRejected),
  finally: (onFinally) => getClientPromise().finally(onFinally),
  [Symbol.toStringTag]: "Promise",
} as Promise<MongoClient>;

export default clientPromise;
