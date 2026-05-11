import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Demo account",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        const email = credentials?.email ?? "demo@archmetrics.app";
        return { id: email, email, name: "ArchMetrics Pro" };
      }
    })
  ],
  pages: { signIn: "/api/auth/signin" }
};
