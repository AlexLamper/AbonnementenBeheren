import { Plus } from "lucide-react";
import type { Preset } from "@/lib/presets/types";
import { popularPresets } from "@/lib/presets";
import { ServiceLogo } from "@/components/ServiceLogo";

export function EmptyState({
  onAdd,
  onQuickAdd,
  presets,
}: {
  onAdd: () => void;
  onQuickAdd: (name: string) => void;
  presets: Preset[];
}) {
  const popular = popularPresets(presets, 5);

  return (
    <div className="flex flex-col items-center px-2 py-8 text-center sm:py-10">
      <svg width="72" height="72" viewBox="0 0 48 48" fill="none" aria-hidden>
        <circle cx="24" cy="24" r="16" stroke="#E2EAEE" strokeWidth="9" />
        <g transform="rotate(-90 24 24)">
          <circle cx="24" cy="24" r="16" stroke="#2DD4BF" strokeWidth="9" strokeDasharray="14 100.5" />
        </g>
      </svg>
      <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-[26px]">
        Nog geen abonnementen
      </h2>
      <p className="mt-2 max-w-md text-slate-500">
        Voeg je eerste abonnement toe en zie meteen wat je per maand kwijt bent.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-bold text-mint-ink transition hover:bg-mint-light"
      >
        <Plus className="h-4 w-4" strokeWidth={2.6} />
        Abonnement toevoegen
      </button>

      {popular.length > 0 && (
        <>
          <p className="mb-3 mt-9 text-xs font-bold uppercase tracking-[0.12em] text-brand">
            Of begin met een populaire dienst
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {popular.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onQuickAdd(p.name)}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-slate-900 transition hover:border-mint hover:bg-mint-wash"
              >
                <ServiceLogo
                  name={p.name}
                  presetId={p.id}
                  logoUrl={p.logoUrl}
                  color={p.color}
                  size={28}
                  rounded="rounded-full"
                />
                {p.name}
                <Plus className="h-3.5 w-3.5 text-brand" strokeWidth={2.8} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
