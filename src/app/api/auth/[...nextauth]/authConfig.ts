import { prisma } from "@/lib/db";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
        loginMethod: { label: "Login Method", type: "text" },
        rememberMe: { label: "Remember Me", type: "boolean" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.identifier || !credentials?.password) {
            throw new Error("Missing required fields");
          }

          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { username: credentials.identifier },
                { email: credentials.identifier },
                { phoneNumber: credentials.identifier },
              ],
            },
          });

          if (!user) throw new Error("User not found");

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) throw new Error("Invalid credentials");

          // Properly parse rememberMe value
          const rememberMe =
            String(credentials.rememberMe).toLowerCase() === "true";

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            rememberMe,
          } satisfies User;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        // Ensure rememberMe is typed as boolean
        token.rememberMe = Boolean(user.rememberMe);
      }
      // Set maxAge based on rememberMe
      token.maxAge = token.rememberMe ? 30 * 24 * 60 * 60 : 12 * 60 * 60;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rememberMe = token.rememberMe as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
