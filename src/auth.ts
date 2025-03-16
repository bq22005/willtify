import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/app/lib/prisma";

export const config: NextAuthConfig = {
  providers: [
    Google,
    GitHub,
  ],
  basePath: "/api/auth",
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email && !account?.providerAccountId) return false;

      try {
        let existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              user.email ? { email: user.email } : {},
              account?.providerAccountId ? { providerId: account?.providerAccountId} : {},
            ],
          },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              username: user.name || `user_${Date.now()}`,
              icon: user.image || "/user_default.png",
              email: user.email,
              provider: account?.provider || "credentials",
              providerId: account?.providerAccountId || null,
            },
          });
        } else if (!existingUser.providerId && account?.providerAccountId) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { provider: account.provider, providerId: account.providerAccountId },
          });
        }

        return true;
      } catch(error) {
        console.error("SignIn Error", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user)  {
        session.user.id = String(token.id);
      }
      return session;
    }
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);