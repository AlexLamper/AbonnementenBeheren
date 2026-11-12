import { getServerSession } from "next-auth";
import { SignJWT, jwtVerify } from "jose";
import { authOptions } from "@/lib/authOptions";

/**
 * Inloggen werkt op twee manieren:
 * - website: NextAuth-sessiecookie
 * - mobiele app: `Authorization: Bearer <token>` dat /api/mobile/login uitgeeft
 * Elke API-route vraagt de gebruiker op via `getRequestUser`, zodat dezelfde
 * routes voor site en app werken.
 */

const ISSUER = "abonnementenbeheren";
const AUDIENCE = "abonnementenbeheren-app";
const TOKEN_TTL = "180d";

function secretKey(): Uint8Array {
  const secret = process.env.MOBILE_JWT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("MOBILE_JWT_SECRET of NEXTAUTH_SECRET ontbreekt");
  return new TextEncoder().encode(secret);
}

export async function signMobileToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(secretKey());
}

export async function verifyMobileToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ["HS256"],
    });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export interface RequestUser {
  id: string;
  /** true als de aanvraag van de app komt (Bearer-token). */
  mobile: boolean;
}

export async function getRequestUser(req: Request): Promise<RequestUser | null> {
  const auth = req.headers.get("authorization") ?? "";
  if (auth.startsWith("Bearer ")) {
    const id = await verifyMobileToken(auth.slice("Bearer ".length).trim());
    return id ? { id, mobile: true } : null;
  }
  const session = await getServerSession(authOptions);
  return session?.user?.id ? { id: session.user.id, mobile: false } : null;
}
