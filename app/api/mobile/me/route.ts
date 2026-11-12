import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { User, type UserDoc } from "@/lib/models/User";
import { Subscription } from "@/lib/models/Subscription";
import { getRequestUser } from "@/lib/requestUser";
import { getEntitlement } from "@/lib/premium";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Profiel + Premium-status + limiet voor de app. */
export async function GET(req: Request) {
  const auth = await getRequestUser(req);
  if (!auth) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  await connectDB();
  const user = await User.findById(auth.id).select("name email").lean<UserDoc>();
  if (!user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  return NextResponse.json({
    user: { id: auth.id, name: user.name ?? "", email: user.email },
    entitlement: await getEntitlement(auth.id),
  });
}

/**
 * Account verwijderen (verplicht voor apps in de App Store). Verwijdert
 * alle abonnementen, koppelingen en het account zelf, en zegt een lopend
 * Stripe-abonnement op. Een App Store-abonnement zegt de gebruiker zelf op
 * in de instellingen van de telefoon; dat kan niet vanaf de server.
 */
export async function DELETE(req: Request) {
  const auth = await getRequestUser(req);
  if (!auth) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  await connectDB();
  const user = await User.findById(auth.id)
    .select("stripeSubscriptionId premiumStripe")
    .lean<UserDoc>();
  if (!user) return NextResponse.json({ ok: true });

  if (user.stripeSubscriptionId && user.premiumStripe) {
    try {
      await stripe.subscriptions.cancel(user.stripeSubscriptionId);
    } catch (error) {
      console.error("[mobile/me DELETE] Stripe opzeggen mislukt", error);
      return NextResponse.json(
        { error: "Je Premium-abonnement kon niet worden opgezegd. Probeer het later opnieuw." },
        { status: 502 }
      );
    }
  }

  const oid = new mongoose.Types.ObjectId(auth.id);
  const db = mongoose.connection.db;
  await Subscription.deleteMany({ userId: auth.id });
  if (db) {
    // Collecties van de NextAuth MongoDB-adapter.
    await db.collection("accounts").deleteMany({ userId: oid });
    await db.collection("sessions").deleteMany({ userId: oid });
  }
  await User.deleteOne({ _id: oid });

  return NextResponse.json({ ok: true });
}
