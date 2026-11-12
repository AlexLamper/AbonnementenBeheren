import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getRequestUser } from "@/lib/requestUser";
import { syncStorePremium } from "@/lib/revenuecat";
import { getEntitlement } from "@/lib/premium";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * De app roept dit aan na een aankoop, een herstel en bij het opstarten.
 * RevenueCat stuurt geen webhook voor een aankoop die je al had of voor
 * "Aankopen herstellen", dus zonder deze route kan zo'n account nooit
 * ontgrendelen.
 */
export async function POST(req: Request) {
  const user = await getRequestUser(req);
  if (!user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  await connectDB();
  if (process.env.REVENUECAT_REST_API_KEY) {
    try {
      await syncStorePremium(user.id);
    } catch (error) {
      console.error("[sync-premium]", error);
      return NextResponse.json({ error: "Sync mislukt" }, { status: 502 });
    }
  }
  return NextResponse.json(await getEntitlement(user.id));
}
