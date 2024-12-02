import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/authConfig";
import { prisma } from "@/lib/db";
import { z } from "zod";

const CommentSchema = z.object({
  content: z.string().min(1),
});

const paramsSchema = z.object({
  id: z.string(),
});

export async function GET(request: Request, context: { params: any }) {
  try {
    const params = await context.params;
    const validatedParams = paramsSchema.safeParse(params);

    if (!validatedParams.success) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: validatedParams.data.id },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, context: { params: any }) {
  try {
    const params = await context.params;
    const validatedParams = paramsSchema.safeParse(params);

    if (!validatedParams.success) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const { content } = CommentSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Use a transaction for atomicity
    const [comment] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          content,
          postId: validatedParams.data.id,
          authorId: user.id,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.post.update({
        where: { id: validatedParams.data.id },
        data: { comments: { increment: 1 } },
      }),
    ]);

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Failed to create comment:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid comment data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
