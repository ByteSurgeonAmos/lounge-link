import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { pusherServer as pusher } from "@/lib/pusher";
import { z } from "zod";

export const dynamic = "force-dynamic";

const messageSchema = z.object({
  content: z.string().min(1),
  chatId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request body", issues: result.error.errors },
        { status: 400 }
      );
    }

    const { content, chatId } = result.data;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // First get the chat to determine recipient
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      select: { userOneId: true, userTwoId: true },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Determine the recipient ID (the other user in the chat)
    const recipientId =
      chat.userOneId === user.id ? chat.userTwoId : chat.userOneId;

    const message = await prisma.message.create({
      data: {
        content,
        chat: { connect: { id: chatId } },
        sender: { connect: { id: user.id } },
        recipient: { connect: { id: recipientId } },
        read: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        chat: {
          select: {
            userOneId: true,
            userTwoId: true,
          },
        },
      },
    });

    await pusher.trigger(`chat_${chatId}`, "new-message", message);
    await pusher.trigger(`user_${recipientId}`, "unread-update", {
      connectionId: user.id,
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error in POST /api/messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
