"use client";

import { handleGoogleSignin } from "@/lib/auth/googleSigninServerAction";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-80 rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h1 className="mb-4 text-2xl font-bold">Sign in</h1>
        <div className="flex flex-col items-center">
          <div className="flex w-full flex-col">
            <button
              onClick={handleGoogleSignin}
              className="flex items-center justify-center rounded-2xl border bg-transparent p-4 text-lg font-bold hover:cursor-pointer hover:bg-gray-100"
            >
              <FcGoogle className="mr-5 h-6 w-6" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
