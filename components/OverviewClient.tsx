"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { signOut } from "next-auth/react";
import { Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import type { ClientSubscription } from "@/lib/types";
import type { Preset } from "@/lib/presets/types";
import type { SubscriptionInput } from "@/lib/validation";
import { toMonthly, totals } from "@/lib/money";
import { Logo } from "@/components/Logo";
import { ShareButton } from "@/components/ShareButton";
import { TotalsCards } from "@/components/TotalsCards";
import { SubscriptionList, type SortKey } from "@/components/SubscriptionList";
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

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duurste", label: "Duurste eerst" },
  { value: "goedkoopste", label: "Goedkoopste eerst" },
  { value: "naam", label: "Op naam" },
  { value: "nieuwste", label: "Nieuwste eerst" },
];

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
  // `key` laat de dialog opnieuw mounten zodat een nieuwe zoekterm doorkomt.
  const [add, setAdd] = useState<{ open: boolean; query?: string; key: number }>({
    open: Boolean(autoAddName),
    query: autoAddName,
    key: 0,
  });
  const [editing, setEditing] = useState<ClientSubscription | null>(null);
  const [sort, setSort] = useState<SortKey>("duurste");

  const { monthly, yearly } = useMemo(() => totals(items), [items]);

  const breakdown = useMemo(
    () =>
      items
        .map((it) => ({
          id: it.id,
          name: it.name,
          monthly: toMonthly(it.price, it.billingPeriod),
        }))
        .sort((a, b) => b.monthly - a.monthly),
    [items]
  );

  function openAdd(query?: string) {
    setAdd((s) => ({ open: true, query, key: s.key + 1 }));
  }

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

  const isEmpty = items.length === 0;
  const title = greeting
    ? `${greeting}${firstName ? `, ${firstName}` : ""}`
    : firstName
      ? `Hoi ${firstName}`
      : "Jouw abonnementen";

  return (
    <div className="min-h-screen pb-28 sm:pb-16">
      <div className="bg-navy pb-24 sm:pb-28">
        {/* App-header */}
        <header className="border-b border-white/[0.08]">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6">
            <div className="flex items-center gap-8">
              <Logo hideWordmarkOnMobile />
              <nav className="hidden gap-1 text-sm md:flex">
                <Link
                  href="/overzicht"
                  aria-current="page"
                  className="rounded-full bg-white/10 px-3.5 py-2 font-semibold text-white"
                >
                  Overzicht
                </Link>
                <Link
                  href="/diensten"
                  className="rounded-full px-3.5 py-2 text-haze transition hover:text-white"
                >
                  Diensten
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ShareButton tone="dark" />
              </div>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.08] py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <span
                  aria-hidden
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-mint font-extrabold text-mint-ink"
                >
                  {(firstName ?? "?").charAt(0).toUpperCase()}
                </span>
                Uitloggen
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-11">
          <h1 className="animate-fade-in-up font-display text-[28px] font-bold tracking-tight text-white sm:text-[40px]">
            {isEmpty ? `Welkom${firstName ? `, ${firstName}` : ""}` : title}
          </h1>
          <p className="mt-1.5 animate-fade-in-up text-haze [animation-delay:60ms]">
            {isEmpty
              ? "Voeg je eerste abonnement toe om je totaal te zien."
              : "Zo staan je abonnementen er nu voor."}
          </p>
          <div className="mt-6 animate-fade-in-up [animation-delay:120ms] sm:mt-7">
            <TotalsCards
              monthly={monthly}
              yearly={yearly}
              count={items.length}
              breakdown={breakdown}
            />
          </div>
        </section>
      </div>

      <section className="relative mx-auto -mt-[72px] max-w-6xl px-3 sm:px-6">
        <div className="animate-fade-in-up rounded-[24px] border border-line bg-white p-4 shadow-float [animation-delay:180ms] sm:rounded-[28px] sm:p-7">
          {isEmpty ? (
            <EmptyState
              onAdd={() => openAdd()}
              onQuickAdd={(name) => openAdd(name)}
              presets={presets}
            />
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  Abonnementen{" "}
                  <span className="font-medium text-slate-500">({items.length})</span>
                </h2>
                <div className="flex items-center gap-2">
                  <label htmlFor="sorteer" className="sr-only">
                    Sorteren
                  </label>
                  <select
                    id="sorteer"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="h-10 rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-slate-700 outline-none focus:border-mint focus:ring-4 focus:ring-mint/20"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => openAdd()}
                    className="hidden h-10 items-center gap-1.5 rounded-full bg-mint px-4 text-sm font-bold text-mint-ink transition hover:bg-mint-light sm:inline-flex"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.6} />
                    Toevoegen
                  </button>
                </div>
              </div>
              <SubscriptionList
                items={items}
                sort={sort}
                totalMonthly={monthly}
                onEdit={setEditing}
                onDelete={deleteItem}
              />
            </>
          )}
        </div>
      </section>

      {/* Zwevende toevoegknop op mobiel */}
      {!isEmpty && (
        <button
          type="button"
          onClick={() => openAdd()}
          className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-mint px-5 py-4 font-bold text-mint-ink shadow-[0_14px_30px_-12px_rgba(8,35,59,0.6)] transition hover:bg-mint-light sm:hidden"
        >
          <Plus className="h-5 w-5" strokeWidth={2.8} />
          Toevoegen
        </button>
      )}

      <AddSubscriptionDialog
        key={add.key}
        open={add.open}
        onClose={() => setAdd((s) => ({ ...s, open: false }))}
        onAdd={addItem}
        presets={presets}
        initialQuery={add.query}
      />
      <EditSubscriptionDialog
        subscription={editing}
        onClose={() => setEditing(null)}
        onSave={updateItem}
      />
    </div>
  );
}
