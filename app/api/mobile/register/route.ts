import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { registerSchema } from "@/lib/validation";
import { signMobileToken } from "@/lib/requestUser";
import { getEntitlement } from "@/lib/premium";

export const runtime = "nodejs";

/** Account aanmaken vanuit de app; logt meteen in. */
export async function POST(req: Request) {
  const parsed = registerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ongeldige gegevens", code: "INVALID" },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;
  await connectDB();
  if (await User.findOne({ email })) {
    return NextResponse.json(
      { error: "Er bestaat al een account met dit e-mailadres", code: "EMAIL_TAKEN" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, emailVerified: null });
  const id = user._id.toString();

  return NextResponse.json(
    {
      token: await signMobileToken(id),
      user: { id, name, email },
      entitlement: await getEntitlement(id),
    },
    { status: 201 }
  );
}
