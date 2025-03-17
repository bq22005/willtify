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
      async authorize(credentials) {
        console.log("authorize credentials:", credentials);

        if (!credentials?.username || !credentials?.password) {
          throw new Error("すべての項目を入力してください");
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({ where: { username } });
        console.log("authorize user:", user);

        if (!user || !user.password) {
          throw new Error("CredentialsSignin");
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
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT token before update:", token);
      console.log("JWT user:", user);

      if (user) {
        token.id = user.id ? Number(user.id) : token.id ?? "guest";
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image || "/user_default.png";
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session token:", token);

      if (session.user) {
        session.user.id = String(token.id);
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.image = token.picture ?? "/user_default.png";
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);