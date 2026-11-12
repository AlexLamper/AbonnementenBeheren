import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscription } from "@/lib/models/Subscription";
import { subscriptionInputSchema } from "@/lib/validation";
import { serializeFor } from "@/lib/serialize";
import { getRequestUser } from "@/lib/requestUser";
import { getEntitlement, LIMIT_REACHED } from "@/lib/premium";

export async function GET(req: Request) {
  const user = await getRequestUser(req);
  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  await connectDB();
  const docs = await Subscription.find({ userId: user.id }).sort({
    createdAt: -1,
  });
  return NextResponse.json(docs.map(serializeFor(user.mobile)));
}

export async function POST(req: Request) {
  const user = await getRequestUser(req);
  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const parsed = subscriptionInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ongeldige gegevens" },
      { status: 400 }
    );
  }

  // Gratis limiet: altijd op de server gecontroleerd, zodat site en app
  // dezelfde regel volgen en niemand er omheen kan.
  const entitlement = await getEntitlement(user.id);
  if (!entitlement.canAdd) {
    return NextResponse.json(
      {
        error: `Met een gratis account kun je ${entitlement.limit} abonnementen bijhouden. Neem Premium voor onbeperkt.`,
        code: LIMIT_REACHED,
        limit: entitlement.limit,
        count: entitlement.count,
      },
      { status: 403 }
    );
  }

  await connectDB();
  const doc = await Subscription.create({
    ...parsed.data,
    userId: user.id,
  });
  return NextResponse.json(serializeFor(user.mobile)(doc), { status: 201 });
}
