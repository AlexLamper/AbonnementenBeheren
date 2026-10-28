"use client";

import { useMemo } from "react";
import type { ClientSubscription } from "@/lib/types";
import { toMonthly } from "@/lib/money";
import { SubscriptionItem } from "@/components/SubscriptionItem";

export type SortKey = "duurste" | "goedkoopste" | "naam" | "nieuwste";

export function SubscriptionList({
  items,
  sort,
  totalMonthly,
  onEdit,
  onDelete,
}: {
  items: ClientSubscription[];
  sort: SortKey;
  totalMonthly: number;
  onEdit: (sub: ClientSubscription) => void;
  onDelete: (id: string) => void;
}) {
  const sorted = useMemo(() => {
    // `items` staat al op nieuwste eerst (server sorteert op createdAt).
    const list = [...items];
    const m = (s: ClientSubscription) => toMonthly(s.price, s.billingPeriod);
    if (sort === "duurste") list.sort((a, b) => m(b) - m(a));
    if (sort === "goedkoopste") list.sort((a, b) => m(a) - m(b));
    if (sort === "naam") list.sort((a, b) => a.name.localeCompare(b.name, "nl"));
    return list;
  }, [items, sort]);

  return (
    <ul className="stagger mt-3 flex flex-col">
      {sorted.map((item, i) => (
        <SubscriptionItem
          key={item.id}
          item={item}
          index={i}
          share={
            totalMonthly > 0
              ? toMonthly(item.price, item.billingPeriod) / totalMonthly
              : 0
          }
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </ul>
  );
}
