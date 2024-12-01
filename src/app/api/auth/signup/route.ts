import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const {
      firstName,
      lastName,
      jobTitle,
      phone,
      confirmPassword,
      email,
      password,
      username,
    } = body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !jobTitle ||
      !username
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const usernameExists = await prisma.user.findFirst({
      where: { username },
    });

    if (usernameExists) {
      return NextResponse.json(
        { message: "Username is already taken!" },
        { status: 400 }
      );
    }
    const phoneExists = await prisma.user.findFirst({
      where: { phoneNumber: phone },
    });

    if (phoneExists) {
      return NextResponse.json(
        { message: "Phone Number is already used!" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber: phone,
        designation: jobTitle,
        username,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
