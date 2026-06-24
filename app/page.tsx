import type { Metadata } from "next";
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
  Sparkles,
} from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { getPresets } from "@/lib/presets/store";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { formatEUR, totals } from "@/lib/money";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    q: "Hoe kan ik mijn abonnementen beheren?",
    a: "Maak gratis een account aan, voeg je abonnementen toe vanuit de kant-en-klare lijst met diensten en je ziet direct al je abonnementen op één plek met de kosten per maand en per jaar.",
  },
  {
    q: "Is abonnementen beheren met AbonnementenBeheren gratis?",
    a: "Ja, AbonnementenBeheren is volledig gratis. Je hebt geen creditcard nodig en er zijn geen verborgen kosten.",
  },
  {
    q: "Welke diensten kan ik toevoegen?",
    a: "Populaire diensten zoals Spotify, Netflix, Disney+ en Basic-Fit staan kant-en-klaar in de lijst. Je kunt ook elk eigen abonnement handmatig toevoegen.",
  },
  {
    q: "Zie ik wat ik per maand en per jaar betaal?",
    a: "Ja. AbonnementenBeheren rekent al je abonnementen automatisch om, zodat je in één oogopslag je totale maandelijkse en jaarlijkse kosten ziet.",
  },
  {
    q: "Helpt het bij het opzeggen van abonnementen?",
    a: "Doordat je al je abonnementen overzichtelijk bij elkaar hebt, zie je snel wat je niet meer gebruikt en kun je op tijd opzeggen wat je niet meer nodig hebt.",
  },
];

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: "nl-NL",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo/logo-transparent.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "nl-NL",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[28rem] max-w-4xl rounded-full bg-brand/10 blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span
              className="inline-flex animate-fade-in-up items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand"
              style={{ animationDelay: "0ms" }}
            >
              <Sparkles className="h-4 w-4" />
              100% gratis - geen creditcard nodig
            </span>
            <h1
              className="mt-6 animate-fade-in-up text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "75ms" }}
            >
              Abonnementen beheren op één plek
            </h1>
            <p
              className="mx-auto mt-5 max-w-md animate-fade-in-up text-pretty text-lg text-slate-600 lg:mx-0"
              style={{ animationDelay: "150ms" }}
            >
              Beheer al je abonnementen gratis op één plek. Voeg in één klik
              diensten toe en zie meteen wat je per maand en per jaar aan
              abonnementen kwijt bent.
            </p>
            <div
              className="mt-8 flex animate-fade-in-up flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{ animationDelay: "225ms" }}
            >
              <Link
                href="/login?modus=registreren"
                className="hover-lift inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
              >
                Maak gratis je account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Inloggen
              </Link>
            </div>
            <ul
              className="mt-6 flex animate-fade-in-up flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start"
              style={{ animationDelay: "300ms" }}
            >
              {["Voor altijd gratis", "Geen verborgen kosten", "Nederlands"].map(
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
          <div
            className="relative mx-auto w-full max-w-md animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
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
          <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {logoStrip.map((p) => (
              <Link
                key={p.id}
                href={`/${p.id}`}
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
              </Link>
            ))}
          </Reveal>
          <p className="mt-6 text-center text-sm">
            <Link
              href="/diensten"
              className="font-medium text-brand hover:underline"
            >
              Bekijk alle diensten en prijzen →
            </Link>
          </p>
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
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {text}
              </p>
            </Reveal>
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
              <Reveal key={step.title} delay={i * 120}>
                <li className="relative text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center shadow-lg">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              Helemaal gratis
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Klaar voor overzicht?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-white/90">
              Maak gratis je account en zie binnen een minuut wat je
              abonnementen je kosten. Geen creditcard, geen verborgen kosten.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/login?modus=registreren"
                className="hover-lift inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-brand shadow-sm transition hover:bg-slate-100"
              >
                Maak gratis je account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ShareButton light />
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200/70 bg-white/50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Veelgestelde vragen over abonnementen beheren
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Alles wat je wilt weten over het bijhouden van je abonnementen.
            </p>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="text-brand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
