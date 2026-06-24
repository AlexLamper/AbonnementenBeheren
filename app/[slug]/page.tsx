import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Check, Plus } from "lucide-react";
import { PRESETS, getPreset } from "@/lib/presets";
import { getPresetContent } from "@/lib/presets/content";
import { getPresets } from "@/lib/presets/store";
import { ServiceLogo } from "@/components/ServiceLogo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatEUR, toMonthly, periodLabel } from "@/lib/money";
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

  // Actuele prijzen uit de database (valt terug op statische catalogus).
  const presets = await getPresets();
  const preset = presets.find((p) => p.id === slug) ?? getPreset(slug);
  const content = getPresetContent(slug);

  if (!preset) notFound();

  const cheapest = [...preset.plans].sort(
    (a, b) => toMonthly(a.price, a.billingPeriod) - toMonthly(b.price, b.billingPeriod)
  )[0];

  const related = presets
    .filter((p) => p.category === preset.category && p.id !== preset.id)
    .slice(0, 6);

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
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
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

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/diensten" className="hover:text-brand">
            Diensten
          </Link>{" "}
          / <span className="text-slate-700">{preset.name}</span>
        </nav>

        {/* Title */}
        <div className="flex items-center gap-4">
          <ServiceLogo
            name={preset.name}
            logoUrl={preset.logoUrl}
            color={preset.color}
            size={56}
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {preset.name} abonnement: prijzen en kosten
            </h1>
            {content?.tagline && (
              <p className="mt-1 text-lg text-slate-600">{content.tagline}</p>
            )}
          </div>
        </div>

        {cheapest && (
          <p className="mt-4 text-slate-600">
            {preset.name} is er al vanaf{" "}
            <strong className="text-slate-900">
              {formatEUR(toMonthly(cheapest.price, cheapest.billingPeriod))}
            </strong>{" "}
            per maand. Hieronder zie je alle abonnementen en actuele prijzen.
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/overzicht?add=${preset.id}`}
            className="hover-lift inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-medium text-white shadow-sm transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Toevoegen aan mijn overzicht
          </Link>
          <a
            href={preset.affiliateUrl ?? content?.website}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Bekijk aanbieding
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Prijzen */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            {preset.name} abonnementen en prijzen
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Abonnement</th>
                  <th className="px-4 py-3 font-medium">Prijs</th>
                  <th className="px-4 py-3 font-medium">Per maand</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {preset.plans.map((plan) => (
                  <tr key={plan.name}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {plan.name}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {formatEUR(plan.price)}{" "}
                      <span className="text-slate-400">
                        {periodLabel(plan.billingPeriod).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {formatEUR(toMonthly(plan.price, plan.billingPeriod))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/overzicht?add=${preset.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        Toevoegen
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Prijzen zijn indicatief en kunnen wijzigen. Controleer de actuele
            prijs op de officiële website.
          </p>
        </section>

        {/* Uitleg */}
        {content?.description && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Wat is {preset.name}?
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              {content.description}
            </p>
          </section>
        )}

        {/* Verschillen */}
        {content?.differences && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Verschil tussen de {preset.name}-abonnementen
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              {content.differences}
            </p>
          </section>
        )}

        {/* Officiële website */}
        {content?.website && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Officiële website
            </h2>
            <a
              href={content.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-medium text-brand hover:underline"
            >
              {content.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              <ExternalLink className="h-4 w-4" />
            </a>
          </section>
        )}

        {/* CTA */}
        <section className="mt-14 overflow-hidden rounded-3xl bg-brand px-6 py-12 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Houd {preset.name} en al je andere abonnementen bij
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Voeg {preset.name} gratis toe aan je overzicht en zie direct wat al
            je abonnementen samen per maand en per jaar kosten.
          </p>
          <ul className="mx-auto mt-5 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/90">
            {["Voor altijd gratis", "Geen creditcard", "In één klik"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            href={`/overzicht?add=${preset.id}`}
            className="hover-lift mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-brand shadow-sm transition hover:bg-slate-100"
          >
            <Plus className="h-4 w-4" />
            {preset.name} toevoegen
          </Link>
        </section>

        {/* Gerelateerd */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900">
              Andere diensten in {preset.category}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.id}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-50"
                >
                  <ServiceLogo
                    name={p.name}
                    logoUrl={p.logoUrl}
                    color={p.color}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{p.name}</p>
                    <p className="text-sm text-slate-500">{p.category}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
