import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowLeft } from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Inloggen of gratis account aanmaken",
  description:
    "Log in of maak gratis een account aan om je abonnementen te beheren en je maandelijkse en jaarlijkse kosten te zien.",
  alternates: { canonical: "/login" },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ modus?: string; next?: string }>;
}) {
  const { modus, next } = await searchParams;

  const session = await getServerSession(authOptions);
  if (session?.user) redirect(next?.startsWith("/") ? next : "/overzicht");

  const initialMode = modus === "registreren" ? "registreren" : "inloggen";
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="animate-fade-in-up">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar home
        </Link>
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-lg font-bold text-slate-700"
        >
          <Image
            src="/logo/logo-transparent.png"
            alt="AbonnementenBeheren logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          AbonnementenBeheren
        </Link>
        <AuthForm
          initialMode={initialMode}
          googleEnabled={googleEnabled}
          next={next}
        />
      </div>
    </main>
  );
}
