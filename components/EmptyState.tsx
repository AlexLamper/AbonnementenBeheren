import { Plus } from "lucide-react";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p className="font-medium text-slate-900">Nog geen abonnementen</p>
      <p className="mt-1 text-sm text-slate-500">
        Voeg je eerste abonnement toe en zie meteen je maandelijkse kosten.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
        Abonnement toevoegen
      </button>
    </div>
  );
}
