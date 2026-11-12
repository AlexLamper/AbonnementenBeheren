import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscription, type SubscriptionDoc } from "@/lib/models/Subscription";
import { getRequestUser } from "@/lib/requestUser";
import { getEntitlement } from "@/lib/premium";
import { periodLabel, toMonthly, toYearly } from "@/lib/money";

export const dynamic = "force-dynamic";

function cell(value: string | number | undefined): string {
  const s = value === undefined ? "" : String(value);
  // Puntkomma als scheidingsteken (Nederlandse Excel); quotes escapen en
  // formule-injectie voorkomen.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[";\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

function amount(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

/** CSV-export van je abonnementen (Premium). */
export async function GET(req: Request) {
  const user = await getRequestUser(req);
  if (!user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

  const entitlement = await getEntitlement(user.id);
  if (entitlement.premiumEnabled && !entitlement.isPremium) {
    return NextResponse.json(
      { error: "Exporteren is onderdeel van Premium.", code: "PREMIUM_REQUIRED" },
      { status: 403 }
    );
  }

  await connectDB();
  const docs = await Subscription.find({ userId: user.id })
    .sort({ name: 1 })
    .lean<SubscriptionDoc[]>();

  const header = ["Naam", "Pakket", "Categorie", "Prijs", "Periode", "Per maand", "Per jaar", "Notities"];
  const rows = docs.map((d) => [
    d.name,
    d.planName,
    d.category,
    amount(d.price),
    periodLabel(d.billingPeriod),
    amount(toMonthly(d.price, d.billingPeriod)),
    amount(toYearly(d.price, d.billingPeriod)),
    d.notes,
  ]);
  const csv =
    "﻿" + [header, ...rows].map((r) => r.map(cell).join(";")).join("\r\n") + "\r\n";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="abonnementen.csv"',
      "Cache-Control": "no-store",
    },
  });
}
