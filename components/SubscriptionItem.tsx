"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { ClientSubscription } from "@/lib/types";
import { formatEUR, toMonthly, periodLabel } from "@/lib/money";
import { ServiceLogo } from "@/components/ServiceLogo";

export function SubscriptionItem({
  item,
  index = 0,
  share,
  onEdit,
  onDelete,
}: {
  item: ClientSubscription;
  index?: number;
  /** Aandeel in het maandtotaal (0–1). */
  share: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const monthly = toMonthly(item.price, item.billingPeriod);
  const pct = Math.round(share * 100);
  const isMonthly = item.billingPeriod === "maandelijks";

  return (
    <li
      className="flex items-center gap-3 border-t border-[#eef2f5] px-1 py-3 sm:gap-4 sm:py-3.5"
      style={{ "--i": index } as React.CSSProperties}
    >
      <ServiceLogo
        name={item.name}
        presetId={item.presetId}
        logoUrl={item.logoUrl}
        color={item.color}
        size={44}
        rounded="rounded-[13px]"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-slate-900 sm:text-[16px]">
          {item.name}
          {item.planName && (
            <span className="hidden font-normal text-slate-500 sm:inline">
              {" "}· {item.planName}
            </span>
          )}
        </p>
        <p className="truncate text-[13px] text-slate-500">
          {item.planName && <span className="sm:hidden">{item.planName} · </span>}
          {formatEUR(item.price)} {periodLabel(item.billingPeriod).toLowerCase()}
          {!isMonthly && <span className="hidden sm:inline"> · omgerekend naar maand</span>}
        </p>
      </div>

      <div className="hidden w-[140px] flex-col gap-1.5 md:flex">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#eef2f5]">
          <div className="h-1.5 rounded-full bg-mint" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-slate-500">{pct}% van je totaal</span>
      </div>

      <p className="text-right font-display text-[17px] font-bold text-slate-900 sm:w-[110px] sm:text-lg">
        {formatEUR(monthly)}
        <span className="hidden font-sans text-xs font-medium text-slate-500 sm:block">per maand</span>
      </p>

      {confirming ? (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full bg-red-600 px-3.5 py-2.5 text-[13px] font-bold text-white transition hover:bg-red-700"
          >
            Verwijderen
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="px-2 py-2.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900"
          >
            Annuleer
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-slate-600 transition sm:h-10 sm:w-10 hover:bg-mint-soft hover:text-brand"
            aria-label={`${item.name} bewerken`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-slate-600 transition sm:h-10 sm:w-10 hover:bg-red-50 hover:text-red-600"
            aria-label={`${item.name} verwijderen`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </li>
  );
}
