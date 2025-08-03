"use client";

import { useState } from "react";

export default async function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      });
      const { url } = (await response.json()) as { url: string };
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <div>Has a subscription?</div>
      <div>
        here goes the true or false. Get customer from db, get stripe ID, check
        stripe for has sub, return value here.{" "}
      </div>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        onClick={handleManageSubscription}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Manage Subscription"}
      </button>
    </div>
  );
}
