import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "すべての項目を入力してください" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username }});
    if (!user || !user.password) {
      return NextResponse.json({ error: "ユーザ名またはパスワードが異なります" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "ユーザ名またはパスワードが異なります" }, { status: 400})
    }

    return NextResponse.json({ message: "ログイン成功" }, { status: 200 });
  } catch (error) {
    console.error("Signin Error", error);
    return NextResponse.json({ error: "サーバエラーが発生しました" }, { status: 500 });
  }
}