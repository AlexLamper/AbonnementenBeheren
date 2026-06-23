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
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item) => (
        <SubscriptionItem
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </ul>
  );
}
