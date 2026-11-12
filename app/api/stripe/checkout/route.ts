import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type Stripe from "stripe";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { User, type UserDoc } from "@/lib/models/User";
import { isPremiumUser, PREMIUM_ENABLED } from "@/lib/premium";
import { stripe, priceIdFor, readPlan, siteOrigin } from "@/lib/stripe";

export const dynamic = "force-dynamic";

/**
 * Start Stripe Checkout voor Premium. Wordt aangeroepen met een gewoon
 * formulier (POST) vanaf /premium of het upgrade-venster.
 */
export async function POST(req: Request) {
  const origin = siteOrigin(req);
  const form = await req.formData().catch(() => null);
  const plan = readPlan(form?.get("plan"));

  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.email) {
    const login = new URL("/login", origin);
    login.searchParams.set("next", "/premium");
    return NextResponse.redirect(login, 303);
  }

  if (!PREMIUM_ENABLED) {
    return NextResponse.redirect(new URL("/overzicht", origin), 303);
  }

  const priceId = priceIdFor(plan);
  if (!priceId || !process.env.STRIPE_SECRET_KEY) {
    console.error(`[stripe/checkout] Prijs of sleutel ontbreekt voor plan ${plan}`);
    return NextResponse.redirect(new URL("/premium?betaling=fout", origin), 303);
  }

  await connectDB();
  const user = await User.findById(session.user.id).lean<UserDoc>();
  if (!user) {
    return NextResponse.redirect(new URL("/login", origin), 303);
  }

  // Al Premium (via site of app)? Dan geen tweede abonnement afsluiten.
  if (isPremiumUser(user)) {
    return NextResponse.redirect(new URL("/premium", origin), 303);
  }

  const userId = user._id.toString();

  async function ensureCustomer(): Promise<string> {
    const customer = await stripe.customers.create({
      email: user!.email,
      name: user!.name || undefined,
      metadata: { userId },
    });
    await User.updateOne({ _id: user!._id }, { $set: { stripeCustomerId: customer.id } });
    return customer.id;
  }

  const params = (customer: string): Stripe.Checkout.SessionCreateParams => ({
    mode: "subscription",
    customer,
    client_reference_id: userId,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { metadata: { userId, plan } },
    metadata: { userId, plan },
    allow_promotion_codes: true,
    locale: "nl",
    success_url: `${origin}/premium?betaling=gelukt`,
    cancel_url: `${origin}/premium?betaling=geannuleerd`,
  });

  try {
    let customerId = user.stripeCustomerId || (await ensureCustomer());
    let checkout: Stripe.Checkout.Session;
    try {
      checkout = await stripe.checkout.sessions.create(params(customerId));
    } catch (error) {
      // Opgeslagen klant bestaat niet (meer) in dit Stripe-account: opnieuw.
      const e = error as { code?: string; param?: string };
      if (e.code !== "resource_missing" || e.param !== "customer") throw error;
      customerId = await ensureCustomer();
      checkout = await stripe.checkout.sessions.create(params(customerId));
    }
    return NextResponse.redirect(checkout.url!, 303);
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return NextResponse.redirect(new URL("/premium?betaling=fout", origin), 303);
  }
}
