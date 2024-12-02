import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/authConfig";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await request.json();

    const connector = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const connection = await prisma.userConnection.create({
      data: {
        connectorId: connector!.id,
        connectedId: userId,
      },
    });

    return NextResponse.json(connection);
  } catch (error) {
    console.error("Connection error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
