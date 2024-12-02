import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/authConfig";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user's ID and their connections
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          NOT: [
            { email: session.user.email },
            {
              receivedConnections: {
                some: { connectorId: currentUser!.id },
              },
            },
            {
              sentConnections: {
                some: { connectedId: currentUser!.id },
              },
            },
          ],
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          designation: true,
          city: true,
          country: true,
          avatar: true,
          backgroundImage: true,
          bio: true,
          quote: true,
          personalInterests: true,
          currentProjects: true,
          topSkills: true,
          lookingFor: true,
          linkPreferences: true,
          badges: {
            select: { name: true },
          },
          collaborations: {
            select: { name: true, avatar: true },
          },
          endorsements: {
            select: {
              description: true,
              giver: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true,
                },
              },
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({
        where: {
          NOT: { email: session.user.email },
        },
      }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Discover users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
