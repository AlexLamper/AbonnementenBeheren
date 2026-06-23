"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

const SHARE_URL = "https://abonnementenbeheren.com";
const SHARE_TEXT =
  "Houd al je abonnementen makkelijk bij met AbonnementenBeheren";

export function ShareButton({
  subtle = false,
  light = false,
}: {
  subtle?: boolean;
  light?: boolean;
}) {
  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "AbonnementenBeheren",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
      } catch {
        // gebruiker annuleerde - niets doen
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast.success("Link gekopieerd naar klembord");
    } catch {
      toast.error("Kon de link niet kopiëren");
    }
  }

  const className = light
    ? "inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
    : subtle
      ? "inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand"
      : "inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

  return (
    <button type="button" onClick={handleShare} className={className}>
      <Share2 className="h-4 w-4" />
      Deel
    </button>
  );
}
