import Link from "next/link";

/**
 * Het donut-logo: een ringdiagram in vier mint/teal-tinten dat staat voor
 * "al je abonnementen in één overzicht".
 */
export function LogoMark({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
    >
      <g transform="rotate(-90 24 24)">
        <circle cx="24" cy="24" r="16" stroke="#2DD4BF" strokeWidth="9" strokeDasharray="42 100.5" />
        <circle cx="24" cy="24" r="16" stroke="#2AA898" strokeWidth="9" strokeDasharray="28 100.5" strokeDashoffset="-45" />
        <circle cx="24" cy="24" r="16" stroke="#7FE3D3" strokeWidth="9" strokeDasharray="15 100.5" strokeDashoffset="-76" />
        <circle cx="24" cy="24" r="16" stroke="#1F5A6E" strokeWidth="9" strokeDasharray="4.5 100.5" strokeDashoffset="-94" />
      </g>
    </svg>
  );
}

/**
 * Logo + woordmerk. `tone="dark"` voor navy achtergronden, `tone="light"`
 * voor lichte achtergronden.
 */
export function Logo({
  tone = "dark",
  size = 34,
  hideWordmarkOnMobile = false,
}: {
  tone?: "dark" | "light";
  size?: number;
  hideWordmarkOnMobile?: boolean;
}) {
  const base = tone === "dark" ? "text-white" : "text-navy";
  const accent = tone === "dark" ? "text-mint-light" : "text-brand";
  return (
    <Link
      href="/"
      aria-label="AbonnementenBeheren - naar de homepage"
      className="flex shrink-0 items-center gap-2.5"
    >
      <LogoMark size={size} />
      <span
        className={`font-display text-lg font-bold tracking-tight sm:text-[19px] ${base} ${
          hideWordmarkOnMobile ? "hidden xs:inline" : ""
        }`}
      >
        Abonnementen<span className={accent}>Beheren</span>
      </span>
    </Link>
  );
}
