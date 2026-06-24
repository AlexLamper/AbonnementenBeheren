import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPresets } from "@/lib/presets/store";
import { ServiceLogo } from "@/components/ServiceLogo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatEUR, toMonthly } from "@/lib/money";

export const metadata: Metadata = {
  title: "Alle diensten en abonnementsprijzen",
  description:
    "Bekijk alle diensten met hun actuele abonnementsprijzen per maand en per jaar. Van Spotify en Netflix tot Ziggo en Basic-Fit - vergelijk en voeg toe aan je overzicht.",
  alternates: { canonical: "/diensten" },
};

export default async function DienstenPage() {
  const presets = await getPresets();

  // Groepeer op categorie, gesorteerd op categorienaam.
  const byCategory = new Map<string, typeof presets>();
  for (const p of presets) {
    const list = byCategory.get(p.category) ?? [];
    list.push(p);
    byCategory.set(p.category, list);
  }
  const categories = [...byCategory.keys()].sort((a, b) =>
    a.localeCompare(b, "nl")
  );

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Alle diensten en abonnementsprijzen
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Bekijk per dienst de actuele abonnementen en kosten. Klik door voor
          uitleg, verschillen en de officiële website - of voeg een abonnement
          met één klik toe aan je overzicht.
        </p>

        {categories.map((category) => (
          <section key={category} className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {category}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory
                .get(category)!
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name, "nl"))
                .map((p) => {
                  const cheapest = [...p.plans].sort(
                    (a, b) =>
                      toMonthly(a.price, a.billingPeriod) -
                      toMonthly(b.price, b.billingPeriod)
                  )[0];
                  return (
                    <Link
                      key={p.id}
                      href={`/${p.id}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
                    >
                      <ServiceLogo
                        name={p.name}
                        logoUrl={p.logoUrl}
                        color={p.color}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900">{p.name}</p>
                        {cheapest && (
                          <p className="text-sm text-slate-500">
                            vanaf{" "}
                            {formatEUR(
                              toMonthly(cheapest.price, cheapest.billingPeriod)
                            )}
                            /mnd
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
            </div>
          </section>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
