import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getPresets } from "@/lib/presets/store";
import { toMonthly } from "@/lib/money";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  DienstenBrowser,
  DienstenBrowserWithParams,
  type DienstItem,
} from "@/components/DienstenBrowser";

export const metadata: Metadata = {
  title: "Alle diensten en abonnementsprijzen",
  description:
    "Bekijk alle diensten met hun actuele abonnementsprijzen per maand en per jaar. Van Spotify en Netflix tot Ziggo en Basic-Fit - vergelijk en voeg toe aan je overzicht.",
  alternates: { canonical: "/diensten" },
};

export default async function DienstenPage() {
  const presets = await getPresets();

  const items: DienstItem[] = presets.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    logoUrl: p.logoUrl,
    color: p.color,
    fromMonthly: Math.min(
      ...p.plans.map((pl) => toMonthly(pl.price, pl.billingPeriod))
    ),
  }));

  return (
    <div className="min-h-screen">
      <div className="bg-navy">
        <SiteHeader active="diensten" />
        <section className="mx-auto max-w-6xl px-5 pb-7 pt-12 sm:px-6 sm:pt-14">
          <nav aria-label="Kruimelpad" className="text-sm text-haze">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            <span className="text-navy-soft">/</span>{" "}
            <span className="text-white">Diensten</span>
          </nav>
          <h1 className="mt-3.5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-[52px]">
            Alle diensten en abonnementsprijzen
          </h1>
          <p className="mt-3.5 max-w-2xl text-[17px] leading-relaxed text-haze">
            Bekijk per dienst de actuele abonnementen en kosten. Klik door voor
            uitleg en verschillen, of voeg een abonnement met één klik toe aan
            je overzicht.
          </p>
        </section>
      </div>

      {/* De volledige lijst wordt server-side gerenderd (fallback); de
          client-versie leest daarna ?q= uit de URL. */}
      <Suspense fallback={<DienstenBrowser items={items} />}>
        <DienstenBrowserWithParams items={items} />
      </Suspense>

      <SiteFooter />
    </div>
  );
}
