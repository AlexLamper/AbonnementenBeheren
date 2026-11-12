import mongoose, { Schema, model, models } from "mongoose";

// Werkt op dezelfde "users"-collectie als de NextAuth MongoDB-adapter.
// Voor e-mail/wachtwoord-accounts slaan we extra een passwordHash op.
//
// Premium heeft twee onafhankelijke bronnen op één account:
// - premiumStripe: betaald op de website (Stripe-webhook zet dit)
// - premiumStore:  betaald in de app via App Store / Google Play (RevenueCat)
// Premium = een van beide. Zo werkt een aankoop op de site ook in de app.

export interface UserDoc {
  _id: mongoose.Types.ObjectId;
  name?: string;
  email: string;
  emailVerified?: Date | null;
  image?: string;
  passwordHash?: string;
  premiumStripe?: boolean;
  premiumStore?: boolean;
  storePremiumExpiresAt?: Date | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  /** Handmatig gegeven Premium (bijv. vroege gebruikers), los van betalingen. */
  premiumGranted?: boolean;
}

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    emailVerified: { type: Date, default: null },
    image: { type: String },
    passwordHash: { type: String },
    premiumStripe: { type: Boolean, default: false },
    premiumStore: { type: Boolean, default: false },
    storePremiumExpiresAt: { type: Date, default: null },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    premiumGranted: { type: Boolean, default: false },
  },
  { collection: "users" }
);

export const User = models.User || model<UserDoc>("User", UserSchema);
