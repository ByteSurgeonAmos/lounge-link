import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const BlogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = BlogSchema.parse(body);

    const blog = await prisma.blog.create({
      data: validatedData,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
