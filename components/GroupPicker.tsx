"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { GROUP_MAX_LENGTH, groupOptions } from "@/lib/groups";

const CHIP =
  "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition";

/**
 * Kies een groep (bijv. "Werk" of "Privé") of typ een nieuwe. Optioneel:
 * nogmaals tikken op de gekozen groep haalt hem weer weg.
 */
export function GroupPicker({
  value,
  onChange,
  used,
  label = "Groep (optioneel)",
}: {
  value: string;
  onChange: (group: string) => void;
  /** Groepen die de gebruiker al gebruikt. */
  used: string[];
  label?: string;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const options = groupOptions(used, value || undefined);

  function confirm() {
    const g = draft.trim().slice(0, GROUP_MAX_LENGTH);
    if (g) {
      // Bestaat hij al (andere hoofdletters)? Neem dan de bestaande.
      onChange(options.find((o) => o.toLowerCase() === g.toLowerCase()) ?? g);
    }
    setDraft("");
    setAdding(false);
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((g) => {
          const active = g === value;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? "" : g)}
              className={`${CHIP} ${
                active
                  ? "border-mint bg-mint text-mint-ink"
                  : "border-line bg-white text-slate-700 hover:border-mint hover:text-brand"
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" strokeWidth={2.8} />}
              {g}
            </button>
          );
        })}
        {adding ? (
          <span className="inline-flex h-9 items-center gap-1 rounded-full border border-mint bg-white pl-3.5 pr-1 ring-4 ring-mint/20">
            <label htmlFor="nieuwe-groep" className="sr-only">
              Naam van de groep
            </label>
            <input
              id="nieuwe-groep"
              autoFocus
              value={draft}
              maxLength={GROUP_MAX_LENGTH}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                // Enter mag het formulier niet versturen.
                if (e.key === "Enter") {
                  e.preventDefault();
                  confirm();
                }
                if (e.key === "Escape") {
                  e.stopPropagation();
                  setAdding(false);
                }
              }}
              onBlur={confirm}
              placeholder="Naam van de groep"
              className="w-36 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={confirm}
              aria-label="Groep toevoegen"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-mint text-mint-ink transition hover:bg-mint-light"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.8} />
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className={`${CHIP} border-dashed border-[#c3d3da] bg-white text-brand hover:border-mint hover:bg-mint-wash`}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.8} />
            Nieuwe groep
          </button>
        )}
      </div>
    </div>
  );
}
