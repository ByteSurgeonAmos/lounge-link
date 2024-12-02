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
    include: {
      sentConnections: {
        include: { connected: true },
      },
      receivedConnections: {
        include: { connector: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const connections = [
    ...user.sentConnections.map((conn) => ({
      ...conn,
      user: conn.connected,
      type: "sent",
    })),
    ...user.receivedConnections.map((conn) => ({
      ...conn,
      user: conn.connector,
      type: "received",
    })),
  ];

  return NextResponse.json(connections);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { connectedId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingConnection = await prisma.userConnection.findUnique({
    where: {
      connectorId_connectedId: {
        connectorId: user.id,
        connectedId,
      },
    },
  });

  if (existingConnection) {
    return NextResponse.json(
      { error: "Connection already exists" },
      { status: 400 }
    );
  }

  const newConnection = await prisma.userConnection.create({
    data: {
      connectorId: user.id,
      connectedId,
    },
  });

  return NextResponse.json(newConnection);
}
