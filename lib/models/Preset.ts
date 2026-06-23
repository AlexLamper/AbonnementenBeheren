import mongoose, { Schema, model, models } from "mongoose";
import type { BillingPeriod } from "@/lib/money";

export interface PresetPlanDoc {
  name: string;
  price: number;
  billingPeriod: BillingPeriod;
}

export interface PresetDoc {
  _id: mongoose.Types.ObjectId;
  /** Stabiele id, bijv. "spotify". */
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
  color?: string;
  affiliateUrl?: string;
  plans: PresetPlanDoc[];
  createdAt: Date;
  updatedAt: Date;
}

const PresetPlanSchema = new Schema<PresetPlanDoc>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    billingPeriod: {
      type: String,
      required: true,
      enum: ["maandelijks", "jaarlijks", "kwartaal", "wekelijks"],
      default: "maandelijks",
    },
  },
  { _id: false }
);

const PresetSchema = new Schema<PresetDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    logoUrl: { type: String },
    color: { type: String },
    affiliateUrl: { type: String },
    plans: { type: [PresetPlanSchema], default: [] },
  },
  { timestamps: true }
);

export const Preset =
  models.Preset || model<PresetDoc>("Preset", PresetSchema);
