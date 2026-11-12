import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { signMobileToken } from "@/lib/requestUser";
import { getEntitlement } from "@/lib/premium";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(100),
});

/** Inloggen vanuit de app met e-mail en wachtwoord; geeft een token terug. */
export async function POST(req: Request) {
  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldige gegevens", code: "INVALID" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: parsed.data.email });
  const ok =
    user?.passwordHash &&
    (await bcrypt.compare(parsed.data.password, user.passwordHash));
  if (!user || !ok) {
    // Account bestaat maar heeft alleen Google: dat apart melden.
    const code = user && !user.passwordHash ? "NO_PASSWORD" : "INVALID_CREDENTIALS";
    return NextResponse.json(
      { error: "E-mailadres of wachtwoord is onjuist", code },
      { status: 401 }
    );
  }

  const id = user._id.toString();
  return NextResponse.json({
    token: await signMobileToken(id),
    user: { id, name: user.name ?? "", email: user.email },
    entitlement: await getEntitlement(id),
  });
}
