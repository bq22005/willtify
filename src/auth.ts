import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const config: NextAuthConfig = {
  providers: [
    Google,
    GitHub,
    
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({request, auth}) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname == "/protected-page") return !!auth;
        return true;
      } catch (error) {
        console.error(error);
      }
    },
    jwt({token, trigger, session}) {
      if(trigger === "update") token.name = session.user.name;
      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);