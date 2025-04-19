import { auth } from "@/server/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth();
  return (
    <div className="bg-brand-blue flex flex-col items-end gap-2">
      <div className="flex flex-col items-center justify-center gap-4 pr-2 pb-3">
        <p className="text-center text-2xl text-white">
          {session && <span>Hi, {session.user?.name}!</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-8 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
