export type BillingPeriod = "maandelijks" | "jaarlijks" | "kwartaal" | "wekelijks";

export const BILLING_PERIODS: { value: BillingPeriod; label: string }[] = [
  { value: "maandelijks", label: "Per maand" },
  { value: "jaarlijks", label: "Per jaar" },
  { value: "kwartaal", label: "Per kwartaal" },
  { value: "wekelijks", label: "Per week" },
];

/** Reken een bedrag voor een gegeven periode om naar het maandbedrag. */
export function toMonthly(price: number, period: BillingPeriod): number {
  switch (period) {
    case "maandelijks":
      return price;
    case "jaarlijks":
      return price / 12;
    case "kwartaal":
      return price / 3;
    case "wekelijks":
      return (price * 52) / 12;
  }
}

/** Reken een bedrag voor een gegeven periode om naar het jaarbedrag. */
export function toYearly(price: number, period: BillingPeriod): number {
  switch (period) {
    case "maandelijks":
      return price * 12;
    case "jaarlijks":
      return price;
    case "kwartaal":
      return price * 4;
    case "wekelijks":
      return price * 52;
  }
}

const eur = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function formatEUR(amount: number): string {
  return eur.format(amount);
}

export function periodLabel(period: BillingPeriod): string {
  return BILLING_PERIODS.find((p) => p.value === period)?.label ?? period;
}

/** Totalen over een lijst abonnementen. */
export function totals(items: { price: number; billingPeriod: BillingPeriod }[]) {
  let monthly = 0;
  let yearly = 0;
  for (const item of items) {
    monthly += toMonthly(item.price, item.billingPeriod);
    yearly += toYearly(item.price, item.billingPeriod);
  }
  return { monthly, yearly };
}
