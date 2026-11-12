import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowRight, Check, CircleAlert, PartyPopper, Sparkles, X } from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import {
  FREE_SUBSCRIPTION_LIMIT,
  PREMIUM_ENABLED,
  PREMIUM_PRICES,
  getEntitlement,
  type Entitlement,
} from "@/lib/premium";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PerkList, PlanPicker } from "@/components/PlanPicker";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Houd onbeperkt abonnementen bij met AbonnementenBeheren Premium. Gratis beginnen kan altijd.",
  alternates: { canonical: "/premium" },
};

const NOTICES: Record<string, { tone: "ok" | "warn"; text: string }> = {
  gelukt: {
    tone: "ok",
    text: "Bedankt! Je betaling is gelukt. Het kan een paar seconden duren voordat Premium overal actief is.",
  },
  geannuleerd: { tone: "warn", text: "Je hebt het afrekenen afgebroken. Er is niets betaald." },
  fout: { tone: "warn", text: "Er ging iets mis met de betaling. Probeer het later opnieuw." },
  "geen-klant": {
    tone: "warn",
    text: "We vonden geen betaling op de website bij dit account. Heb je Premium in de app gekocht? Beheer het dan in de App Store of Google Play.",
  },
};

export default async function PremiumPage({
  searchParams,
}: {
  searchParams: Promise<{ betaling?: string }>;
}) {
  if (!PREMIUM_ENABLED) redirect("/");

  const { betaling } = await searchParams;
  const notice = betaling ? NOTICES[betaling] : undefined;

  const session = await getServerSession(authOptions);
  const entitlement = session?.user?.id ? await getEntitlement(session.user.id) : null;

  return (
    <div className="min-h-screen">
      <div className="bg-navy pb-28 sm:pb-32">
        <SiteHeader />
        <section className="mx-auto flex max-w-3xl flex-col items-center px-5 pt-14 text-center sm:pt-20">
          <span className="inline-flex animate-fade-in-up items-center gap-1.5 rounded-full bg-mint/15 px-3.5 py-1.5 text-sm font-bold text-mint-light">
            <Sparkles className="h-4 w-4" strokeWidth={2.4} />
            Premium
          </span>
          <h1 className="mt-5 animate-fade-in-up font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.03em] text-white [animation-delay:60ms] sm:text-[56px]">
            Gratis beginnen.
            <br />
            <span className="text-mint">Onbeperkt met Premium.</span>
          </h1>
          <p className="mt-5 max-w-xl animate-fade-in-up text-base leading-relaxed text-haze [animation-delay:120ms] sm:text-lg">
            Met een gratis account houd je {FREE_SUBSCRIPTION_LIMIT} abonnementen
            bij. Heb je er meer? Met Premium zet je ze allemaal op één plek.
          </p>
        </section>
      </div>

      <section className="relative mx-auto -mt-20 max-w-4xl px-4 sm:px-6">
        {notice && (
          <div
            role="status"
            className={`mb-4 flex items-start gap-3 rounded-[18px] px-4 py-3.5 text-[15px] shadow-float ${
              notice.tone === "ok"
                ? "bg-mint-soft text-[#0b4a44]"
                : "bg-white text-slate-700"
            }`}
          >
            {notice.tone === "ok" ? (
              <PartyPopper className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            ) : (
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            )}
            {notice.text}
          </div>
        )}

        <div className="grid animate-fade-in-up gap-4 [animation-delay:180ms] md:grid-cols-2">
          {/* Gratis */}
          <div className="rounded-[28px] border border-line bg-white p-6 shadow-float sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand">Gratis</p>
            <p className="mt-2 font-display text-[34px] font-bold tracking-tight text-slate-900">
              € 0
            </p>
            <p className="text-sm text-slate-500">voor altijd</p>
            <ul className="mt-6 space-y-2.5 text-[15px] text-slate-700">
              <Row ok>Tot {FREE_SUBSCRIPTION_LIMIT} abonnementen bijhouden</Row>
              <Row ok>Totaal per maand en per jaar</Row>
              <Row ok>Alle diensten met actuele prijzen</Row>
              <Row ok>Website en app</Row>
              <Row>Onbeperkt abonnementen</Row>
              <Row>Exporteren naar Excel (CSV)</Row>
            </ul>
          </div>

          {/* Premium */}
          <div className="rounded-[28px] border-2 border-mint bg-white p-6 shadow-float sm:p-7">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.6} />
              Premium
            </p>
            <p className="mt-2 font-display text-[34px] font-bold tracking-tight text-slate-900">
              {PREMIUM_PRICES.monthly}
            </p>
            <p className="text-sm text-slate-500">
              per maand, of {PREMIUM_PRICES.yearly} per jaar
            </p>
            <div className="mt-6">
              <PerkList />
            </div>
            <div className="mt-6">
              <PremiumAction loggedIn={Boolean(session?.user)} entitlement={entitlement} />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-2xl space-y-3">
          <h2 className="mb-5 text-center font-display text-2xl font-bold text-slate-900">
            Veelgestelde vragen
          </h2>
          <Faq q="Wat gebeurt er met mijn abonnementen als ik geen Premium neem?">
            Niets. Alles wat je hebt toegevoegd blijft staan en kun je altijd
            aanpassen of verwijderen. Alleen nieuwe abonnementen toevoegen boven
            de {FREE_SUBSCRIPTION_LIMIT} vraagt om Premium.
          </Faq>
          <Faq q="Werkt Premium ook in de app?">
            Ja. Premium hoort bij je account. Koop je het op de website, dan
            heb je het ook in de app, en andersom.
          </Faq>
          <Faq q="Kan ik op elk moment opzeggen?">
            Ja. Op de website zeg je op via &quot;Abonnement beheren&quot;. In de
            app regel je het via de App Store of Google Play. Je houdt Premium
            tot het einde van de betaalde periode.
          </Faq>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function PremiumAction({
  loggedIn,
  entitlement,
}: {
  loggedIn: boolean;
  entitlement: Entitlement | null;
}) {
  if (!loggedIn || !entitlement) {
    return (
      <div className="space-y-2.5">
        <Link
          href="/login?modus=registreren&next=/premium"
          className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-mint font-bold text-mint-ink transition hover:bg-mint-light"
        >
          Maak gratis je account
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/login?next=/premium"
          className="flex h-[50px] w-full items-center justify-center rounded-full border border-slate-300 font-semibold text-slate-900 transition hover:bg-surface"
        >
          Ik heb al een account
        </Link>
      </div>
    );
  }

  if (entitlement.isPremium) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 rounded-[18px] bg-mint-wash px-4 py-3.5 font-semibold text-[#0b4a44]">
          <Check className="h-5 w-5 text-brand" strokeWidth={2.6} />
          Je hebt Premium. Bedankt voor je steun!
        </div>
        {entitlement.source === "stripe" && (
          <form action="/api/stripe/portal" method="POST">
            <button
              type="submit"
              className="flex h-[50px] w-full items-center justify-center rounded-full border border-slate-300 font-semibold text-slate-900 transition hover:bg-surface"
            >
              Abonnement beheren
            </button>
          </form>
        )}
        {entitlement.source === "store" && (
          <p className="text-sm text-slate-500">
            Je hebt Premium via de app gekocht. Opzeggen of wijzigen doe je in
            de App Store of Google Play.
          </p>
        )}
        <Link
          href="/overzicht"
          className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-mint font-bold text-mint-ink transition hover:bg-mint-light"
        >
          Naar mijn overzicht
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return <PlanPicker prices={PREMIUM_PRICES} />;
}

function Row({ ok = false, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-start gap-2.5 ${ok ? "" : "text-slate-400"}`}>
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          ok ? "bg-mint-soft text-brand" : "bg-surface text-slate-400"
        }`}
      >
        {ok ? (
          <Check className="h-3 w-3" strokeWidth={3} />
        ) : (
          <X className="h-3 w-3" strokeWidth={3} />
        )}
      </span>
      {children}
    </li>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-[18px] border border-line bg-white px-5 py-4">
      <summary className="flex items-center justify-between gap-3 font-semibold text-slate-900">
        {q}
        <span className="text-brand transition group-open:rotate-45">+</span>
      </summary>
      <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{children}</p>
    </details>
  );
}
