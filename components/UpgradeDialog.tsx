"use client";

import { Sparkles } from "lucide-react";
import { Modal } from "@/components/Modal";
import { PerkList, PlanPicker, type PlanPrices } from "@/components/PlanPicker";

export type UpgradeReason = "limit" | "export" | "manual";

const COPY: Record<UpgradeReason, { title: string; body: (limit: number) => string }> = {
  limit: {
    title: "Limiet bereikt",
    body: (limit) =>
      `Met een gratis account houd je ${limit} abonnementen bij. Met Premium voeg je er zoveel toe als je wilt.`,
  },
  export: {
    title: "Exporteren",
    body: () =>
      "Download je hele overzicht als CSV en open het in Excel of Numbers.",
  },
  manual: {
    title: "Premium",
    body: (limit) =>
      `Gratis houd je ${limit} abonnementen bij. Premium haalt die grens weg.`,
  },
};

export function UpgradeDialog({
  open,
  onClose,
  reason,
  limit,
  prices,
}: {
  open: boolean;
  onClose: () => void;
  reason: UpgradeReason;
  limit: number;
  prices: PlanPrices;
}) {
  const copy = COPY[reason];
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={copy.title}
      icon={
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-mint-ink">
          <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.4} />
        </span>
      }
    >
      <p className="-mt-1 text-[15px] text-slate-600">{copy.body(limit)}</p>
      <div className="my-5 rounded-[18px] bg-surface px-4 py-4">
        <PerkList />
      </div>
      <PlanPicker prices={prices} compact />
    </Modal>
  );
}
