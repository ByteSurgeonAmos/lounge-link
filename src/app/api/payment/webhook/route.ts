import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const payload = await req.text();

  const parsedPayload = JSON.parse(payload);
  const event = parsedPayload.event;

  if (event === "invoice.payment_failed") {
    const subscriptionCode = parsedPayload.data.subscription.subscription_code;

    // Find the user by subscription code
    const subscription = await prisma.subscription.findUnique({
      where: { paystackSubscriptionCode: subscriptionCode },
      include: { user: true },
    });

    if (subscription) {
      // Downgrade user's subscription
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          isSubscribed: false,
          subscriptionTier: "FREE",
          subscriptionEndDate: null,
        },
      });
    }
  }

  if (event === "charge.success") {
    // Updated event name
    const subscriptionCode = parsedPayload.data.subscription.subscription_code;

    // Find the user by subscription code
    const subscription = await prisma.subscription.findUnique({
      where: { paystackSubscriptionCode: subscriptionCode },
      include: { user: true },
    });

    if (subscription) {
      // Upgrade or renew user's subscription
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          isSubscribed: true,
          subscriptionTier: "PRO",
          subscriptionEndDate: new Date(
            parsedPayload.data.subscription.next_payment_date
          ), // Example adjustment
        },
      });
    }
  }

  if (event === "subscription.disable") {
    const subscriptionCode = parsedPayload.data.subscription.subscription_code;

    // Find the user by subscription code
    const subscription = await prisma.subscription.findUnique({
      where: { paystackSubscriptionCode: subscriptionCode },
      include: { user: true },
    });

    if (subscription) {
      // Downgrade user's subscription
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          isSubscribed: false,
          subscriptionTier: "FREE",
          subscriptionEndDate: null,
        },
      });
    }
  }

  if (event === "subscription.create") {
    const subscriptionCode = parsedPayload.data.subscription.subscription_code;

    // Find the user by subscription code
    const subscription = await prisma.subscription.findUnique({
      where: { paystackSubscriptionCode: subscriptionCode },
      include: { user: true },
    });

    if (subscription) {
      // Initialize user's subscription
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          isSubscribed: true,
          subscriptionTier: "PRO",
          subscriptionEndDate: new Date(
            parsedPayload.data.subscription.next_payment_date
          ),
        },
      });
    }
  }

  if (event === "subscription.enable") {
    const subscriptionCode = parsedPayload.data.subscription.subscription_code;

    // Find the user by subscription code
    const subscription = await prisma.subscription.findUnique({
      where: { paystackSubscriptionCode: subscriptionCode },
      include: { user: true },
    });

    if (subscription) {
      // Re-enable user's subscription
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          isSubscribed: true,
          subscriptionTier: "PRO",
          subscriptionEndDate: new Date(
            parsedPayload.data.subscription.next_payment_date
          ),
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}
