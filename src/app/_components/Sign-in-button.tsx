"use client";

import { useRouter } from "next/navigation";
import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { auth } from "@/auth";
import { useEffect, useState } from "react";

export default function SignInButton({
  buttonClassName = "border-brand-gray rounded-full border-2 bg-white/10 px-6 py-2 text-lg font-semibold no-underline transition hover:bg-white/20 lg:text-2xl",
}: {
  buttonClassName?: string;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let isAuthenticated = false;
    const checkAuth = async () => {
      try {
        isAuthenticated = await checkIsAuthenticated();
      } catch (error) {
        console.error("checkAuth error", error);
      }
    };
    checkAuth()
      .then(() => {
        setIsAuthenticated(isAuthenticated);
      })
      .catch((err) => console.error(err));
    // setIsAuthenticated(isAuthenticated);
  }, []);
  return (
    <button
      className={buttonClassName}
      onClick={() => {
        if (isAuthenticated) {
          handleSignOut()
            .then(() => {
              console.log("Signed out");
            })
            .catch((err) => console.error(err));
        } else {
          router.push("/auth/sign-in");
        }
      }}
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </button>
  );
}
