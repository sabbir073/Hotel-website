import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const users = await query<any[]>(
            "SELECT * FROM admin_users WHERE username = ? AND status = 'active'",
            [credentials.username]
          );

          if (users.length === 0) {
            return null;
          }

          const user = users[0];

          if (!verifyPassword(credentials.password, user.password)) {
            return null;
          }

          // Update last login
          await query(
            "UPDATE admin_users SET last_login = NOW() WHERE id = ?",
            [user.id]
          );

          return {
            id: user.id.toString(),
            name: user.full_name,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
