import mongoose, { Schema, model, models } from "mongoose";

// Werkt op dezelfde "users"-collectie als de NextAuth MongoDB-adapter.
// Voor e-mail/wachtwoord-accounts slaan we extra een passwordHash op.

export interface UserDoc {
  _id: mongoose.Types.ObjectId;
  name?: string;
  email: string;
  emailVerified?: Date | null;
  image?: string;
  passwordHash?: string;
}

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    emailVerified: { type: Date, default: null },
    image: { type: String },
    passwordHash: { type: String },
  },
  { collection: "users" }
);

export const User = models.User || model<UserDoc>("User", UserSchema);
