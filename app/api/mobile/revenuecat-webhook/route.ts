import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { claimWebhookEvent, releaseWebhookEvent } from "@/lib/models/WebhookEvent";
import { syncStorePremium } from "@/lib/revenuecat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * RevenueCat → MongoDB. Bij elk event lezen we de live status opnieuw uit
 * bij RevenueCat (aanbevolen door RevenueCat) in plaats van het event zelf
 * te interpreteren.
 */
export async function POST(req: Request) {
  const expected = process.env.REVENUECAT_WEBHOOK_AUTHORIZATION;
  if (!expected) {
    console.error("[revenuecat-webhook] REVENUECAT_WEBHOOK_AUTHORIZATION ontbreekt");
    return NextResponse.json({ error: "Niet geconfigureerd" }, { status: 500 });
  }
  if ((req.headers.get("authorization") ?? "") !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    event?: {
      id?: string;
      type?: string;
      app_user_id?: string;
      original_app_user_id?: string;
      aliases?: string[];
      transferred_to?: string[];
      transferred_from?: string[];
    };
  } | null;
  const event = body?.event;
  if (!event?.id) {
    return NextResponse.json({ error: "Geen event" }, { status: 400 });
  }
  if (event.type === "TEST") return NextResponse.json({ received: true });

  await connectDB();
  const fresh = await claimWebhookEvent("revenuecat", event.id, event.type ?? "");
  if (!fresh) return NextResponse.json({ received: true, duplicate: true });

  // Bij een TRANSFER verandert de eigenaar; werk beide kanten bij.
  const ids = new Set<string>(
    [
      event.app_user_id,
      event.original_app_user_id,
      ...(event.aliases ?? []),
      ...(event.transferred_to ?? []),
      ...(event.transferred_from ?? []),
    ].filter((v): v is string => Boolean(v))
  );

  try {
    for (const id of ids) await syncStorePremium(id);
  } catch (error) {
    console.error("[revenuecat-webhook] Synchroniseren mislukt", error);
    await releaseWebhookEvent("revenuecat", event.id);
    return NextResponse.json({ error: "Sync mislukt" }, { status: 502 });
  }

  return NextResponse.json({ received: true });
}
