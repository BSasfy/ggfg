"use server";

import { auth } from "@/auth";

export async function checkIsAuthenticated() {
  const session = await auth();
  if (!session) {
    return false;
  }
  return true;
  //   return !!session;
}
