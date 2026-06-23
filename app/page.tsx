import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ShareButton } from "@/components/ShareButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/overzicht");

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
        AbonnementenBeheren
      </span>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Al je abonnementen op één plek
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate-600">
        De simpelste manier om je abonnementen bij te houden. Voeg in één klik
        diensten toe en zie meteen wat je per maand en per jaar kwijt bent.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/login?modus=registreren"
          className="rounded-lg bg-brand px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Gratis beginnen
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Inloggen
        </Link>
      </div>
      <div className="mt-10">
        <ShareButton subtle />
      </div>
    </main>
  );
}
