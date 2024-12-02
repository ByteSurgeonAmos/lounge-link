import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(request: Request, { params }: any) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action } = await request.json();
  if (!["accept", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const connection = await prisma.userConnection.findUnique({
    where: { id: params.id },
  });

  if (!connection) {
    return NextResponse.json(
      { error: "Connection not found" },
      { status: 404 }
    );
  }

  if (connection.connectedId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updatedConnection = await prisma.userConnection.update({
    where: { id: params.id },
    data: {
      status: action === "accept" ? "ACCEPTED" : "REJECTED",
    },
  });

  return NextResponse.json(updatedConnection);
}
