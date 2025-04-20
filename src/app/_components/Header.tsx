import { auth } from "@/server/auth";
import Link from "next/link";
import Image from "next/image";

export async function Header() {
  const session = await auth();
  return (
    <div className="bg-brand-blue flex flex-row items-center justify-between px-4">
      <Link href="/">
        <Image
          src="/ggfg-logo.png"
          width={60}
          height={60}
          alt="Logo leading to homepage"
        />
      </Link>
      <div className="flex flex-row justify-center gap-4 py-3">
        <p className="text-center text-2xl text-white">
          {session && <span>Hi, {session.user?.name}!</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="border-brand-gray rounded-full border-2 bg-white/10 px-8 py-3 text-2xl font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
