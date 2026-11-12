import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscription } from "@/lib/models/Subscription";
import { subscriptionUpdateSchema } from "@/lib/validation";
import { serializeFor } from "@/lib/serialize";
import { getRequestUser } from "@/lib/requestUser";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const user = await getRequestUser(req);
  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const parsed = subscriptionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ongeldige gegevens" },
      { status: 400 }
    );
  }

  await connectDB();
  // Ownership-check: alleen het eigen abonnement mag aangepast worden.
  // Aanpassen en verwijderen mag altijd, ook boven de gratis limiet.
  const doc = await Subscription.findOneAndUpdate(
    { _id: id, userId: user.id },
    parsed.data,
    { new: true }
  ).catch(() => null);
  if (!doc) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }
  return NextResponse.json(serializeFor(user.mobile)(doc));
}

export async function DELETE(req: Request, { params }: Params) {
  const user = await getRequestUser(req);
  if (!user) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const doc = await Subscription.findOneAndDelete({
    _id: id,
    userId: user.id,
  }).catch(() => null);
  if (!doc) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
