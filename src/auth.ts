import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export const config: NextAuthConfig = {
  providers: [
    Google,
    GitHub,

    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"username" | "password", unknown>>,
        req: Request
      ) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("すべての項目を入力してください");
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user || !user.password) {
          throw new Error("ユーザ名またはパスワードが異なります");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("ユーザ名またはパスワードが異なります");
        }

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
          image: user.icon || "/user_default.png",
        };
      }
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

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
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user)  {
        session.user.id = String(token.id);
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.image = token.picture ?? "/user_default.png";
      }
      return session;
    }
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);