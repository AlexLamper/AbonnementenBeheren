"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, Plus } from "lucide-react";
import type { Preset, PresetPlan } from "@/lib/presets/types";
import { ServiceLogo } from "@/components/ServiceLogo";
import { formatEUR, periodLabel } from "@/lib/money";

export function PresetResult({
  preset,
  onPick,
  defaultOpen = false,
}: {
  preset: Preset;
  onPick: (preset: Preset, plan: PresetPlan) => void;
  defaultOpen?: boolean;
}) {
  // Eén plan: direct toevoegen. Meerdere: uitklappen.
  const single = preset.plans.length === 1;
  const [open, setOpen] = useState(defaultOpen);
  const expanded = open && !single;

  return (
    <li
      className={`overflow-hidden rounded-[20px] border transition ${
        expanded ? "border-[#9fe6d9]" : "border-line"
      }`}
    >
      <button
        type="button"
        aria-expanded={single ? undefined : expanded}
        onClick={() =>
          single ? onPick(preset, preset.plans[0]) : setOpen((o) => !o)
        }
        className={`flex w-full items-center gap-3.5 px-4 py-3 text-left transition ${
          expanded ? "bg-mint-wash" : "hover:bg-surface"
        }`}
      >
        <ServiceLogo
          name={preset.name}
          presetId={preset.id}
          logoUrl={preset.logoUrl}
          color={preset.color}
          size={42}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-slate-900">{preset.name}</p>
          <p className="text-[13px] text-slate-500">
            {preset.category}
            {!single && ` · ${preset.plans.length} pakketten`}
          </p>
        </div>
        {single ? (
          <span className="inline-flex items-center gap-2 font-display font-bold text-slate-900">
            {formatEUR(preset.plans[0].price)}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-soft text-brand">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.8} />
            </span>
          </span>
        ) : (
          <ChevronDown
            className={`h-5 w-5 text-brand transition ${expanded ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {expanded && (
        <ul className="flex flex-col p-1.5">
          {preset.plans.map((plan) => (
            <li key={plan.name}>
              <button
                type="button"
                onClick={() => onPick(preset, plan)}
                className="group flex w-full items-center justify-between rounded-[14px] py-3 pl-[70px] pr-3.5 text-left transition hover:bg-surface"
              >
                <span className="text-[15px] font-semibold text-slate-800">{plan.name}</span>
                <span className="flex items-center gap-2.5">
                  <span className="font-display text-[15px] font-bold text-slate-900">
                    {formatEUR(plan.price)}
                  </span>
                  <span className="text-[13px] text-slate-500">
                    {periodLabel(plan.billingPeriod).toLowerCase()}
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-soft text-mint-ink transition group-hover:bg-mint">
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.8} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Affiliate-link: getoond bij één plan, of bij meerdere plannen
          zodra het item is uitgeklapt. rel="sponsored" markeert de link. */}
      {preset.affiliateUrl && (single || expanded) && (
        <div className="border-t border-[#ddf0ec] px-4 py-2.5">
          <a
            href={preset.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline"
          >
            Bekijk aanbieding
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </li>
  );
}
