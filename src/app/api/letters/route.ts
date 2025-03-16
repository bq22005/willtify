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