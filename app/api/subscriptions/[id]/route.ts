import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { Subscription } from "@/lib/models/Subscription";
import { subscriptionUpdateSchema } from "@/lib/validation";
import { toClient } from "@/lib/serialize";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
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
  const doc = await Subscription.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    parsed.data,
    { new: true }
  );
  if (!doc) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }
  return NextResponse.json(toClient(doc));
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();
  const doc = await Subscription.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });
  if (!doc) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
