import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  Search,
  Wallet,
  Bell,
  Share2,
  ArrowRight,
  UserPlus,
  BarChart3,
  ArrowDownWideNarrow,
  Plus,
} from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { getPresets } from "@/lib/presets/store";
import type { Preset } from "@/lib/presets/types";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { formatEUR, toMonthly, totals } from "@/lib/money";
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
    text: "Zoek een dienst zoals Spotify of Netflix, kies je pakket en het staat erin.",
  },
  {
    icon: Wallet,
    title: "Maand- én jaarkosten",
    text: "Zie direct wat alles samen per maand en per jaar kost. Netjes omgerekend.",
  },
  {
    icon: Bell,
    title: "Nooit meer vergeten",
    text: "Houd overzicht over wat er loopt en zeg op tijd op wat je niet gebruikt.",
  },
  {
    icon: Share2,
    title: "Simpel te delen",
    text: "Deel de app met huisgenoten en familie met één knop.",
  },
];

const STEPS = [
  {
    icon: UserPlus,
    title: "Account maken",
    text: "Met e-mail of Google, in tien seconden.",
  },
  {
    icon: Search,
    title: "Diensten kiezen",
    text: "Zoek, kies je pakket en de prijs staat er al.",
  },
  {
    icon: BarChart3,
    title: "Overzicht houden",
    text: "Per maand en per jaar, altijd actueel.",
  },
];

// Voorbeeldabonnementen voor het overzicht in de hero: [preset-id, pakket].
const SAMPLE: [string, string][] = [
  ["netflix", "Standaard"],
  ["spotify", "Individual"],
  ["youtubepremium", "Individueel"],
  ["playstationplus", "Essential"],
  ["icloud", "200GB"],
];

// Snelkeuzes onder de zoekbalk en de dienstenstrook.
const CHIP_IDS = ["netflix", "spotify", "youtubepremium", "playstationplus", "icloud"];
const STRIP_IDS = [
  "netflix",
  "spotify",
  "youtubepremium",
  "disneyplus",
  "playstationplus",
  "icloud",
  "ziggo",
  "chatgpt",
];

const BAR_COLORS = ["bg-mint", "bg-teal", "bg-mint-light", "bg-[#3f7c8c]", "bg-[#2a4b63]"];

