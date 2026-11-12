"use client";

import { useSyncExternalStore } from "react";
import { Smartphone } from "lucide-react";
import { IOS_APP_LIVE, IOS_APP_STORE_URL } from "@/lib/seo";

// Alleen iPhone (en iPod). iPads melden zich als Mac en houden dus de
// webversie, net als laptops en desktops.
function isIPhone() {
  return /iPhone|iPod/i.test(navigator.userAgent);
}

const noop = () => () => {};

/** Knop "Ook als iPhone-app", alleen zichtbaar op een iPhone. */
export function IosAppButton({ className = "" }: { className?: string }) {
  // Op de server en bij de eerste render: niets tonen, zodat de HTML
  // overal gelijk is. Daarna in de browser pas beslissen.
  const onIPhone = useSyncExternalStore(noop, isIPhone, () => false);

  if (!IOS_APP_LIVE || !onIPhone) return null;

  return (
    <a
      href={IOS_APP_STORE_URL}
      className={`inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.07] py-2.5 pl-3 pr-5 text-left text-white transition hover:bg-white/15 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy">
        <Smartphone className="h-5 w-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-xs text-haze">Ook beschikbaar</span>
        <span className="block font-bold">Download de iPhone-app</span>
      </span>
    </a>
  );
}
