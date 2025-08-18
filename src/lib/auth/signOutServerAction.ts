"use server";

import { auth, signOut } from "@/auth";

export async function handleSignOut() {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }
    await signOut();
  } catch (error) {
    console.error("signOutServerAction error", error);
  }
}
