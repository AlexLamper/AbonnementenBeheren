import type { ClientSubscription } from "@/lib/types";

/** Voorgestelde groepen; de gebruiker kan ook zelf een groep typen. */
export const DEFAULT_GROUPS = ["Privé", "Werk", "Gezin"];

export const GROUP_MAX_LENGTH = 40;

/** Alle groepen die de gebruiker al gebruikt, op alfabet. */
export function usedGroups(items: ClientSubscription[]): string[] {
  const seen = new Map<string, string>();
  for (const it of items) {
    const g = it.group?.trim();
    if (g && !seen.has(g.toLowerCase())) seen.set(g.toLowerCase(), g);
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, "nl"));
}

/** Keuzes in het formulier: de standaardgroepen plus eigen groepen, zonder dubbele. */
export function groupOptions(used: string[], current?: string): string[] {
  const out: string[] = [];
  for (const g of [...DEFAULT_GROUPS, ...used, ...(current ? [current] : [])]) {
    if (!out.some((o) => o.toLowerCase() === g.toLowerCase())) out.push(g);
  }
  return out;
}
