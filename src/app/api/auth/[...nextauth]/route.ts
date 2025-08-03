import NextAuth from "next-auth";
import { authOptions } from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const { GET, POST } = NextAuth(authOptions);
