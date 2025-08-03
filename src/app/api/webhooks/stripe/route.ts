import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-edge";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  let event;

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: unknown) {
    console.error("Error verifying webhook signature:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      await handleSubscriptionCreated(event.data.object);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object);
      break;
    case "invoice.payment_succeeded":
      await handleInvoicePaid(event.data.object);
      break;
    case "customer.created":
      await handleCustomerCreated(event.data.object);
      break;
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    // ... handle other events
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // add true to hasSubscription in the database
  // You might want to update the user's access level based on the new subscription status
  console.log("Subscription created:", subscription);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Update the subscription status in your database
  // You might want to revoke the user's access to premium features
  console.log("Subscription deleted:", subscription);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Update the user's payment status in your database
  // You might want to extend the user's access period
  console.log("Invoice paid:", invoice.id);
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  if (customer.id) {
    await prisma.user.update({
      where: {
        stripeCustomerId: customer.id,
      },
      data: {
        hasActiveSubscription: true,
      },
    });
  }
  // Check if the customer has also paid. If not, send an email to the customer
  // You might want to update the user's access level based on the new customer status
  console.log("Customer created:", customer.id);
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  // welcome customer to the app
  // Update the user's payment status in your database
  // You might want to extend the user's access period
  console.log("Checkout session completed:", session.id);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
