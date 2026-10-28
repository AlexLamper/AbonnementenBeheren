import { formatEUR } from "@/lib/money";

const SEGMENT_COLORS = ["#2DD4BF", "#2AA898", "#7FE3D3", "#3F7C8C", "#A7F3E6", "#2A4B63"];
const CIRCUMFERENCE = 2 * Math.PI * 16;

interface Slice {
  id: string;
  name: string;
  monthly: number;
}

/**
 * Totalen op de navy band: maandbedrag (mint), jaarbedrag, aantal en een
 * donut met de verdeling per abonnement.
 */
export function TotalsCards({
  monthly,
  yearly,
  count,
  breakdown,
}: {
  monthly: number;
  yearly: number;
  count: number;
  breakdown: Slice[];
}) {
  if (count === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <EmptyStat label="Per maand" value={formatEUR(0)} className="col-span-2 sm:col-span-1" />
        <EmptyStat label="Per jaar" value={formatEUR(0)} />
        <EmptyStat label="Abonnementen" value="0" />
      </div>
    );
  }

  // Maximaal 5 eigen segmenten; de rest valt samen onder "Overig".
  const top = breakdown.slice(0, 5);
  const restTotal = breakdown.slice(5).reduce((s, b) => s + b.monthly, 0);
  const slices = restTotal > 0 ? [...top, { id: "overig", name: "Overig", monthly: restTotal }] : top;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1.7fr]">
      <div className="col-span-2 rounded-[22px] bg-mint px-5 py-4 sm:px-6 sm:py-5 lg:col-span-1">
        <p className="text-sm font-semibold text-[#0b4a44]">Per maand</p>
        <p className="mt-1 font-display text-[38px] font-bold leading-tight tracking-tight text-mint-ink sm:text-[44px]">
          {formatEUR(monthly)}
        </p>
      </div>
      <Stat label="Per jaar" value={formatEUR(yearly)} />
      <Stat label="Abonnementen" value={String(count)} />
      <div className="col-span-2 hidden items-center gap-5 rounded-[22px] border border-white/[0.12] bg-white/[0.06] px-5 py-4 sm:flex lg:col-span-1">
        <Donut slices={slices} total={monthly} />
        <ul className="flex min-w-0 flex-col gap-1.5 text-[13px] text-mist">
          {slices.slice(0, 3).map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: SEGMENT_COLORS[i] }}
              />
              <span className="truncate">
                {s.name} · {Math.round((s.monthly / monthly) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Donut({ slices, total }: { slices: Slice[]; total: number }) {
  const gap = slices.length > 1 ? 0.8 : 0;
  const lengths = slices.map((s) =>
    total > 0 ? (s.monthly / total) * CIRCUMFERENCE : 0
  );
  // Startpositie van elk segment = som van de voorgaande lengtes.
  const starts = lengths.map((_, i) =>
    lengths.slice(0, i).reduce((sum, l) => sum + l, 0)
  );
  return (
    <svg width="76" height="76" viewBox="0 0 48 48" fill="none" role="img" aria-label="Verdeling per abonnement" className="shrink-0">
      <g transform="rotate(-90 24 24)">
        {slices.map((s, i) => (
          <circle
            key={s.id}
            cx="24"
            cy="24"
            r="16"
            stroke={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
            strokeWidth="8"
            strokeDasharray={`${Math.max(lengths[i] - gap, 0.01)} ${CIRCUMFERENCE}`}
            strokeDashoffset={-starts[i]}
          />
        ))}
      </g>
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/[0.12] bg-white/[0.06] px-4 py-4 sm:px-6 sm:py-5">
      <p className="text-[13px] text-haze sm:text-sm">{label}</p>
      <p className="mt-1 font-display text-[22px] font-bold tracking-tight text-white sm:text-[32px]">
        {value}
      </p>
    </div>
  );
}

function EmptyStat({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[22px] border-[1.5px] border-dashed border-white/20 px-5 py-4 sm:px-6 sm:py-5 ${className}`}>
      <p className="text-sm text-haze">{label}</p>
      <p className="mt-1 font-display text-[26px] font-bold text-navy-soft sm:text-[32px]">
        {value}
      </p>
    </div>
  );
}
