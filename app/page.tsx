import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  Search,
  ArrowRight,
  ArrowDownWideNarrow,
  ChevronDown,
  Plus,
  X,
} from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { getPresets } from "@/lib/presets/store";
import type { Preset } from "@/lib/presets/types";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ShareButton } from "@/components/ShareButton";
import { IosAppButton } from "@/components/IosAppButton";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import {
  formatEUR,
  periodLabel,
  toMonthly,
  toYearly,
  totals,
  type BillingPeriod,
} from "@/lib/money";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { FREE_SUBSCRIPTION_LIMIT, PREMIUM_ENABLED } from "@/lib/premium";

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
    a: PREMIUM_ENABLED
      ? `Ja, je begint gratis en houdt tot ${FREE_SUBSCRIPTION_LIMIT} abonnementen bij zonder creditcard. Wil je er meer bijhouden, dan kan dat met Premium.`
      : "Ja, AbonnementenBeheren is volledig gratis. Je hebt geen creditcard nodig en er zijn geen verborgen kosten.",
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

// "Hoe het werkt": de dienst die in het voorbeeld aan het hero-overzicht
// wordt toegevoegd. Bewust een dienst die daar nog niet in staat.
const DEMO: [string, string] = ["disneyplus", "Standaard"];

// De stappen verwijzen naar de genummerde punten in het voorbeeld.
const HOW_STEPS = [
  {
    title: "Typ de naam",
    text: "Tik in je overzicht op Toevoegen en typ een paar letters. Je ziet de dienst met logo en het aantal pakketten.",
  },
  {
    title: "Kies je pakket",
    text: "Alle pakketten staan erbij, met prijs. Je tikt aan welk pakket je hebt.",
  },
  {
    title: "Je totaal rekent mee",
    text: "Je maand- en jaartotaal kloppen meteen weer. Zelf optellen hoeft niet.",
  },
];

// "Per jaar"-voorbeeld: diensten uit de lijst met verschillende
// betaalperiodes, plus één zelf toegevoegd abonnement per kwartaal.
const YEAR_SAMPLE: [string, string][] = [
  ["basicfit", "Comfort"],
  ["max", "Standaard"],
  ["microsoft365", "Family (jaar)"],
  ["amazonprime", "Jaar"],
];
const CUSTOM_SAMPLE = {
  name: "Tennisclub",
  price: 45,
  billingPeriod: "kwartaal" as BillingPeriod,
  color: "#2a4b63",
};

function cheapestMonthly(p: Preset) {
  return Math.min(...p.plans.map((pl) => toMonthly(pl.price, pl.billingPeriod)));
}

