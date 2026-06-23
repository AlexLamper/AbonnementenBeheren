import { formatEUR } from "@/lib/money";

export function TotalsCards({
  monthly,
  yearly,
}: {
  monthly: number;
  yearly: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card label="Per maand" amount={monthly} highlight />
      <Card label="Per jaar" amount={yearly} />
    </div>
  );
}

function Card({
  label,
  amount,
  highlight = false,
}: {
  label: string;
  amount: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-brand/20 bg-brand/5"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${
          highlight ? "text-brand" : "text-slate-900"
        }`}
      >
        {formatEUR(amount)}
      </p>
    </div>
  );
}
