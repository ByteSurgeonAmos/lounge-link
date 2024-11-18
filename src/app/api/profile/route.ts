import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for profile update
const ProfileUpdateSchema = z
  .object({
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    username: z.string().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    quote: z.string().nullable().optional(),
    designation: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    personalInterests: z.array(z.string()).optional(),
    topSkills: z.array(z.string()).optional(),
    linkPreferences: z.array(z.string()).optional(),
    lookingFor: z.array(z.string()).optional(),
    topInterests: z.array(z.string()).optional(),
    currentProjects: z.array(z.string()).optional(),
  })
  .partial();

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = ProfileUpdateSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email },
      data: validatedData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        phoneNumber: true,
        avatar: true,
        bio: true,
        quote: true,
        designation: true,
        country: true,
        city: true,
        personalInterests: true,
        topSkills: true,
        linkPreferences: true,
        lookingFor: true,
        topInterests: true,
        currentProjects: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
