"use client";

import { useState } from "react";
import type { SubscriptionInput } from "@/lib/validation";
import { BILLING_PERIODS, type BillingPeriod } from "@/lib/money";

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
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Prijs (€)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="9,99"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Periode
          </span>
          <select
            value={billingPeriod}
            onChange={(e) => setBillingPeriod(e.target.value as BillingPeriod)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
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
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
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
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
