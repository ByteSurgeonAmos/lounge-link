import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { z } from "zod";

// Define the message schema using Zod
const messageSchema = z.object({
  content: z.string().min(1), // Content must be a non-empty string
  chatId: z.string(), // Chat ID must be a string
});

// Handle POST requests to /api/messages
export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    console.log("Incoming body:", body); // Log the incoming request body for debugging

    // Validate the request body against the schema
    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request body", issues: result.error.errors },
        { status: 400 }
      );
    }

    const { content, chatId } = result.data; // Destructure validated data

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new message in the database
    const message = await prisma.message.create({
      data: {
        content,
        chatId,
        senderId: user.id,
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
      },
    });

    // Trigger a Pusher event to notify clients of the new message
    await pusherServer.trigger(`chat_${chatId}`, "new-message", message);

    // Return the created message as a response
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error in POST /api/messages:", error); // Log any errors that occur
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
