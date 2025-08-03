"use client";

import { Suspense } from "react";
import { CheckSession } from "./session-id";

export default function Success() {
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckSession />
      </Suspense>
    </div>
  );
}
