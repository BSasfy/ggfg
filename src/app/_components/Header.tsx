import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";

export async function Header() {
  const session = await auth();
  // console.log(session?.user.id);
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
          className="border-brand-gray rounded-full border-2 bg-white/10 px-6 py-2 text-lg font-semibold no-underline transition hover:bg-white/20 lg:text-2xl"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
