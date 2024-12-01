import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/authConfig";
import { z } from "zod";

const LiveLinkSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  date: z.string().transform((str) => new Date(str)),
  location: z.string().optional(),
  maxAttendees: z.number().optional(),
  isPublic: z.boolean().default(false),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { subscriptionTier: true, id: true },
    });

    if (!user || user.subscriptionTier === "FREE") {
      return NextResponse.json(
        { error: "Premium subscription required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = LiveLinkSchema.parse(body);

    const liveLink = await prisma.liveLink.create({
      data: {
        ...validatedData,
        authorId: user.id,
      },
    });

    return NextResponse.json(liveLink);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create LiveLink" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const liveLinks = await prisma.liveLink.findMany({
      where: {
        OR: [{ isPublic: true }, { author: { email: session.user.email } }],
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
      orderBy: { date: "asc" },
    });

    return NextResponse.json(liveLinks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch LiveLinks" },
      { status: 500 }
    );
  }
}
