import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "E-mail",
    credentials: {
      email: { label: "E-mail", type: "email" },
      password: { label: "Wachtwoord", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      await connectDB();
      const user = await User.findOne({
        email: credentials.email.toLowerCase(),
      });
      if (!user?.passwordHash) return null;
      const ok = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!ok) return null;
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      };
    },
  }),
];

// Google alleen toevoegen wanneer de keys aanwezig zijn (anders crasht NextAuth niet).
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
