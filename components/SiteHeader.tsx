"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";

/**
 * Gedeelde, sessiebewuste navigatiebalk voor de openbare pagina's
 * (home, diensten, dienstpagina's). Toont voor ingelogde gebruikers een
 * snelle link naar het overzicht, en anders inloggen/registreren.
 */
export function SiteHeader() {
  const { status } = useSession();
  const loggedIn = status === "authenticated";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-700"
        >
          <Image
            src="/logo/logo-transparent.png"
            alt="AbonnementenBeheren logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          AbonnementenBeheren
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/diensten"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Diensten
          </Link>

          {loggedIn ? (
            <Link
              href="/overzicht"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              <LayoutDashboard className="h-4 w-4" />
              Mijn overzicht
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Inloggen
              </Link>
              <Link
                href="/login?modus=registreren"
                className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              >
                Gratis beginnen
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
