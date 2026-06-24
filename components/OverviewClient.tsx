"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { signOut } from "next-auth/react";
import { Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import type { ClientSubscription } from "@/lib/types";
import type { Preset } from "@/lib/presets/types";
import type { SubscriptionInput } from "@/lib/validation";
import { totals } from "@/lib/money";
import { ShareButton } from "@/components/ShareButton";
import { TotalsCards } from "@/components/TotalsCards";
import { SubscriptionList } from "@/components/SubscriptionList";
import { EmptyState } from "@/components/EmptyState";
import { AddSubscriptionDialog } from "@/components/AddSubscriptionDialog";
import { EditSubscriptionDialog } from "@/components/EditSubscriptionDialog";

/** Tijdgebonden begroeting op basis van de lokale tijd van de bezoeker. */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "Goedenacht";
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedeavond";
}

// useSyncExternalStore: server rendert null (geen tijdzone bekend), de client
// rendert de echte lokale begroeting. Voorkomt hydration-mismatch zonder
// setState in een effect.
const noopSubscribe = () => () => {};

function useGreeting(): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => getGreeting(),
    () => null
  );
}

export function OverviewClient({
  initial,
  presets,
  firstName,
  autoAddId,
}: {
  initial: ClientSubscription[];
  presets: Preset[];
  firstName?: string;
  autoAddId?: string;
}) {
  // Open de toevoeg-dialog vanzelf bij ?add=<presetId> (vanaf dienstpagina's).
  const autoAddName = autoAddId
    ? presets.find((p) => p.id === autoAddId)?.name
    : undefined;

  const greeting = useGreeting();

  const [items, setItems] = useState<ClientSubscription[]>(initial);
  const [addOpen, setAddOpen] = useState(Boolean(autoAddName));
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
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-bold text-slate-700"
        >
          <Image
            src="/logo/logo-transparent.png"
            alt="AbonnementenBeheren logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span className="hidden xs:inline">AbonnementenBeheren</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/diensten"
            className="hidden rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
          >
            Diensten
          </Link>
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

      <h1 className="mb-4 animate-fade-in-up text-2xl font-bold text-slate-900">
        {greeting
          ? `${greeting}${firstName ? `, ${firstName}` : ""}`
          : firstName
            ? `Hoi ${firstName}`
            : "Jouw abonnementen"}
      </h1>

      <div className="animate-fade-in-up [animation-delay:80ms]">
        <TotalsCards monthly={monthly} yearly={yearly} />
      </div>

      <div className="mb-3 mt-8 flex animate-fade-in-up items-center justify-between [animation-delay:160ms]">
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
        presets={presets}
        initialQuery={autoAddName}
      />
      <EditSubscriptionDialog
        subscription={editing}
        onClose={() => setEditing(null)}
        onSave={updateItem}
      />
    </div>
  );
}
