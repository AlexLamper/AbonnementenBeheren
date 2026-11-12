import { Schema, model, models } from "mongoose";

// Idempotente webhook-verwerking: Stripe en RevenueCat sturen soms hetzelfde
// event twee keer. Een unieke index op (provider, eventId) voorkomt dubbel werk.

const WebhookEventSchema = new Schema(
  {
    provider: { type: String, required: true, enum: ["stripe", "revenuecat"] },
    eventId: { type: String, required: true },
    type: { type: String, default: "" },
  },
  { timestamps: true }
);

WebhookEventSchema.index({ provider: 1, eventId: 1 }, { unique: true });

export const WebhookEvent =
  models.WebhookEvent || model("WebhookEvent", WebhookEventSchema);

/** true als het event nieuw is; false als het al eerder verwerkt is. */
export async function claimWebhookEvent(
  provider: "stripe" | "revenuecat",
  eventId: string,
  type: string
): Promise<boolean> {
  try {
    await WebhookEvent.create({ provider, eventId, type: type.slice(0, 120) });
    return true;
  } catch (e: unknown) {
    if ((e as { code?: number }).code === 11000) return false;
    throw e;
  }
}

/** Laat een event weer los zodat een retry van de provider opnieuw kan. */
export async function releaseWebhookEvent(
  provider: "stripe" | "revenuecat",
  eventId: string
): Promise<void> {
  await WebhookEvent.deleteOne({ provider, eventId }).catch(() => {});
}
