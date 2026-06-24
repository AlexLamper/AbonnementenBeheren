import Link from "next/link";
import Image from "next/image";

/** Gedeelde footer met consistente navigatie over alle openbare pagina's. */
export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-slate-700"
        >
          <Image
            src="/logo/logo-transparent.png"
            alt="AbonnementenBeheren logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          AbonnementenBeheren
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <Link href="/diensten" className="hover:text-brand">
            Diensten
          </Link>
          <Link href="/overzicht" className="hover:text-brand">
            Mijn overzicht
          </Link>
        </nav>

        <span>
          Gemaakt door{" "}
          <span className="font-medium text-slate-700">Alex Lamper</span>
        </span>
      </div>
    </footer>
  );
}
