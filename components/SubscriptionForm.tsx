"use client";

import { useState } from "react";
import type { SubscriptionInput } from "@/lib/validation";
import {
  BILLING_PERIODS,
  formatEUR,
  toMonthly,
  toYearly,
  type BillingPeriod,
} from "@/lib/money";

const INPUT =
  "h-12 w-full rounded-[14px] border border-slate-300 bg-white px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-mint focus:ring-4 focus:ring-mint/20";

export function SubscriptionForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: Partial<SubscriptionInput>;
  submitLabel: string;
  onSubmit: (input: SubscriptionInput) => Promise<boolean>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [planName, setPlanName] = useState(initial?.planName ?? "");
  const [price, setPrice] = useState(
    initial?.price !== undefined ? String(initial.price) : ""
  );
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(
    (initial?.billingPeriod as BillingPeriod) ?? "maandelijks"
  );
  const [category, setCategory] = useState(initial?.category ?? "");
  const [loading, setLoading] = useState(false);

  // Laat direct zien wat het bedrag per jaar (of per maand) betekent.
  const parsed = Number(price.replace(",", "."));
  const yearlyPreview =
    price.trim() && Number.isFinite(parsed) && parsed > 0
      ? billingPeriod === "maandelijks"
        ? toYearly(parsed, billingPeriod)
        : toMonthly(parsed, billingPeriod)
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        name: name.trim(),
        planName: planName.trim(),
        price: Number(price.replace(",", ".")),
        billingPeriod,
        category: category.trim(),
        presetId: initial?.presetId,
        logoUrl: initial?.logoUrl,
        color: initial?.color,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Naam" value={name} onChange={setName} required />
      <Field
        label="Pakket (optioneel)"
        value={planName}
        onChange={setPlanName}
        placeholder="bijv. Family"
      />
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            Prijs (€)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="9,99"
            className={INPUT}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            Periode
          </span>
          <select
            value={billingPeriod}
            onChange={(e) => setBillingPeriod(e.target.value as BillingPeriod)}
            className={INPUT}
          >
            {BILLING_PERIODS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Field
        label="Categorie (optioneel)"
        value={category}
        onChange={setCategory}
        placeholder="bijv. Streaming"
      />
      {yearlyPreview !== null && (
        <div className="flex justify-between rounded-[14px] bg-mint-wash px-4 py-3 text-sm text-[#0b4a44]">
          <span>{billingPeriod === "maandelijks" ? "Per jaar" : "Per maand"}</span>
          <b className="font-display">{formatEUR(yearlyPreview)}</b>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="h-[50px] w-full rounded-full bg-mint font-bold text-mint-ink transition hover:bg-mint-light disabled:opacity-50"
      >
        {loading ? "Bezig…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={INPUT}
      />
    </label>
  );
}
