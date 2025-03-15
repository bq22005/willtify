import { NextRequest, NextResponse } from "next/server";
import { fetchLetters, createLetter } from "@/app/lib/prisma";

export async function GET() {
  try {
    const letters = await fetchLetters();
    return NextResponse.json(letters, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch letters" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { autherId, content, notifyAt } = await req.json();
    if (!autherId || !content || !notifyAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newLetter = await createLetter(Number(autherId), content, new Date(notifyAt));
    return NextResponse.json(newLetter, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create letter"}, { status: 500 });
  }
}