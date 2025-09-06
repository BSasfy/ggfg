import { NextResponse } from "next/server";
import Stripe from "stripe";
import type { NextRequest } from "next/server";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(request: NextRequest) {
  const { sessionId } = (await request.json()) as { sessionId: string };

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log(session);
    if (session.payment_status === "paid") {
      // Update your database to mark the user as subscribed
      // await updateUserSubscriptionStatus(session.client_reference_id, 'active');
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("check-session error");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    );
  }
}
