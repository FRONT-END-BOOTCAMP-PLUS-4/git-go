import { PrismaClient } from "@/prisma/generated/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user repo read:org",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;

        const githubProfile = profile as { login: string; avatar_url: string; };
        const githubId = account.providerAccountId;
        const username = githubProfile.login as string;
        const profileUrl = githubProfile.avatar_url as string;

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ githubId, username, profileUrl }),
        });

        const user = await res.json();
        token.id = user.id;
        token.githubId = user.username;
      }
      return token;
    },
    // async jwt({ token, account }) {
    //     if (account) {
    //         token.accessToken = account.access_token;
    //     }
    //     return token;
    // },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.githubId as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };