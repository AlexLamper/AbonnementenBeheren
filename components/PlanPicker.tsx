"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

export type PlanKey = "monthly" | "yearly";

export interface PlanPrices {
  monthly: string;
  yearly: string;
}

export const PREMIUM_PERKS = [
  "Onbeperkt abonnementen bijhouden",
  "Exporteer je overzicht naar Excel (CSV)",
  "Werkt op de website én in de app",
  "Steun een onafhankelijke Nederlandse maker",
];

/**
 * Keuze maand/jaar + afrekenknop. Een gewoon formulier naar
 * /api/stripe/checkout, zodat het ook zonder JavaScript-fetch werkt.
 */
export function PlanPicker({
  prices,
  defaultPlan = "yearly",
  compact = false,
}: {
  prices: PlanPrices;
  defaultPlan?: PlanKey;
  compact?: boolean;
}) {
  const [plan, setPlan] = useState<PlanKey>(defaultPlan);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action="/api/stripe/checkout"
      method="POST"
      onSubmit={() => setSubmitting(true)}
      className="space-y-3"
    >
      <input type="hidden" name="plan" value={plan} />
      <div role="radiogroup" aria-label="Kies een abonnement" className="grid gap-2.5">
        <PlanOption
          selected={plan === "yearly"}
          onSelect={() => setPlan("yearly")}
          title="Per jaar"
          price={prices.yearly}
          suffix="per jaar"
          badge="Voordeligst"
        />
        <PlanOption
          selected={plan === "monthly"}
          onSelect={() => setPlan("monthly")}
          title="Per maand"
          price={prices.monthly}
          suffix="per maand"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-mint font-bold text-mint-ink transition hover:bg-mint-light disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" strokeWidth={2.4} />
        {submitting ? "Even geduld…" : "Neem Premium"}
      </button>
      {!compact && (
        <p className="text-center text-[13px] text-slate-500">
          Veilig betalen via Stripe met iDEAL, creditcard en meer. Op elk
          moment opzegbaar.
        </p>
      )}
    </form>
  );
}

function PlanOption({
  selected,
  onSelect,
  title,
  price,
  suffix,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price: string;
  suffix: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-center gap-3.5 rounded-[18px] border-[1.5px] px-4 py-3.5 text-left transition ${
        selected
          ? "border-mint bg-mint-wash"
          : "border-line bg-white hover:border-[#9fe6d9]"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          selected ? "border-mint bg-mint text-mint-ink" : "border-slate-300"
        }`}
      >
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-bold text-slate-900">
          {title}
          {badge && (
            <span className="rounded-full bg-navy px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-mint-light">
              {badge}
            </span>
          )}
        </span>
      </span>
      <span className="text-right">
        <span className="block font-display text-lg font-bold text-slate-900">{price}</span>
        <span className="block text-xs text-slate-500">{suffix}</span>
      </span>
    </button>
  );
}

export function PerkList({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-2.5">
      {PREMIUM_PERKS.map((perk) => (
        <li
          key={perk}
          className={`flex items-start gap-2.5 text-[15px] ${
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
