import { redirect } from "next/navigation";
import SignInPage from "./signin";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function SignIn() {
  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return <SignInPage />;
}
