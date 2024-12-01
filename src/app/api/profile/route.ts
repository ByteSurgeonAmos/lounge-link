import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/authConfig";
import { prisma } from "@/lib/db";
import { z } from "zod";

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
    personalInterests: z.array(z.string()).default([]),
    topSkills: z.array(z.string()).default([]),
    linkPreferences: z.array(z.string()).default([]), // Changed from preferences
    lookingFor: z.array(z.string()).default([]),
    topInterests: z.array(z.string()).default([]),
    currentProjects: z.array(z.string()).default([]),
    isProfileComplete: z.boolean().default(false),
  })
  .passthrough()
  .partial(); // Allow additional fields

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
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
        isProfileComplete: true,
        subscriptionTier: true,
        isVerified: true,
        isPhoneVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

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
      data: {
        ...validatedData,
        username: validatedData.username ?? undefined,
        firstName: validatedData.firstName ?? undefined,
        lastName: validatedData.lastName ?? undefined,
        phoneNumber: validatedData.phoneNumber ?? undefined,
        avatar: validatedData.avatar ?? undefined,
        bio: validatedData.bio ?? undefined,
        quote: validatedData.quote ?? undefined,
        designation: validatedData.designation ?? undefined,
        country: validatedData.country ?? undefined,
        city: validatedData.city ?? undefined,
      },
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
        isProfileComplete: true,
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
