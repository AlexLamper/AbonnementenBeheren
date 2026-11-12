// Geeft gratis Premium (premiumGranted) aan bestaande accounts die nu al meer
// abonnementen hebben dan de gratis limiet, zodat zij niets kwijtraken als
// PREMIUM_ENABLED aangaat.
//
// Eerst kijken (verandert niets):
//   MONGODB_URI="mongodb+srv://..." node scripts/grant-early-premium.mjs
// Echt uitvoeren:
//   MONGODB_URI="mongodb+srv://..." node scripts/grant-early-premium.mjs --apply
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Zet MONGODB_URI (dezelfde als in Vercel).");
  process.exit(1);
}
const limit = Number(process.env.FREE_SUBSCRIPTION_LIMIT) || 5;
const apply = process.argv.includes("--apply");

const client = await MongoClient.connect(uri);
try {
  const db = client.db();
  const counts = await db
    .collection("subscriptions")
    .aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $match: { count: { $gt: limit } } },
    ])
    .toArray();

  const ids = counts
    .map((c) => c._id)
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));
  const users = await db
    .collection("users")
    .find({ _id: { $in: ids } }, { projection: { email: 1, premiumGranted: 1 } })
    .toArray();

  const byId = new Map(counts.map((c) => [String(c._id), c.count]));
  console.log(`${users.length} account(s) met meer dan ${limit} abonnementen:`);
  for (const u of users) {
    const already = u.premiumGranted ? " (heeft het al)" : "";
    console.log(`- ${u.email}: ${byId.get(String(u._id))} abonnementen${already}`);
  }

  if (!apply) {
    console.log("\nDroog gedraaid, er is niets veranderd. Voeg --apply toe om Premium te geven.");
  } else {
    const res = await db
      .collection("users")
      .updateMany({ _id: { $in: ids } }, { $set: { premiumGranted: true } });
    console.log(`\nKlaar: ${res.modifiedCount} account(s) hebben nu gratis Premium.`);
  }
} finally {
  await client.close();
}
