import { NextResponse } from "next/server";
import { validateVerificationToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const email = await validateVerificationToken(token);

    return NextResponse.json(
      { message: "Email verified successfully", email },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: error.message || "Verification failed" },
      { status: 400 }
    );
  }
}
