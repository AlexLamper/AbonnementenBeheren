"use client";

import { useState } from "react";
import { Check, BadgeCheck } from "lucide-react";

export interface PlanPrices {
  monthly: string;
}

export const PREMIUM_PERKS = [
  "Onbeperkt abonnementen bijhouden",
  "Exporteer je overzicht naar Excel (CSV)",
  "Werkt op de website én in de app",
  "Steun een onafhankelijke Nederlandse maker",
];

/** "Maar €1,99 per maand": één vast plan, met de nadruk op de lage prijs. */
export function PriceHero({ price }: { price: string }) {
  return (
    <div className="rounded-[20px] border-[1.5px] border-mint bg-mint-wash px-4 py-4 text-center">
      <p className="text-[0.9375rem] font-bold text-brand">Maar</p>
      <p className="flex items-end justify-center gap-1.5">
        <span className="font-display text-[2.75rem] font-bold leading-none tracking-tight text-slate-900">
          {price}
        </span>
        <span className="pb-1 text-[0.9375rem] font-semibold text-slate-600">per maand</span>
      </p>
      <p className="mt-2 text-[0.8125rem] leading-snug text-slate-600">
        Minder dan een kop koffie. Onbeperkt abonnementen, altijd opzegbaar.
      </p>
    </div>
  );
}

/**
 * Prijs + afrekenknop. Een gewoon formulier naar /api/stripe/checkout, zodat
 * het ook zonder JavaScript-fetch werkt.
 */
export function PlanPicker({
  prices,
  compact = false,
}: {
  prices: PlanPrices;
  compact?: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action="/api/stripe/checkout"
      method="POST"
      onSubmit={() => setSubmitting(true)}
      className="space-y-3"
    >
      <input type="hidden" name="plan" value="monthly" />
      <PriceHero price={prices.monthly} />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-mint font-bold text-mint-ink transition hover:bg-mint-light disabled:opacity-50"
      >
        <BadgeCheck className="h-4 w-4" strokeWidth={2.4} />
        {submitting ? "Even geduld…" : "Neem Premium"}
      </button>
      {!compact && (
        <p className="text-center text-[0.8125rem] text-slate-500">
          Veilig betalen via Stripe met iDEAL, creditcard en meer. Op elk
          moment opzegbaar.
        </p>
      )}
    </form>
  );
}

export function PerkList({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-2.5">
      {PREMIUM_PERKS.map((perk) => (
        <li
          key={perk}
          className={`flex items-start gap-2.5 text-[0.9375rem] ${
            tone === "dark" ? "text-mist" : "text-slate-700"
          }`}
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-soft text-brand">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {perk}
        </li>
      ))}
    </ul>
  );
}
