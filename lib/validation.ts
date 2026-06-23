import { z } from "zod";

export const billingPeriodSchema = z.enum([
  "maandelijks",
  "jaarlijks",
  "kwartaal",
  "wekelijks",
]);

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht").max(80),
  email: z.string().trim().toLowerCase().email("Ongeldig e-mailadres"),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 tekens zijn").max(100),
});

export const subscriptionInputSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht").max(100),
  planName: z.string().trim().max(100).optional().or(z.literal("")),
  price: z.coerce.number().min(0, "Prijs mag niet negatief zijn").max(100000),
  billingPeriod: billingPeriodSchema,
  category: z.string().trim().max(60).optional().or(z.literal("")),
  presetId: z.string().trim().max(60).optional(),
  logoUrl: z.string().trim().max(500).optional(),
  color: z.string().trim().max(20).optional(),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export const subscriptionUpdateSchema = subscriptionInputSchema.partial();

export type SubscriptionInput = z.infer<typeof subscriptionInputSchema>;
