"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/Logo";

/**
 * Gedeelde, sessiebewuste navigatiebalk voor de openbare pagina's. Staat
 * altijd op een navy vlak; de pagina plaatst 'm bovenaan haar navy band.
 */
export function SiteHeader({ active }: { active?: "diensten" }) {
  const { status } = useSession();
  const loggedIn = status === "authenticated";

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6">
        <Logo hideWordmarkOnMobile />

        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/diensten"
            aria-current={active === "diensten" ? "page" : undefined}
            className={`hidden rounded-full px-3.5 py-2 transition hover:text-white sm:block ${
              active === "diensten" ? "font-semibold text-white" : "text-haze"
            }`}
          >
            Diensten
          </Link>
          <Link
            href="/#hoe-het-werkt"
            className="hidden rounded-full px-3.5 py-2 text-haze transition hover:text-white md:block"
          >
            Hoe het werkt
          </Link>

          {loggedIn ? (
            <Link
              href="/overzicht"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-2.5 font-bold text-mint-ink transition hover:bg-mint-light"
            >
              <LayoutDashboard className="h-4 w-4" />
              Mijn overzicht
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 font-medium text-white transition hover:bg-white/10 sm:px-3.5"
              >
                Inloggen
              </Link>
              <Link
                href="/login?modus=registreren"
                className="rounded-full bg-mint px-4 py-2.5 font-bold text-mint-ink transition hover:bg-mint-light"
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