/** Genummerd punt dat een stap koppelt aan een plek in het voorbeeld. */
function StepPin({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint font-display text-[13px] font-bold text-mint-ink ${className}`}
    >
      {n}
    </span>
  );
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

  // Hoe het werkt: één dienst toevoegen aan het voorbeeldoverzicht uit de hero.
  const sampleIds = new Set(sampleItems.map((s) => s.preset.id));
  const demo =
    byId(DEMO[0]) ??
    presets.find((p) => p.plans.length > 1 && !sampleIds.has(p.id)) ??
    presets.find((p) => p.plans.length > 0);
  const demoPlan = demo
    ? (demo.plans.find((pl) => pl.name === DEMO[1]) ??
      demo.plans[Math.min(1, demo.plans.length - 1)])
    : undefined;
  const demoAfter = demoPlan
    ? {
        added: toMonthly(demoPlan.price, demoPlan.billingPeriod),
        monthly: monthly + toMonthly(demoPlan.price, demoPlan.billingPeriod),
        yearly: yearly + toYearly(demoPlan.price, demoPlan.billingPeriod),
      }
    : undefined;
  const demoQuery = demo ? demo.name.slice(0, 4).toLowerCase() : "";

  // Per jaar: echte prijzen uit de lijst plus één eigen abonnement.
  const yearRows = [
    ...YEAR_SAMPLE.map(([id, planName]) => {
      const preset = byId(id);
      if (!preset || preset.plans.length === 0) return null;
      const plan = preset.plans.find((pl) => pl.name === planName) ?? preset.plans[0];
      return {
        key: preset.id,
        name: preset.name,
        presetId: preset.id as string | undefined,
        logoUrl: preset.logoUrl,
        color: preset.color,
        planName: plan.name,
        price: plan.price,
        billingPeriod: plan.billingPeriod,
        custom: false,
      };
    }),
    {
      key: "eigen",
      name: CUSTOM_SAMPLE.name,
      presetId: undefined,
      logoUrl: undefined,
      color: CUSTOM_SAMPLE.color,
      planName: "Eigen abonnement",
      price: CUSTOM_SAMPLE.price,
      billingPeriod: CUSTOM_SAMPLE.billingPeriod,
      custom: true,
    },
  ]
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({
      ...r,
      monthly: toMonthly(r.price, r.billingPeriod),
      yearly: toYearly(r.price, r.billingPeriod),
    }))
    .sort((a, b) => b.yearly - a.yearly);
  const yearTotals = totals(yearRows);

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
            <IosAppButton />
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

      {/* Hoe het werkt: één dienst toevoegen, met echte pakketten en prijzen */}
      <section
        id="hoe-het-werkt"
        aria-labelledby="hoe-het-werkt-titel"
        className="mx-auto max-w-5xl scroll-mt-24 px-5 pt-24 sm:px-6 sm:pt-28"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <h2
              id="hoe-het-werkt-titel"
              className="max-w-md text-balance font-display text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[40px]"
            >
              {demo
                ? `Zo zet je ${demo.name} in je overzicht`
                : "Zo zet je een abonnement in je overzicht"}
            </h2>
            <p className="mt-4 max-w-md text-pretty text-[17px] leading-relaxed text-slate-600">
              Bij elke dienst uit de lijst gaat het zo. Staat jouw abonnement er
              niet bij, dan vul je zelf de naam, prijs en periode in.
            </p>

            <ol className="mt-9 flex max-w-md flex-col gap-6">
              {HOW_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <StepPin n={i + 1} className="mt-px" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-9 max-w-md border-t border-line pt-6">
              <p className="text-[15px] leading-relaxed text-slate-600">
                Je hebt alleen een gratis account nodig, met je e-mailadres of
                Google. Geen creditcard.
              </p>
              <Link
                href="/diensten"
                className="mt-3 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
              >
                Alle {presets.length} diensten bekijken
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {demo && demoPlan && demoAfter && (
            <Reveal>
              <figure className="relative mx-auto w-full max-w-[460px] sm:ml-3.5 sm:mr-auto lg:ml-auto lg:mr-0">
                <figcaption className="sr-only">
                  Voorbeeld: na het typen van &ldquo;{demoQuery}&rdquo; verschijnt{" "}
                  {demo.name} met {demo.plans.length} pakketten. Je kiest{" "}
                  {demoPlan.name} voor {formatEUR(demoPlan.price)}{" "}
                  {periodLabel(demoPlan.billingPeriod).toLowerCase()}. Je
                  maandtotaal gaat van {formatEUR(monthly)} naar{" "}
                  {formatEUR(demoAfter.monthly)}, je jaartotaal wordt{" "}
                  {formatEUR(demoAfter.yearly)}.
                </figcaption>

                <div aria-hidden>
                  {/* Nagebouwde "Abonnement toevoegen"-dialog */}
                  <div className="rounded-[28px] border border-line bg-white p-5 pb-20 shadow-float sm:p-6 sm:pb-20">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-[22px] font-bold text-slate-900">
                        Abonnement toevoegen
                      </p>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-slate-600">
                        <X className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    </div>

                    <div className="relative mt-5">
                      <StepPin
                        n={1}
                        className="absolute -left-[35px] top-1/2 -translate-y-1/2 ring-4 ring-white sm:-left-[39px]"
                      />
                      <div className="flex h-[50px] items-center gap-2.5 rounded-full border border-mint px-4 ring-4 ring-mint/20">
                        <Search className="h-[18px] w-[18px] shrink-0 text-slate-500" />
                        <span className="text-base text-slate-900">
                          {demoQuery}
                          <span className="ml-px inline-block h-5 w-[2px] translate-y-1 bg-slate-900" />
                        </span>
                      </div>
                    </div>

                    {/* Zelfde plek als in de echte dialog: direct onder de zoekbalk */}
                    <div className="mt-3.5 flex items-center gap-3 rounded-[18px] border-[1.5px] border-dashed border-[#c3d3da] px-4 py-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-soft text-brand">
                        <Plus className="h-4 w-4" strokeWidth={2.6} />
                      </span>
                      <span className="min-w-0 flex-1 text-sm">
                        <span className="block truncate font-semibold text-slate-900">
                          Eigen abonnement toevoegen
                        </span>
                        <span className="block text-[13px] text-slate-500">
                          Staat je dienst er niet bij? Vul naam en prijs zelf in.
                        </span>
                      </span>
                    </div>

                    <div className="mt-3.5 rounded-[20px] border border-[#9fe6d9]">
                      <div className="flex items-center gap-3.5 rounded-t-[19px] bg-mint-wash px-4 py-3">
                        <ServiceLogo
                          name={demo.name}
                          presetId={demo.id}
                          logoUrl={demo.logoUrl}
                          color={demo.color}
                          size={42}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-slate-900">{demo.name}</p>
                          <p className="text-[13px] text-slate-500">
                            {demo.category}
                            {demo.plans.length > 1 && ` · ${demo.plans.length} pakketten`}
                          </p>
                        </div>
                        <ChevronDown className="h-5 w-5 rotate-180 text-brand" />
                      </div>
                      <ul className="flex flex-col p-1.5">
                        {demo.plans.map((plan) => {
                          const picked = plan === demoPlan;
                          return (
                            <li
                              key={plan.name}
                              className={`relative flex items-center justify-between gap-3 rounded-[14px] py-3 pl-3 pr-3 sm:pl-[70px] sm:pr-3.5 ${
                                picked ? "bg-surface" : ""
                              }`}
                            >
                              {picked && (
                                <StepPin
                                  n={2}
                                  className="absolute -left-[42px] top-1/2 -translate-y-1/2 ring-4 ring-white sm:-left-[46px]"
                                />
                              )}
                              <span className="text-[15px] font-semibold leading-snug text-slate-800">
                                {plan.name}
                              </span>
                              <span className="flex shrink-0 items-center gap-2.5">
                                <span className="flex flex-col items-end sm:flex-row sm:items-baseline sm:gap-2.5">
                                  <span className="font-display text-[15px] font-bold tabular-nums text-slate-900">
                                    {formatEUR(plan.price)}
                                  </span>
                                  <span className="text-xs text-slate-500 sm:text-[13px]">
                                    {periodLabel(plan.billingPeriod).toLowerCase()}
                                  </span>
                                </span>
                                <span
                                  className={`flex h-7 w-7 items-center justify-center rounded-full text-mint-ink ${
                                    picked ? "bg-mint" : "bg-mint-soft"
                                  }`}
                                >
                                  <Plus className="h-3.5 w-3.5" strokeWidth={2.8} />
                                </span>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                  </div>

                  {/* Het totaal dat meteen meerekent */}
                  <div className="relative -mt-12 ml-auto w-[88%] rounded-[22px] bg-navy p-5 shadow-[0_24px_48px_-24px_rgba(8,35,59,0.6)] sm:w-[84%] sm:p-6">
                    <StepPin
                      n={3}
                      className="absolute -left-3.5 top-1/2 -translate-y-1/2 ring-4 ring-white"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-haze">Per maand</p>
                      <span className="rounded-full bg-mint px-2.5 py-1 font-display text-xs font-bold tabular-nums text-mint-ink">
                        + {formatEUR(demoAfter.added)}
                      </span>
                    </div>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display font-bold leading-none tracking-tight tabular-nums">
                      <span className="text-lg text-haze">{formatEUR(monthly)}</span>
                      <ArrowRight className="h-4 w-4 text-haze" />
                      <span className="text-[34px] text-white sm:text-[38px]">
                        {formatEUR(demoAfter.monthly)}
                      </span>
                    </p>
                    <dl className="mt-4 flex flex-col gap-2 border-t border-white/[0.12] pt-3.5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-haze">Per jaar</dt>
                        <dd className="font-display font-bold tabular-nums text-white">
                          {formatEUR(demoAfter.yearly)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-haze">Actief</dt>
                        <dd className="font-display font-bold text-white">
                          {sampleItems.length + 1}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* Per maand en per jaar: een rekenvoorbeeld met echte prijzen */}
      <section
        aria-labelledby="per-jaar-titel"
        className="mx-auto max-w-5xl px-5 pt-24 sm:px-6 sm:pt-32"
      >
        <h2
          id="per-jaar-titel"
          className="text-balance font-display text-[2.4rem] font-bold leading-[1.02] tracking-[-0.035em] text-slate-900 sm:text-5xl lg:text-[56px]"
        >
          <span className="block">Per maand valt het mee.</span>
          <span className="block">Per jaar niet altijd.</span>
        </h2>
        <p className="mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-slate-600 lg:ml-auto lg:mt-3">
          Je overzicht rekent alles om naar één maandbedrag en één jaarbedrag,
          ook wat je per week, per kwartaal of per jaar betaalt. Hieronder een
          voorbeeld met prijzen uit de lijst en één eigen abonnement.
        </p>

        <Reveal className="mt-10 sm:mt-12">
          <div className="overflow-hidden rounded-[28px] border border-line bg-white">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">
                Rekenvoorbeeld: wat {yearRows.length} abonnementen per maand en per
                jaar kosten
              </caption>
              <thead>
                <tr className="text-[13px] text-slate-500">
                  <th scope="col" className="py-4 pl-4 pr-2 font-medium sm:pl-7">
                    Abonnement
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-4 font-medium md:table-cell md:w-[200px]"
                  >
                    Je betaalt
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-4 text-right font-medium sm:table-cell sm:w-[130px]"
                  >
                    Per maand
                  </th>
                  <th
                    scope="col"
                    className="w-[128px] bg-mint-wash py-4 pl-3 pr-4 text-right font-semibold text-brand sm:w-[180px] sm:pr-7 lg:w-[210px]"
                  >
                    Per jaar
                  </th>
                </tr>
              </thead>
              <tbody>
                {yearRows.map((r) => (
                  <tr key={r.key} className="border-t border-[#eef2f5]">
                    <th scope="row" className="py-3.5 pl-4 pr-2 text-left font-normal sm:pl-7">
                      <div className="flex items-center gap-3">
                        <ServiceLogo
                          name={r.name}
                          presetId={r.presetId}
                          logoUrl={r.logoUrl}
                          color={r.color}
                          size={40}
                          rounded="rounded-[12px]"
                        />
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-bold leading-snug text-slate-900">
                            {r.name}
                            {r.custom && (
                              <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold leading-normal text-slate-600">
                                zelf toegevoegd
                              </span>
                            )}
                          </p>
                          <p className="text-[13px] text-slate-500">
                            <span className="md:hidden">
                              {formatEUR(r.price)}{" "}
                              {periodLabel(r.billingPeriod).toLowerCase()}
                            </span>
                            <span className="hidden md:inline">{r.planName}</span>
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="hidden px-3 py-3.5 text-[15px] text-slate-600 md:table-cell">
                      <span className="font-display font-semibold tabular-nums text-slate-900">
                        {formatEUR(r.price)}
                      </span>{" "}
                      {periodLabel(r.billingPeriod).toLowerCase()}
                    </td>
                    <td className="hidden px-3 py-3.5 text-right font-display text-[17px] tabular-nums text-slate-700 sm:table-cell">
                      {formatEUR(r.monthly)}
                    </td>
                    <td className="bg-mint-wash py-3.5 pl-3 pr-4 text-right font-display text-[17px] font-bold tabular-nums text-slate-900 sm:pr-7 sm:text-lg">
                      {formatEUR(r.yearly)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-navy">
                  <th
                    scope="row"
                    className="py-5 pl-4 pr-2 text-left align-bottom font-normal sm:py-6 sm:pl-7"
                  >
                    <span className="block font-display text-lg font-bold text-white">
                      Samen
                    </span>
                    <span className="block text-[13px] text-haze sm:hidden">
                      {formatEUR(yearTotals.monthly)} per maand
                    </span>
                    <span className="hidden text-[13px] text-haze sm:block">
                      {yearRows.length} abonnementen
                    </span>
                  </th>
                  <td className="hidden md:table-cell" />
                  <td className="hidden px-3 py-5 text-right align-bottom font-display text-lg font-bold tabular-nums text-white sm:table-cell sm:py-6 sm:text-xl">
                    {formatEUR(yearTotals.monthly)}
                  </td>
                  <td className="py-5 pl-3 pr-4 text-right align-bottom font-display text-[22px] font-bold leading-none tracking-tight tabular-nums text-mint sm:py-6 sm:pr-7 sm:text-[34px] lg:text-[40px]">
                    {formatEUR(yearTotals.yearly)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>
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
