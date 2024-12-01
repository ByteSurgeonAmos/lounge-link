import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/authConfig";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
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
          select: {
            name: true,
          },
        },
        collaborations: {
          select: {
            name: true,
            avatar: true,
          },
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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
