import { NextResponse } from "next/server";
import mongoose from "mongoose";
import type Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { claimWebhookEvent, releaseWebhookEvent } from "@/lib/models/WebhookEvent";
import { stripe, stripeStatusGivesPremium } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe → MongoDB. Zet `premiumStripe` aan of uit op basis van de status
 * van het Stripe-abonnement. Events in Stripe aanzetten:
 *   checkout.session.completed
 *   customer.subscription.created / updated / deleted
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET ontbreekt");
    return NextResponse.json({ error: "Niet geconfigureerd" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Geen handtekening" }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (error) {
    console.error("[stripe/webhook] Ongeldige handtekening", error);
    return NextResponse.json({ error: "Ongeldige handtekening" }, { status: 400 });
  }

  await connectDB();
  const fresh = await claimWebhookEvent("stripe", event.id, event.type);
  if (!fresh) return NextResponse.json({ received: true, duplicate: true });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        if (s.mode !== "subscription" || !s.subscription) break;
        const subscriptionId =
          typeof s.subscription === "string" ? s.subscription : s.subscription.id;
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        await applySubscription(sub, s.client_reference_id ?? s.metadata?.userId);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await applySubscription(sub, sub.metadata?.userId);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error(`[stripe/webhook] Verwerken van ${event.type} mislukt`, error);
    // Laat het event los zodat Stripe het opnieuw kan proberen.
    await releaseWebhookEvent("stripe", event.id);
    return NextResponse.json({ error: "Verwerken mislukt" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function applySubscription(sub: Stripe.Subscription, userIdHint?: string | null) {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const active = sub.status !== "canceled" && stripeStatusGivesPremium(sub.status);

  // Zoek de gebruiker via de metadata, anders via de Stripe-klant.
  let filter: Record<string, unknown> | null = null;
  if (userIdHint && mongoose.Types.ObjectId.isValid(userIdHint)) {
    filter = { _id: new mongoose.Types.ObjectId(userIdHint) };
  } else if (customerId) {
    filter = { stripeCustomerId: customerId };
  }
  if (!filter) {
    console.warn(`[stripe/webhook] Geen gebruiker te vinden voor ${sub.id}`);
    return;
  }

  const user = await User.findOne(filter).select("stripeSubscriptionId");
  if (!user) {
    console.warn(`[stripe/webhook] Gebruiker niet gevonden voor ${sub.id}`);
    return;
  }

  // Een oud, beëindigd abonnement mag een nieuwer actief abonnement niet uitzetten.
  if (!active && user.stripeSubscriptionId && user.stripeSubscriptionId !== sub.id) {
    return;
  }

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        premiumStripe: active,
        stripeCustomerId: customerId,
        stripeSubscriptionId: sub.id,
      },
    }
  );
}
