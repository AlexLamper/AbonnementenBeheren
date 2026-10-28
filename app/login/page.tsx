import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowLeft, Check } from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { AuthForm } from "@/components/AuthForm";
import { Logo, LogoMark } from "@/components/Logo";

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
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]">
      {/* Merkpaneel (desktop) */}
      <aside className="hidden flex-col justify-between overflow-hidden bg-navy px-14 py-10 lg:flex">
        <Logo />
        <div>
          <p className="font-display text-[46px] font-bold leading-[1.05] tracking-tight text-white">
            Binnen een minuut
            <br />
            <span className="text-mint">overzicht.</span>
          </p>
          <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-haze">
            Zet al je abonnementen op één plek en zie wat je per maand en per
            jaar kwijt bent.
          </p>
          <div className="mt-8 flex max-w-sm items-center gap-5 rounded-[22px] border border-white/[0.12] bg-white/[0.06] px-5 py-5">
            <LogoMark size={72} />
            <div>
              <p className="text-sm text-haze">Voorbeeld · per maand</p>
              <p className="font-display text-[34px] font-bold tracking-tight text-white">
                € 50,95
              </p>
              <p className="text-sm text-mint-light">5 abonnementen · € 611,40 per jaar</p>
            </div>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          {["Voor altijd gratis", "Geen creditcard", "Nederlands"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-mint" strokeWidth={2.6} />
              {t}
            </li>
          ))}
        </ul>
      </aside>

      {/* Formulier */}
      <main className="flex flex-col">
        <div className="bg-navy px-5 py-4 lg:hidden">
          <Logo size={30} />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:py-14">
          <div className="w-full max-w-[420px] animate-fade-in-up">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar home
            </Link>
            <AuthForm
              initialMode={initialMode}
              googleEnabled={googleEnabled}
              next={next}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
