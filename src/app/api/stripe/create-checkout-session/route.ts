import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(request: Request) {
  const { priceId } = (await request.json()) as { priceId: string };

  try {
    const session = await stripe.checkout.sessions.create({
      customer: "cus_T0S8IcsTgm3Fff",
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      //here
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/subscriptions`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("create-checkout-session error", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
