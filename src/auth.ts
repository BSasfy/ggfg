import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma-edge";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // ...add more providers here
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  pages: {
    signIn: "/auth/sign-in",
    // signOut: "/logout",
    // error: "/auth/error",
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
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       return {
  //         ...token,
  //         id: user.id,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id as string,
  //       },
  //     };
  //   },
  // },
});
