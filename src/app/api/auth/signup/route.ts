import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: "すべての項目を入力してください" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "このメールアドレスは既に使用されています" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        provider: "credentials",
      },
    });

    return NextResponse.json({ message: "サインアップに成功しました" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error", error);
    return NextResponse.json({ error: "サーバエラーが発生しました" }, { status: 500 });
  }
}