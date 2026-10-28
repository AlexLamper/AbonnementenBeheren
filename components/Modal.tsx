"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  icon,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Optioneel element links van de titel, bijv. een dienstlogo. */
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-navy/60 p-0 backdrop-blur-[2px] [animation-duration:0.2s] sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-[480px] animate-slide-in-up overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] sm:animate-fade-in-scale sm:rounded-[28px] sm:p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {icon}
            <h2
              id={titleId}
              className="truncate font-display text-[22px] font-bold text-slate-900"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-slate-600 transition hover:bg-line hover:text-slate-900"
            aria-label="Sluiten"
          >
            <X className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
