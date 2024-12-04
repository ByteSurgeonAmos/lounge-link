import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: any }) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { connectionId } = await params;

  const chat = await prisma.chat.findFirst({
    where: {
      OR: [
        { userOneId: session.user.id, userTwoId: connectionId },
        { userOneId: connectionId, userTwoId: session.user.id },
      ],
    },
  });

  if (!chat) {
    return NextResponse.json({ unreadCount: 0 });
  }

  const unreadCount = await prisma.message.count({
    where: {
      chatId: chat.id,
      senderId: connectionId, // Messages from the other user
      recipientId: session.user.id, // Messages sent to current user
      read: false,
    },
  });

  return NextResponse.json({ unreadCount });
}
