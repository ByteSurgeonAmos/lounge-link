import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const people = await prisma.user.findMany({
    where: {
      id: { not: user.id },
      OR: [
        { personalInterests: { hasSome: user.personalInterests } },
        { topSkills: { hasSome: user.topSkills } },
        { linkPreferences: { hasSome: user.linkPreferences } },
        { lookingFor: { hasSome: user.lookingFor } },
        { topInterests: { hasSome: user.topInterests } },
      ],
    },
    take: 10,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      avatar: true,
      designation: true,
      country: true,
      city: true,
    },
  });

  return NextResponse.json(people);
}
