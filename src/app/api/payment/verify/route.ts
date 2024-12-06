import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPaystackTransaction } from "@/utils/paystack";

export async function POST(req: Request) {
  try {
    const { reference, userId, plan, amount } = await req.json();

    if (!reference || !userId) {
      return NextResponse.json(
        { success: false, message: "Reference and userId are required" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const paystackResponse = await verifyPaystackTransaction(reference);
    const paystackSubscriptionCode = paystackResponse.data.subscription;

    if (
      !paystackResponse.status ||
      paystackResponse.data.status !== "success"
    ) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(
      subscriptionEndDate.getMonth() + (plan === "monthly" ? 1 : 12)
    );

    // Create transaction and update user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          amount,
          currency: "USD",
          status: "SUCCESS",
          reference,
          userId,
          metadata: { plan },
        },
      });

      // Update user subscription
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          isSubscribed: true,
          subscriptionTier: "PRO",
          subscriptionEndDate,
          subscription: {
            upsert: {
              create: {
                tier: "PRO",
                endDate: subscriptionEndDate,
                amount,
                paystackRef: reference,
                paymentStatus: "SUCCESS",
                paystackSubscriptionCode,
                nextPaymentDate: paystackResponse.data.next_due_date,
              },
              update: {
                endDate: subscriptionEndDate,
                amount,
                paystackRef: reference,
                paymentStatus: "SUCCESS",
                paystackSubscriptionCode,
                nextPaymentDate: paystackResponse.data.next_due_date,
              },
            },
          },
        },
      });

      return { transaction, user };
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified and subscription updated",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
