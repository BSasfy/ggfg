// import { type DefaultSession, type NextAuthConfig } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
// import GitHubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "../../../prisma/shared-client";
// import Stripe from "stripe";
// import Google from "next-auth/providers/google";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  */
// export const authConfig = {
//   providers: [
//     DiscordProvider,
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Google,
//     /**
//      * ...add more providers here.
//      *
//      * Most other providers require a bit more work than the Discord provider. For example, the
//      * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//      * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//      *
//      * @see https://next-auth.js.org/providers/github
//      */
//   ],
//   callbacks: {
//     session: ({ session, token }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: token.sub,
//       },
//     }),
//     authorized: async ({ auth }) => {
//       // Logged in users are authenticated, otherwise redirect to login page
//       return !!auth;
//     },
//   },
//   adapter: PrismaAdapter(prisma),
//   events: {
//     createUser: async ({ user }) => {
//       // Create stripe API client using the secret key env variable
//       const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//         apiVersion: "2025-06-30.basil",
//       });

//       // Create a stripe customer for the user with their email address
//       await stripe.customers
//         .create({
//           email: user.email!,
//         })
//         .then(async (customer: Stripe.Customer) => {
//           // Use the Prisma Client to update the user in the database with their new Stripe customer ID
//           return prisma.user.update({
//             where: { id: user.id },
//             data: {
//               stripeCustomerId: customer.id,
//             },
//           });
//         });
//     },
//   },
// } satisfies NextAuthConfig;
