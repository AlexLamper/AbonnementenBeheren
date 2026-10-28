"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
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
    <Modal
      open={open}
      onClose={close}
      title={custom ? "Eigen abonnement" : "Abonnement toevoegen"}
    >
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
            className="mx-auto flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar zoeken
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex h-[50px] items-center gap-2.5 rounded-full border border-slate-300 px-4 transition focus-within:border-mint focus-within:ring-4 focus-within:ring-mint/20">
            <Search className="h-[18px] w-[18px] shrink-0 text-slate-500" aria-hidden />
            <label htmlFor="zoek-preset" className="sr-only">
              Zoek een dienst
            </label>
            <input
              id="zoek-preset"
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek een dienst, bijv. Spotify"
              className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {!hasQuery && (
            <p className="px-1 text-xs font-bold uppercase tracking-[0.12em] text-brand">
              Populair
            </p>
          )}

          <ul className="max-h-[50vh] space-y-2 overflow-y-auto">
            {results.map((preset) => (
              <PresetResult
                key={preset.id}
                preset={preset}
                onPick={pickPreset}
                defaultOpen={hasQuery && results.length === 1}
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
            className="h-12 w-full rounded-full border-[1.5px] border-dashed border-[#c3d3da] text-sm font-semibold text-slate-700 transition hover:border-mint hover:bg-mint-wash"
          >
            Staat er niet bij? Eigen abonnement toevoegen
          </button>
        </div>
      )}
    </Modal>
  );
}
