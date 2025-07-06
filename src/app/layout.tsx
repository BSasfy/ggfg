import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

import { Header } from "./_components/Header";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "./_components/footer";
import { SessionProvider, useSession } from "next-auth/react";

export const metadata: Metadata = {
  title: "Glasgow's Good Food Group",
  description: "Best Restaurants in Glasgow",
  icons: [{ rel: "icon", url: "/ggfg-logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-brand-soft-gray">
        <TRPCReactProvider>
          <SessionProvider>
            <Analytics />
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
