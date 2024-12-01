import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authConfig";
import { z } from "zod";
import type { FeedPost } from "@/types/feed";
import { prisma } from "@/lib/db";

const PostCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string().optional(),
  mentions: z.array(z.string()).default([]),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            designation: true,
            city: true,
            country: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const formattedPosts: FeedPost[] = posts.map((post) => ({
      id: post.id,
      blogProfile: {
        profilePic: post.author.avatar || "/api/placeholder/48/48",
        name: `${post.author.firstName || ""} ${
          post.author.lastName || ""
        }`.trim(),
        jobTitle: post.author.designation || "",
        location: [post.author.city, post.author.country]
          .filter(Boolean)
          .join(", "),
        email: post.author.email || "",
      },
      user: {
        avatar: post.author.avatar || "/api/placeholder/24/24",
      },
      title: post.title,
      content: post.content,
      image: post.image || undefined,
      mentions: post.mentions,
      timestamp: post.createdAt,
      likes: post.likes,
      comments: post.comments,
      reposts: post.reposts,
      shares: post.shares,
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Feed fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = PostCreateSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        ...validatedData,
        authorId: user.id,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            designation: true,
            city: true,
            country: true,
            email: true,
          },
        },
      },
    });

    const formattedPost: FeedPost = {
      id: post.id,
      blogProfile: {
        profilePic: post.author.avatar || "/api/placeholder/48/48",
        name: `${post.author.firstName || ""} ${
          post.author.lastName || ""
        }`.trim(),
        jobTitle: post.author.designation || "",
        location: [post.author.city, post.author.country]
          .filter(Boolean)
          .join(", "),
        email: post.author.email || "",
      },
      user: {
        avatar: post.author.avatar || "/api/placeholder/24/24",
      },
      title: post.title,
      content: post.content,
      image: post.image || undefined,
      mentions: post.mentions,
      timestamp: post.createdAt,
      likes: 0,
      comments: 0,
      reposts: 0,
      shares: 0,
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid post data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Post creation error:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
