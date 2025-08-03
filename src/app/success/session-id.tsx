"use client";

import { useSearchParams } from "next/navigation";

export function CheckSession() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return <div>No session ID</div>;
  }
  return <div>Session ID: {sessionId}</div>;
}