function cheapestMonthly(p: Preset) {
  return Math.min(...p.plans.map((pl) => toMonthly(pl.price, pl.billingPeriod)));
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/overzicht");

  const presets = await getPresets();
  const byId = (id: string) => presets.find((p) => p.id === id);
  const pick = (ids: string[]) =>
    ids.map(byId).filter((p): p is Preset => Boolean(p));

  const sampleItems = SAMPLE.map(([id, planName]) => {
    const preset = byId(id);
    if (!preset) return null;
    const plan = preset.plans.find((pl) => pl.name === planName) ?? preset.plans[0];
    return { preset, plan, monthly: toMonthly(plan.price, plan.billingPeriod) };
  })
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .sort((a, b) => b.monthly - a.monthly);

  const { monthly, yearly } = totals(
    sampleItems.map((s) => ({
      price: s.plan.price,
      billingPeriod: s.plan.billingPeriod,
    }))
  );

  const chips = pick(CHIP_IDS);
  const strip = pick(STRIP_IDS);

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
        logo: `${SITE_URL}/logo/logo.png`,
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

      {/* Hero */}
      <div className="bg-navy pb-28 sm:pb-32">
        <SiteHeader />
        <section className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-14 text-center sm:pt-20">
          <h1
            className="animate-fade-in-up font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[66px]"
            style={{ animationDelay: "0ms" }}
          >
            Al je abonnementen.
            <br />
            <span className="text-mint">Eén helder totaal.</span>
          </h1>
          <p
            className="mt-5 max-w-xl animate-fade-in-up text-pretty text-base leading-relaxed text-haze sm:text-lg"
            style={{ animationDelay: "80ms" }}
          >
            Zoek een dienst, kies je pakket en de prijs staat er al. Zo zie je
            meteen wat je per maand en per jaar kwijt bent.
          </p>

          <form
            action="/diensten"
            method="get"
            role="search"
            className="mt-8 flex w-full max-w-xl animate-fade-in-up items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "160ms" }}
          >
            <label htmlFor="hero-zoek" className="sr-only">
              Zoek een dienst
            </label>
            <Search className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
            <input
              id="hero-zoek"
              name="q"
              type="search"
              placeholder="Zoek een dienst, bijv. Netflix"
              className="min-h-10 min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f3354]"
            >
              Zoeken
            </button>
          </form>

          <div
            className="mt-5 flex animate-fade-in-up flex-wrap items-center justify-center gap-2"
            style={{ animationDelay: "220ms" }}
          >
            <span className="text-sm text-haze">Populair:</span>
            {chips.map((p) => (
              <Link
                key={p.id}
                href={`/${p.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-1.5 pr-3 text-sm text-[#e2ecf3] transition hover:bg-white/15"
              >
                <ServiceLogo
                  name={p.name}
                  presetId={p.id}
                  logoUrl={p.logoUrl}
                  color={p.color}
                  size={24}
                  rounded="rounded-full"
                />
                {p.name}
              </Link>
            ))}
          </div>

          <div
            className="mt-8 flex animate-fade-in-up flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              href="/login?modus=registreren"
              className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-bold text-mint-ink transition hover:bg-mint-light"
            >
              Maak gratis je account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* Voorbeeld-overzicht */}
      <section className="relative mx-auto -mt-20 max-w-5xl px-4 sm:px-6">
        <div
          className="grid animate-fade-in-up gap-5 rounded-[28px] border border-line bg-white p-4 shadow-float sm:p-7 md:grid-cols-[300px_minmax(0,1fr)] md:gap-7"
          style={{ animationDelay: "320ms" }}
        >
          <div className="flex flex-col gap-4 rounded-[20px] bg-navy p-6">
            <div>
              <p className="text-sm text-haze">Per maand</p>
              <p className="mt-1 font-display text-[44px] font-bold leading-none tracking-tight text-white">
                {formatEUR(monthly)}
              </p>
            </div>
            <div className="flex h-2 gap-1">
              {sampleItems.map((s, i) => (
                <span
                  key={s.preset.id}
                  className={`rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                  style={{ flex: s.monthly }}
                />
              ))}
            </div>
            <dl className="flex flex-col gap-3 border-t border-white/[0.12] pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-haze">Per jaar</dt>
                <dd className="font-display font-bold text-white">{formatEUR(yearly)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-haze">Actief</dt>
                <dd className="font-display font-bold text-white">{sampleItems.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-haze">Duurste</dt>
                <dd className="font-display font-bold text-white">
                  {sampleItems[0]?.preset.name}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Mijn abonnementen
              </h2>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <ArrowDownWideNarrow className="h-4 w-4" />
                Duurste eerst
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {sampleItems.map(({ preset, plan }) => (
                <li
                  key={preset.id}
                  className="flex items-center gap-3.5 rounded-2xl bg-surface px-3 py-2.5"
                >
                  <ServiceLogo
                    name={preset.name}
                    presetId={preset.id}
                    logoUrl={preset.logoUrl}
                    color={preset.color}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">{preset.name}</p>
                    <p className="text-sm text-slate-500">{plan.name} · maandelijks</p>
                  </div>
                  <span className="font-display text-[17px] font-semibold text-slate-900">
                    {formatEUR(plan.price)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section id="hoe-het-werkt" className="mx-auto max-w-5xl scroll-mt-24 px-6 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Hoe het werkt
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[38px]">
              In drie stappen klaar
            </h2>
          </div>
          <Link
            href="/diensten"
            className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
          >
            Alle {presets.length} diensten bekijken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ol className="mt-8 grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <li className="h-full rounded-[22px] border border-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-soft text-brand">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Waarom AbonnementenBeheren
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[38px]">
              Alles wat je nodig hebt, niets wat je afleidt
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Gemaakt om je in een minuut overzicht te geven over wat je elke
              maand betaalt.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={i * 80}
                className="rounded-[22px] border border-line bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-mint">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-4 font-display text-[19px] font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diensten-strook */}
      <section className="mt-24 border-y border-line bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-[26px]">
              Werkt met je favoriete diensten
            </h2>
            <Link
              href="/diensten"
              className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
            >
              Alle diensten en prijzen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Reveal className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {strip.map((p) => (
              <Link
                key={p.id}
                href={`/${p.id}`}
                className="flex items-center gap-3 rounded-2xl border border-line px-3.5 py-3 transition hover:border-mint hover:bg-mint-wash"
              >
                <ServiceLogo
                  name={p.name}
                  presetId={p.id}
                  logoUrl={p.logoUrl}
                  color={p.color}
                  size={38}
                />
                <span className="min-w-0">
                  <span className="block truncate font-bold text-slate-900">{p.name}</span>
                  <span className="block text-sm text-slate-500">
                    vanaf {formatEUR(cheapestMonthly(p))}/mnd
                  </span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[32px] bg-navy px-7 py-12 sm:p-14 md:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-[44px]">
                Klaar voor overzicht?
              </h2>
              <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-haze">
                Maak gratis je account en zie binnen een minuut wat je
                abonnementen kosten. Geen creditcard, geen verborgen kosten.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/login?modus=registreren"
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-bold text-mint-ink transition hover:bg-mint-light"
                >
                  Maak gratis je account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <ShareButton tone="dark" className="px-5 py-3.5 text-base" />
              </div>
            </div>
            <LogoMark size={220} className="hidden justify-self-end md:block" />
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pt-24">
        <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-brand">
          Veelgestelde vragen
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[38px]">
          Vragen over abonnementen beheren
        </h2>
        <div className="mt-9 flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details
                className="group rounded-[18px] border border-line bg-white px-6 py-5"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-slate-900">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-brand transition group-open:rotate-45 group-open:bg-mint-soft">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
