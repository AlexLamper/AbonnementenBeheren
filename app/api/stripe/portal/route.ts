import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { User, type UserDoc } from "@/lib/models/User";
import { stripe, siteOrigin } from "@/lib/stripe";

export const dynamic = "force-dynamic";

/**
 * "Abonnement beheren": opent het Stripe-klantportaal (opzeggen, betaalwijze,
 * facturen). Wijzigingen komen via de webhook terug, niet via deze route.
 */
export async function POST(req: Request) {
  const origin = siteOrigin(req);
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    const login = new URL("/login", origin);
    login.searchParams.set("next", "/premium");
    return NextResponse.redirect(login, 303);
  }

  await connectDB();
  const user = await User.findById(session.user.id)
    .select("stripeCustomerId")
    .lean<Pick<UserDoc, "stripeCustomerId">>();

  if (!user?.stripeCustomerId) {
    return NextResponse.redirect(new URL("/premium?betaling=geen-klant", origin), 303);
  }

  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${origin}/premium`,
      locale: "nl",
    });
    return NextResponse.redirect(portal.url, 303);
  } catch (error) {
    console.error("[stripe/portal]", error);
    return NextResponse.redirect(new URL("/premium?betaling=fout", origin), 303);
  }
}
