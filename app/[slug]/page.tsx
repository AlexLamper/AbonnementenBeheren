import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Check, Plus, ChevronRight } from "lucide-react";
import { PRESETS, getPreset } from "@/lib/presets";
import { getPresetContent } from "@/lib/presets/content";
import { getPresets } from "@/lib/presets/store";
import { ServiceLogo } from "@/components/ServiceLogo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LogoMark } from "@/components/Logo";
import { formatEUR, toMonthly, toYearly, periodLabel } from "@/lib/money";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// Bouw alle dienstpagina's statisch voor (op basis van de vaste preset-ids).
export function generateStaticParams() {
  return PRESETS.map((p) => ({ slug: p.id }));
}

const CURRENT_YEAR = new Date().getFullYear();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preset = getPreset(slug);
  const content = getPresetContent(slug);
  if (!preset) return {};

  const title = `${preset.name} abonnement: prijzen en kosten (${CURRENT_YEAR})`;
  const description = `Bekijk alle ${preset.name}-abonnementen en de actuele prijzen per maand en per jaar. ${content?.tagline ?? ""} Voeg ${preset.name} met één klik toe aan je eigen overzicht.`;

  return {
    title,
    description,
    alternates: { canonical: `/${preset.id}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `/${preset.id}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const presets = await getPresets();
  const preset = presets.find((p) => p.id === slug) ?? getPreset(slug);
  const content = getPresetContent(slug);

  if (!preset) notFound();

  const cheapest = [...preset.plans].sort(
    (a, b) => toMonthly(a.price, a.billingPeriod) - toMonthly(b.price, b.billingPeriod)
  )[0];

  const related = presets
    .filter((p) => p.category === preset.category && p.id !== preset.id)
    .slice(0, 5);

  const addHref = `/overzicht?add=${preset.id}`;
  const offerHref = preset.affiliateUrl ?? content?.website;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: `${preset.name} abonnement`,
        description: content?.description ?? `${preset.name}-abonnementen en prijzen.`,
        image: preset.logoUrl,
        brand: { "@type": "Brand", name: preset.name },
        category: preset.category,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: Math.min(...preset.plans.map((p) => p.price)).toFixed(2),
          highPrice: Math.max(...preset.plans.map((p) => p.price)).toFixed(2),
          offerCount: preset.plans.length,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Diensten",
            item: `${SITE_URL}/diensten`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: preset.name,
            item: `${SITE_URL}/${preset.id}`,
          },
        ],
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

      <div className="bg-navy pb-24">
        <SiteHeader />
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-6 sm:pt-12">
          <nav aria-label="Kruimelpad" className="text-sm text-haze">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            <span className="text-navy-soft">/</span>{" "}
            <Link href="/diensten" className="hover:text-white">
              Diensten
            </Link>{" "}
            <span className="text-navy-soft">/</span>{" "}
            <span className="text-white">{preset.name}</span>
          </nav>

          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            <ServiceLogo
              name={preset.name}
              presetId={preset.id}
              logoUrl={preset.logoUrl}
              color={preset.color}
              size={72}
              rounded="rounded-[22px]"
            />
            <div className="min-w-0">
              <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                {preset.name} abonnement: prijzen en kosten
              </h1>
              {content?.tagline && (
                <p className="mt-2 text-base text-haze sm:text-[17px]">{content.tagline}</p>
              )}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={addHref}
              className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3 font-bold text-mint-ink transition hover:bg-mint-light"
            >
              <Plus className="h-4 w-4" />
              Toevoegen aan mijn overzicht
            </Link>
            {offerHref && (
              <a
                href={offerHref}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Bekijk aanbieding
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {cheapest && (
              <span className="text-sm text-haze sm:ml-2">
                Al vanaf{" "}
                <span className="font-display text-lg font-bold text-mint-light">
                  {formatEUR(toMonthly(cheapest.price, cheapest.billingPeriod))}
                </span>{" "}
                per maand
              </span>
            )}
          </div>
        </section>
      </div>

      <div className="mx-auto -mt-14 grid max-w-6xl items-start gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="flex min-w-0 flex-col gap-7">
          {/* Prijzen */}
          <section className="rounded-3xl border border-line bg-white p-5 shadow-float sm:p-7">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              {preset.name} abonnementen en prijzen
            </h2>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {preset.plans.map((plan) => {
                const isCheapest = preset.plans.length > 1 && plan === cheapest;
                const monthly = toMonthly(plan.price, plan.billingPeriod);
                return (
                  <li
                    key={plan.name}
                    className={`flex flex-col gap-2 rounded-[18px] border p-5 ${
                      isCheapest ? "border-[#9fe6d9] bg-mint-wash" : "border-line bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-slate-900">{plan.name}</h3>
                      {isCheapest && (
                        <span className="rounded-full bg-mint-soft px-2.5 py-1 text-xs font-bold text-brand">
                          Goedkoopst
                        </span>
                      )}
                    </div>
                    <p className="font-display text-[32px] font-bold leading-none tracking-tight text-slate-900">
                      {formatEUR(plan.price)}
                      <span className="ml-1 font-sans text-sm font-medium tracking-normal text-slate-500">
                        {periodLabel(plan.billingPeriod).toLowerCase()}
                      </span>
                    </p>
                    <p className="text-sm text-slate-500">
                      {plan.billingPeriod === "maandelijks"
                        ? `${formatEUR(toYearly(plan.price, plan.billingPeriod))} per jaar`
                        : `≈ ${formatEUR(monthly)} per maand`}
                    </p>
                    <Link
                      href={addHref}
                      className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#cde3e0] py-2.5 text-sm font-bold text-brand transition hover:border-mint hover:bg-mint-soft"
                    >
                      <Plus className="h-4 w-4" />
                      Toevoegen
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3.5 text-[13px] text-slate-500">
              Prijzen zijn indicatief en kunnen wijzigen. Controleer de actuele
              prijs op de officiële website.
            </p>
          </section>

          {/* Uitleg */}
          {(content?.description || content?.differences || content?.website) && (
            <section className="rounded-3xl border border-line bg-white p-5 sm:p-7">
              {content?.description && (
                <>
                  <h2 className="font-display text-[22px] font-bold text-slate-900">
                    Wat is {preset.name}?
                  </h2>
                  <p className="mt-2.5 leading-[1.7] text-slate-600">{content.description}</p>
                </>
              )}
              {content?.differences && (
                <>
                  <h2 className="mt-7 font-display text-[22px] font-bold text-slate-900">
                    Verschil tussen de {preset.name}-abonnementen
                  </h2>
                  <p className="mt-2.5 leading-[1.7] text-slate-600">{content.differences}</p>
                </>
              )}
              {content?.website && (
                <>
                  <h2 className="mt-7 font-display text-[22px] font-bold text-slate-900">
                    Officiële website
                  </h2>
                  <a
                    href={content.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                  >
                    {content.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </>
              )}
            </section>
          )}
        </main>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-navy p-6 shadow-float">
            <LogoMark size={40} />
            <h2 className="mt-3.5 font-display text-[22px] font-bold leading-tight text-white">
              Houd {preset.name} en al je andere abonnementen bij
            </h2>
            <ul className="mt-3.5 flex flex-col gap-2 text-sm text-mist">
              {["Voor altijd gratis", "Geen creditcard", "In één klik toegevoegd"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-mint" strokeWidth={2.6} />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href={addHref}
              className="mt-5 flex items-center justify-center rounded-full bg-mint py-3 font-bold text-mint-ink transition hover:bg-mint-light"
            >
              {preset.name} toevoegen
            </Link>
          </div>

          {related.length > 0 && (
            <div className="rounded-3xl border border-line bg-white p-5">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                Meer in {preset.category}
              </h2>
              <ul className="flex flex-col gap-1">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/${p.id}`}
                      className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface"
                    >
                      <ServiceLogo
                        name={p.name}
                        presetId={p.id}
                        logoUrl={p.logoUrl}
                        color={p.color}
                        size={36}
                        rounded="rounded-[10px]"
                      />
                      <span className="min-w-0 flex-1 truncate font-semibold text-slate-900">
                        {p.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}
