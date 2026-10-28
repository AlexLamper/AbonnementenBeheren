"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

const SHARE_URL = "https://abonnementenbeheren.com";
const SHARE_TEXT =
  "Houd al je abonnementen makkelijk bij met AbonnementenBeheren";

/** Deelknop; `tone="dark"` voor navy achtergronden. */
export function ShareButton({
  tone = "light",
  label = "Delen",
  className = "",
}: {
  tone?: "dark" | "light";
  label?: string;
  className?: string;
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

  const styles =
    tone === "dark"
      ? "border-white/25 text-white hover:bg-white/10"
      : "border-line bg-white text-slate-700 hover:bg-surface";

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${styles} ${className}`}
    >
      <Share2 className="h-4 w-4" />
      {label}
    </button>
  );
}
