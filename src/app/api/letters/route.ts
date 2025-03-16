import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createLetter } from "@/app/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.name) return NextResponse.json([], { status: 401 });

  try {
    const letters = await prisma.letter.findMany({
      where: {
        auther: { username: session.user.name },
      },
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received body:", body);

    const { autherId, content, notifyAt } = body;
    if (!autherId || !content || !notifyAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newLetter = await createLetter(Number(autherId), content, new Date(notifyAt));
    
    if (!newLetter) {
      console.error("Failed to create letter in database.");
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    console.log("Letter successfully saved:", newLetter);
    return NextResponse.json(newLetter, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/letters:", error);
    return NextResponse.json({ error: "Failed to create letter"}, { status: 500 });
  }
}