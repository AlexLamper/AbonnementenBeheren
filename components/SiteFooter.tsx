import Link from "next/link";
import { Logo } from "@/components/Logo";

const PRODUCT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/overzicht", label: "Mijn overzicht" },
];

const POPULAR_LINKS = [
  { href: "/netflix", label: "Netflix" },
  { href: "/spotify", label: "Spotify" },
  { href: "/disneyplus", label: "Disney+" },
];

/** Gedeelde footer met consistente navigatie over alle openbare pagina's. */
export function SiteFooter() {
  return (
    <footer className="mt-20 bg-navy sm:mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo size={30} />
            <p className="mt-4 text-sm leading-relaxed text-haze">
              Gratis overzicht van al je abonnementen, per maand en per jaar.
            </p>
          </div>
          <div className="flex gap-16">
            <FooterColumn title="Product" links={PRODUCT_LINKS} />
            <FooterColumn title="Populair" links={POPULAR_LINKS} />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-haze sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} AbonnementenBeheren</span>
          <span>
            Gemaakt door{" "}
            <span className="font-semibold text-white">Alex Lamper</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2.5 text-sm">
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-mint-light">
        {title}
      </p>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-mist transition hover:text-white"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
