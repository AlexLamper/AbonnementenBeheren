"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { Preset, PresetPlan } from "@/lib/presets/types";
import { ServiceLogo } from "@/components/ServiceLogo";
import { formatEUR, periodLabel } from "@/lib/money";

export function PresetResult({
  preset,
  onPick,
}: {
  preset: Preset;
  onPick: (preset: Preset, plan: PresetPlan) => void;
}) {
  // Eén plan: direct toevoegen. Meerdere: uitklappen.
  const single = preset.plans.length === 1;
  const [open, setOpen] = useState(false);

  return (
    <li className="overflow-hidden rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() =>
          single ? onPick(preset, preset.plans[0]) : setOpen((o) => !o)
        }
        className="flex w-full items-center gap-3 p-3 text-left transition hover:bg-slate-50"
      >
        <ServiceLogo
          name={preset.name}
          logoUrl={preset.logoUrl}
          color={preset.color}
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-900">{preset.name}</p>
          <p className="text-sm text-slate-500">{preset.category}</p>
        </div>
        {single ? (
          <span className="text-sm font-medium text-brand">
            {formatEUR(preset.plans[0].price)}
          </span>
        ) : (
          <ChevronDown
            className={`h-5 w-5 text-slate-400 transition ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {open && !single && (
        <ul className="border-t border-slate-100">
          {preset.plans.map((plan) => (
            <li key={plan.name}>
              <button
                type="button"
                onClick={() => onPick(preset, plan)}
                className="flex w-full items-center justify-between px-3 py-2.5 pl-16 text-left transition hover:bg-brand/5"
              >
                <span className="text-sm text-slate-700">{plan.name}</span>
                <span className="text-sm font-medium text-slate-900">
                  {formatEUR(plan.price)}{" "}
                  <span className="font-normal text-slate-400">
                    {periodLabel(plan.billingPeriod).toLowerCase()}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Affiliate-link: getoond bij één plan, of bij meerdere plannen
          zodra het item is uitgeklapt. rel="sponsored" markeert de link. */}
      {preset.affiliateUrl && (single || open) && (
        <div className="border-t border-slate-100 px-3 py-2">
          <a
            href={preset.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
          >
            Bekijk aanbieding
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </li>
  );
}
