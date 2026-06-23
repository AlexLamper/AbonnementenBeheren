import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { AuthForm } from "@/components/AuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ modus?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/overzicht");

  const { modus } = await searchParams;
  const initialMode = modus === "registreren" ? "registreren" : "inloggen";
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <Link
        href="/"
        className="mb-8 text-center text-lg font-bold text-brand"
      >
        AbonnementenBeheren
      </Link>
      <AuthForm initialMode={initialMode} googleEnabled={googleEnabled} />
    </main>
  );
}
