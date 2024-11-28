"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authConfig";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      firstName: true,
      lastName: true,
      email: true,
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
}
