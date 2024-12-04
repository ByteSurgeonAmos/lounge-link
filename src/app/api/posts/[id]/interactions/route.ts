import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/authConfig";
import { prisma } from "@/lib/db";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string(),
});

const actionSchema = z.object({
  action: z.enum(["like", "repost"]),
});

export async function POST(request: Request, context: { params: any }) {
  try {
    const params = await context.params;
    if (!params?.id) {
      return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
    }

    const validatedParams = paramsSchema.safeParse(params);
    if (!validatedParams.success) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedBody = actionSchema.safeParse(body);
    if (!validatedBody.success) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const { action } = validatedBody.data;

    const [user, post] = await Promise.all([
      prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      }),
      prisma.post.findUnique({
        where: { id: params.id },
        select: {
          id: true,
          likes: true,
          reposts: true,
          likedBy: {
            where: { email: session.user.email },
            select: { id: true },
          },
          repostedBy: {
            where: { email: session.user.email },
            select: { id: true },
          },
        },
      }),
    ]);

    if (!user || !post) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    const isCurrentlyInteracted =
      action === "like" ? post.likedBy.length > 0 : post.repostedBy.length > 0;

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        [action === "like" ? "likedBy" : "repostedBy"]: {
          [isCurrentlyInteracted ? "disconnect" : "connect"]: { id: user.id },
        },
        [action === "like" ? "likes" : "reposts"]: {
          [isCurrentlyInteracted ? "decrement" : "increment"]: 1,
        },
      },
      select: {
        likes: true,
        reposts: true,
      },
    });

    return NextResponse.json({
      ...updatedPost,
      isLiked: action === "like" ? !isCurrentlyInteracted : false,
      isReposted: action === "repost" ? !isCurrentlyInteracted : false,
    });
  } catch (error) {
    console.error("Interaction error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process interaction";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
