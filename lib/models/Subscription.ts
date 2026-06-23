import mongoose, { Schema, model, models } from "mongoose";
import type { BillingPeriod } from "@/lib/money";

export interface SubscriptionDoc {
  _id: mongoose.Types.ObjectId;
  userId: string;
  name: string;
  planName?: string;
  price: number;
  billingPeriod: BillingPeriod;
  category?: string;
  presetId?: string;
  logoUrl?: string;
  color?: string;
  notes?: string;
  startDate?: Date;
  // Voorbereid voor latere herinneringen - nog niet actief in v1.
  nextRenewalDate?: Date;
  reminderEnabled: boolean;
  reminderDaysBefore: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<SubscriptionDoc>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    planName: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    billingPeriod: {
      type: String,
      required: true,
      enum: ["maandelijks", "jaarlijks", "kwartaal", "wekelijks"],
      default: "maandelijks",
    },
    category: { type: String, trim: true },
    presetId: { type: String },
    logoUrl: { type: String },
    color: { type: String },
    notes: { type: String, trim: true },
    startDate: { type: Date },
    // Voorbereid voor herinneringen.
    nextRenewalDate: { type: Date },
    reminderEnabled: { type: Boolean, default: false },
    reminderDaysBefore: { type: Number, default: 7 },
  },
  { timestamps: true }
);

export const Subscription =
  models.Subscription ||
  model<SubscriptionDoc>("Subscription", SubscriptionSchema);
