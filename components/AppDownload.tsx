"use client";

import { useEffect, useState } from "react";
import { Download, Star } from "lucide-react";
import { IOS_APP_STORE_URL } from "@/lib/seo";

/** Id van de grote downloadknop in de hero; de vaste balk kijkt daarnaar. */
export const APP_DOWNLOAD_ID = "app-download";

/**
 * Grote, volle-breedte downloadknop voor de iPhone-app. Alleen tonen op een
 * iPhone (de pagina beslist dat op de server).
 */
export function AppStoreButton({
  id,
  className = "",
}: {
  id?: string;
  className?: string;
}) {
  return (
    <a
      id={id}
      href={IOS_APP_STORE_URL}
      className={`flex w-full items-center gap-4 rounded-[1.25rem] bg-mint px-5 py-4 text-left text-mint-ink shadow-[0_18px_40px_-18px_rgba(45,212,191,0.7)] transition active:scale-[0.98] hover:bg-mint-light ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint-ink text-mint">
        <Download className="h-6 w-6" strokeWidth={2.4} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block font-display text-xl font-bold">
          Download op iOS
        </span>
        <span className="mt-0.5 block text-sm font-medium opacity-80">
          Gratis in de App Store
        </span>
      </span>
    </a>
  );
}

/** Kleine regel met kenmerken onder de downloadknop. */
export function AppPerks() {
  return (
    <p className="flex items-center justify-center gap-1.5 text-sm text-haze">
      <Star className="h-3.5 w-3.5 fill-mint text-mint" aria-hidden />
      Gratis · Geen creditcard · Synct met de website
    </p>
  );
}

/**
 * Vaste balk onderaan het scherm met de downloadknop. Verschijnt pas zodra
 * de grote knop in de hero uit beeld is gescrold, zodat de download altijd
 * één tik weg is.
 */
export function StickyAppBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(APP_DOWNLOAD_ID);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 px-4 pt-3 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={IOS_APP_STORE_URL}
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center justify-center gap-2.5 rounded-full bg-mint py-3.5 font-bold text-mint-ink transition active:scale-[0.98]"
      >
        <Download className="h-5 w-5" strokeWidth={2.4} aria-hidden />
        Download op iOS
      </a>
    </div>
  );
}
