"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const [status, setStatus] = useState("loading");
  const [customerEmail, setCustomerEmail] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const fetchSessionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/stripe/check-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const { session, error } = (await response.json()) as {
        session?: { status: string; customer_email: string };
        error?: string;
      };

      if (error) {
        setStatus("failed");
        console.error(error);
        return;
      }

      if (session) {
        setStatus(session.status);
        setCustomerEmail(session.customer_email);
      }
    } catch (error) {
      console.error("Error fetching session status:", error);
      setStatus("failed");
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      void fetchSessionStatus();
    }
  }, [sessionId, fetchSessionStatus]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to process subscription. Please try again.</div>;
  }

  return (
    <div>
      <h1>Subscription Successful!</h1>
      <p>
        Thank you for your subscription. A confirmation email has been sent to{" "}
        {customerEmail}.
      </p>
    </div>
  );
}
