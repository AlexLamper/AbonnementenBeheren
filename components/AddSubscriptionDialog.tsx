"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Preset, PresetPlan } from "@/lib/presets/types";
import type { SubscriptionInput } from "@/lib/validation";
import { searchPresets, popularPresets } from "@/lib/presets";
import { Modal } from "@/components/Modal";
import { PresetResult } from "@/components/PresetResult";
import { SubscriptionForm } from "@/components/SubscriptionForm";

export function AddSubscriptionDialog({
  open,
  onClose,
  onAdd,
  presets,
  initialQuery,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (input: SubscriptionInput) => Promise<boolean>;
  presets: Preset[];
  initialQuery?: string;
}) {
  // Vul de zoekbalk voor met de dienst wanneer de dialog daarmee geopend
  // wordt (bijv. vanaf een openbare dienstpagina via ?add=<id>).
  const [query, setQuery] = useState(initialQuery ?? "");
  const [custom, setCustom] = useState(false);

  const hasQuery = query.trim().length > 0;
  const results = useMemo(
    () => (hasQuery ? searchPresets(query, presets) : popularPresets(presets)),
    [hasQuery, query, presets]
  );

  function reset() {
    setQuery("");
    setCustom(false);
  }

  function close() {
    reset();
    onClose();
  }

  async function pickPreset(preset: Preset, plan: PresetPlan) {
    const ok = await onAdd({
      name: preset.name,
      planName: plan.name,
      price: plan.price,
      billingPeriod: plan.billingPeriod,
      category: preset.category,
      presetId: preset.id,
      logoUrl: preset.logoUrl,
      color: preset.color,
    });
    if (ok) close();
  }

  return (
    <Modal open={open} onClose={close} title="Abonnement toevoegen">
      {custom ? (
        <div className="space-y-4">
          <SubscriptionForm
            submitLabel="Toevoegen"
            onSubmit={async (input) => {
              const ok = await onAdd(input);
              if (ok) close();
              return ok;
            }}
          />
          <button
            type="button"
            onClick={() => setCustom(false)}
            className="w-full text-center text-sm font-medium text-slate-500 hover:text-brand"
          >
            ← Terug naar zoeken
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek een dienst, bijv. Spotify"
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {!hasQuery && (
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Populair
            </p>
          )}

          <ul className="max-h-[50vh] space-y-2 overflow-y-auto">
            {results.map((preset) => (
              <PresetResult
                key={preset.id}
                preset={preset}
                onPick={pickPreset}
              />
            ))}
            {hasQuery && results.length === 0 && (
              <li className="py-4 text-center text-sm text-slate-500">
                Geen dienst gevonden voor “{query}”.
              </li>
            )}
          </ul>

          <button
            type="button"
            onClick={() => setCustom(true)}
            className="w-full rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Staat er niet bij? Eigen abonnement toevoegen
          </button>
        </div>
      )}
    </Modal>
  );
}
