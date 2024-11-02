import prisma from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Status } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // check if credentials are not null
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // check if user is not null or status is inactive
        if (!user || user.status === Status.inactive) return null;

        const passwordMatch = user.password === credentials.password;

        //check if password match
        if (!passwordMatch) return null;
        const userProfile = await prisma.userProfile.findUnique({
          where: { userEmail: user.email },
        });

        //check if there is profile for that user and status is not inactive
        if (userProfile === null || userProfile?.status === Status.inactive) {
          return null;
        }

        //if everything is ok
        return {
          ...user,
          role: userProfile.role,
        };
      },
    }),
  ],
  // add role based authentication
  // module augmentation can be found in /next-auth.d.ts in root directory
  // ref : https://authjs.dev/guides/role-based-access-control?_gl=1*mfvs4s*_gcl_au*MjA2NDIwODM4MC4xNzMwNDY5NzY2LjEyNjI1MjYzMjguMTczMDQ4NDUwNC4xNzMwNDg0NTAz
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
