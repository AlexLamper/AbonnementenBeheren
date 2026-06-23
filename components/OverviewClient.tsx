"use client";

import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";
import { Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import type { ClientSubscription } from "@/lib/types";
import type { SubscriptionInput } from "@/lib/validation";
import { totals } from "@/lib/money";
import { ShareButton } from "@/components/ShareButton";
import { TotalsCards } from "@/components/TotalsCards";
import { SubscriptionList } from "@/components/SubscriptionList";
import { EmptyState } from "@/components/EmptyState";
import { AddSubscriptionDialog } from "@/components/AddSubscriptionDialog";
import { EditSubscriptionDialog } from "@/components/EditSubscriptionDialog";

export function OverviewClient({
  initial,
  firstName,
}: {
  initial: ClientSubscription[];
  firstName?: string;
}) {
  const [items, setItems] = useState<ClientSubscription[]>(initial);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<ClientSubscription | null>(null);

  const { monthly, yearly } = useMemo(() => totals(items), [items]);

  async function addItem(input: SubscriptionInput) {
    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error ?? "Toevoegen mislukt");
      return false;
    }
    const created: ClientSubscription = await res.json();
    setItems((prev) => [created, ...prev]);
    toast.success(`${created.name} toegevoegd`);
    return true;
  }

  async function updateItem(id: string, input: SubscriptionInput) {
    const res = await fetch(`/api/subscriptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error ?? "Opslaan mislukt");
      return false;
    }
    const updated: ClientSubscription = await res.json();
    setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
    toast.success("Opgeslagen");
    return true;
  }

  async function deleteItem(id: string) {
    const previous = items;
    setItems((prev) => prev.filter((it) => it.id !== id)); // optimistic
    const res = await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setItems(previous); // terugdraaien
      toast.error("Verwijderen mislukt");
      return;
    }
    toast.success("Verwijderd");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:pt-10">
      <header className="mb-6 flex items-center justify-between">
        <span className="font-bold text-brand">AbonnementenBeheren</span>
        <div className="flex items-center gap-2">
          <ShareButton />
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Uitloggen
          </button>
        </div>
      </header>

      <h1 className="mb-4 text-2xl font-bold text-slate-900">
        {firstName ? `Hoi ${firstName}` : "Jouw abonnementen"}
      </h1>

      <TotalsCards monthly={monthly} yearly={yearly} />

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Abonnementen ({items.length})
        </h2>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Toevoegen
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState onAdd={() => setAddOpen(true)} />
      ) : (
        <SubscriptionList
          items={items}
          onEdit={setEditing}
          onDelete={deleteItem}
        />
      )}

      <AddSubscriptionDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addItem}
      />
      <EditSubscriptionDialog
        subscription={editing}
        onClose={() => setEditing(null)}
        onSave={updateItem}
      />
    </div>
  );
}
