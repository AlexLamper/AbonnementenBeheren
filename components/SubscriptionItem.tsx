"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { ClientSubscription } from "@/lib/types";
import { formatEUR, toMonthly, periodLabel } from "@/lib/money";
import { ServiceLogo } from "@/components/ServiceLogo";

export function SubscriptionItem({
  item,
  index = 0,
  onEdit,
  onDelete,
}: {
  item: ClientSubscription;
  index?: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const monthly = toMonthly(item.price, item.billingPeriod);

  return (
    <li
      className="flex items-center gap-3 p-3 transition-colors hover:bg-slate-50/70 sm:p-4"
      style={{ "--i": index } as React.CSSProperties}
    >
      <ServiceLogo name={item.name} logoUrl={item.logoUrl} color={item.color} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">
          {item.name}
          {item.planName && (
            <span className="font-normal text-slate-400"> · {item.planName}</span>
          )}
        </p>
        <p className="text-sm text-slate-500">
          {formatEUR(item.price)} {periodLabel(item.billingPeriod).toLowerCase()}
          {item.billingPeriod !== "maandelijks" && (
            <> · {formatEUR(monthly)}/mnd</>
          )}
        </p>
      </div>

      {confirming ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
          >
            Verwijderen
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-md px-2 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            Annuleer
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Bewerken"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Verwijderen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </li>
  );
}
