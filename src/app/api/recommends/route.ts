import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.name) return NextResponse.json([], { status: 401 });

  try {
    const letters = await prisma.letter.findMany({
      include: {
        auther: { select: { id: true, username: true, icon: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      letters.map(letter => ({
        id: letter.id,
        auther: letter.auther,
        content: letter.content,
        notifyAt: letter.notifyAt.toISOString().split("T")[0],
      }))
    );
  } catch (error) {
    console.error("Failed to fetch letters", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}