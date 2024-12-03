import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { recipientId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check if chat already exists
  const existingChat = await prisma.chat.findFirst({
    where: {
      OR: [
        {
          AND: [{ userOneId: user.id }, { userTwoId: recipientId }],
        },
        {
          AND: [{ userOneId: recipientId }, { userTwoId: user.id }],
        },
      ],
    },
  });

  if (existingChat) {
    return NextResponse.json({
      chatId: existingChat.id,
      recipientId: recipientId,
    });
  }

  // Create new chat
  const newChat = await prisma.chat.create({
    data: {
      userOneId: user.id,
      userTwoId: recipientId,
    },
  });

  return NextResponse.json({
    chatId: newChat.id,
    recipientId: recipientId,
  });
}
