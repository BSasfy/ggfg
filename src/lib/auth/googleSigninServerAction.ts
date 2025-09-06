"use server";

import { auth, signIn } from "@/auth";
import { checkIsAuthenticated } from "./checkIsAuthenticated";

export async function handleGoogleSignin() {
  try {
    await signIn("google", {
      redirectTo: "/",
    });
  } catch (error) {
    throw error;
  }
}
