import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma-edge";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import Stripe from "stripe";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    DiscordProvider,
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  //   pages: {
  //     signIn: "/signin",
  //   },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    // session: ({ session, token }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: token.sub,
    //   },
    // }),
    session: async ({ session, token }) => {
      console.log(session, "<session");
      console.log(token, "<token");
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY environment variable is required");
      }

      // Create stripe API client using the secret key env variable
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-06-30.basil",
      });

      // Create a stripe customer for the user with their email address
      await stripe.customers
        .create({
          email: user.email!,
        })
        .then(async (customer: Stripe.Customer) => {
          // Use the Prisma Client to update the user in the database with their new Stripe customer ID
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
});
