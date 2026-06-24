"use client";

import type { ClientSubscription } from "@/lib/types";
import { SubscriptionItem } from "@/components/SubscriptionItem";

export function SubscriptionList({
  items,
  onEdit,
  onDelete,
}: {
  items: ClientSubscription[];
  onEdit: (sub: ClientSubscription) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <ul className="stagger divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item, i) => (
        <SubscriptionItem
          key={item.id}
          item={item}
          index={i}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </ul>
  );
}
