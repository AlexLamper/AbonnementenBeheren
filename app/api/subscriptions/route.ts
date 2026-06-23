import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { Subscription } from "@/lib/models/Subscription";
import { subscriptionInputSchema } from "@/lib/validation";
import { toClient } from "@/lib/serialize";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  await connectDB();
  const docs = await Subscription.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });
  return NextResponse.json(docs.map(toClient));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
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

  await connectDB();
  const doc = await Subscription.create({
    ...parsed.data,
    userId: session.user.id,
  });
  return NextResponse.json(toClient(doc), { status: 201 });
}
