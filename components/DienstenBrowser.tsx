"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";
import { ServiceLogo } from "@/components/ServiceLogo";
import { formatEUR } from "@/lib/money";

export interface DienstItem {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
  color?: string;
  fromMonthly: number;
}

/** Leest `?q=` (vanaf de zoekbalk op de homepage) en geeft het door. */
export function DienstenBrowserWithParams({ items }: { items: DienstItem[] }) {
  const params = useSearchParams();
  return <DienstenBrowser items={items} initialQuery={params.get("q") ?? ""} />;
}

/**
 * Zoek- en filterbare lijst van alle diensten, gegroepeerd per categorie.
 * De zoekbalk en categorieknoppen staan in de navy band; de lijst eronder.
 */
export function DienstenBrowser({
  items,
  initialQuery = "",
}: {
  items: DienstItem[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const it of items) counts.set(it.category, (counts.get(it.category) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "nl"));
  }, [items]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter(
      (it) =>
        (!category || it.category === category) &&
        (!q ||
          it.name.toLowerCase().includes(q) ||
          it.category.toLowerCase().includes(q))
    );
    const map = new Map<string, DienstItem[]>();
    for (const it of filtered) {
      const list = map.get(it.category) ?? [];
      list.push(it);
      map.set(it.category, list);
    }
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], "nl"))
      .map(([cat, list]) => ({
        cat,
        list: list.sort((a, b) => a.name.localeCompare(b.name, "nl")),
      }));
  }, [items, query, category]);

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-mint text-mint-ink"
        : "border border-white/[0.18] bg-white/[0.06] text-[#e2ecf3] hover:bg-white/[0.12]"
    }`;

  return (
    <>
      <div className="bg-navy">
        <div className="mx-auto max-w-6xl px-5 pb-11 sm:px-6">
          <div className="flex w-full max-w-xl items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2">
            <label htmlFor="zoek-dienst" className="sr-only">
              Zoek een dienst
            </label>
            <Search className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
            <input
              id="zoek-dienst"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Zoek tussen ${items.length} diensten`}
              className="min-h-10 min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory(null)}
              aria-pressed={category === null}
              className={pill(category === null)}
            >
              Alle
            </button>
            {categories.map(([cat, count]) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat === category ? null : cat)}
                aria-pressed={category === cat}
                className={pill(category === cat)}
              >
                {cat}{" "}
                <span className={category === cat ? "text-mint-ink/70" : "text-mint-light"}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 pt-2 sm:px-6">
        {groups.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-slate-500">
            Geen dienst gevonden voor “{query}”.
          </p>
        )}
        {groups.map(({ cat, list }) => (
          <section key={cat} className="mt-9">
            <h2 className="flex items-baseline gap-2.5 font-display text-[22px] font-bold text-slate-900">
              {cat}
              <span className="font-sans text-sm font-medium text-slate-500">
                {list.length} {list.length === 1 ? "dienst" : "diensten"}
              </span>
            </h2>
            <div className="mt-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.id}`}
                  className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white px-4 py-3.5 transition hover:border-mint hover:shadow-sm"
                >
                  <ServiceLogo
                    name={p.name}
                    presetId={p.id}
                    logoUrl={p.logoUrl}
                    color={p.color}
                    size={42}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold text-slate-900">{p.name}</span>
                    <span className="block text-sm text-slate-500">
                      vanaf{" "}
                      <span className="font-semibold text-slate-900">
                        {formatEUR(p.fromMonthly)}
                      </span>
                      /mnd
                    </span>
                  </span>
                  <ChevronRight className="h-[18px] w-[18px] text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
