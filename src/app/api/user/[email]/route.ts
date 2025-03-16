import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: params.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user ID", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}