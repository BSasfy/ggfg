import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma-edge";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import Stripe from "stripe";

// Validate required environment variables
if (!process.env.AUTH_GOOGLE_ID) throw new Error("AUTH_GOOGLE_ID is required");
if (!process.env.AUTH_GOOGLE_SECRET)
  throw new Error("AUTH_GOOGLE_SECRET is required");
if (!process.env.AUTH_DISCORD_ID)
  throw new Error("AUTH_DISCORD_ID is required");
if (!process.env.AUTH_DISCORD_SECRET)
  throw new Error("AUTH_DISCORD_SECRET is required");
if (!process.env.GITHUB_CLIENT_ID)
  throw new Error("GITHUB_CLIENT_ID is required");
if (!process.env.GITHUB_CLIENT_SECRET)
  throw new Error("GITHUB_CLIENT_SECRET is required");

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  //   pages: {
  //     signIn: "/signin",
  //   },
  callbacks: {
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
