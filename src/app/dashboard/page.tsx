import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function DashboardPage() {
  const isAuthenticated = await checkIsAuthenticated();
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }
  return <DashboardPage />;
}
