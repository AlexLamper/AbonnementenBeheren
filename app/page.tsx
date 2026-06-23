import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  Search,
  Wallet,
  Bell,
  Share2,
  Check,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { getPresets } from "@/lib/presets/store";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ShareButton } from "@/components/ShareButton";
import { formatEUR, totals } from "@/lib/money";

const FEATURES = [
  {
    icon: Search,
    title: "Toevoegen in één klik",
    text: "Zoek een dienst zoals Spotify of Netflix, kies je pakket en het staat erin. Geen gedoe met bedragen overtypen.",
  },
  {
    icon: Wallet,
    title: "Maand- én jaarkosten",
    text: "Zie direct wat al je abonnementen samen per maand en per jaar kosten. Alles netjes omgerekend.",
  },
  {
    icon: Bell,
    title: "Nooit meer vergeten",
    text: "Houd overzicht over wat er loopt, zodat je op tijd opzegt wat je niet meer gebruikt.",
  },
  {
    icon: Share2,
    title: "Simpel te delen",
    text: "Deel je overzicht of de app met huisgenoten en familie met één knop.",
  },
];

const STEPS = [
  {
    title: "Maak gratis een account",
    text: "Aanmelden met je e-mailadres in een paar seconden.",
  },
  {
    title: "Voeg je abonnementen toe",
    text: "Kies uit kant-en-klare diensten of voeg je eigen abonnement toe.",
  },
  {
    title: "Zie je totale kosten",
    text: "Direct inzicht in je maandelijkse en jaarlijkse uitgaven.",
  },
];

// Voorbeeldabonnementen voor de mock in de hero.
const SAMPLE_IDS = ["spotify", "netflix", "disneyplus", "basicfit"] as const;
const SAMPLE_PLAN = {
  spotify: "Premium",
  netflix: "Standaard",
  disneyplus: "Premium",
  basicfit: "Comfort",
} as const;

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/overzicht");

  const presets = await getPresets();

  const sample = SAMPLE_IDS.map((id) => presets.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const sampleItems = sample.map((p) => ({
    preset: p,
    plan: p.plans[0],
  }));
  const { monthly, yearly } = totals(
    sampleItems.map((s) => ({
      price: s.plan.price,
      billingPeriod: s.plan.billingPeriod,
    }))
  );

  const logoStrip = presets.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-brand">
            AbonnementenBeheren
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Inloggen
            </Link>
            <Link
              href="/login?modus=registreren"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Gratis beginnen
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full bg-brand/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
              <ShieldCheck className="h-4 w-4" />
              Gratis &amp; zonder gedoe
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Al je abonnementen op één plek
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-slate-600 lg:mx-0">
              De simpelste manier om je abonnementen bij te houden. Voeg in één
              klik diensten toe en zie meteen wat je per maand en per jaar kwijt
              bent.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/login?modus=registreren"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
              >
                Gratis beginnen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Inloggen
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start">
              {["Geen creditcard nodig", "Direct inzicht", "Nederlands"].map(
                (t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-brand" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Mock dashboard */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-brand/5 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Per maand
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {formatEUR(monthly)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Per jaar
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {formatEUR(yearly)}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {sampleItems.map(({ preset, plan }) => (
                  <li
                    key={preset.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                  >
                    <ServiceLogo
                      name={preset.name}
                      logoUrl={preset.logoUrl}
                      color={preset.color}
                      size={36}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {preset.name}
                      </p>
                      <p className="text-xs text-slate-500">{plan.name}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatEUR(plan.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo strip */}
      <section className="border-y border-slate-200/70 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-center text-sm font-medium text-slate-500">
            Werkt met je favoriete diensten
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {logoStrip.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 opacity-80 transition hover:opacity-100"
              >
                <ServiceLogo
                  name={p.name}
                  logoUrl={p.logoUrl}
                  color={p.color}
                  size={28}
                />
                <span className="text-sm font-medium text-slate-600">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Alles wat je nodig hebt, niets wat je afleidt
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Gemaakt om in een minuut overzicht te geven over wat je elke maand
            betaalt.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200/70 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              In drie stappen geregeld
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-sm">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Klaar voor overzicht?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/90">
            Begin gratis en zie binnen een minuut wat je abonnementen je kosten.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login?modus=registreren"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-brand shadow-sm transition hover:bg-slate-100"
            >
              Gratis beginnen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <ShareButton subtle />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <span className="font-semibold text-slate-700">
            AbonnementenBeheren
          </span>
          <span>© {new Date().getFullYear()} — Al je abonnementen op één plek</span>
        </div>
      </footer>
    </div>
  );
}
