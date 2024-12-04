import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { pusherServer as pusher } from "@/lib/pusher";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chatId } = await req.json();

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    select: { userOneId: true, userTwoId: true },
  });

  await prisma.message.updateMany({
    where: {
      chatId,
      recipientId: session.user?.id,
      read: false,
    },
    data: {
      read: true,
      readAt: new Date(),
    },
  });

  const otherUserId =
    chat?.userOneId === session.user.id ? chat.userTwoId : chat?.userOneId;

  await pusher.trigger(`user_${otherUserId}`, "unread-update", {
    connectionId: session.user.id,
  });

  return NextResponse.json({ success: true });
}
