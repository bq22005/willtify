import { auth, signIn } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "すべての項目を入力してください" }, { status: 400 });
    }

    let result;

    try {
      result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
  
      console.log(`result: ${result}`);
  
      if (!result || result.error) {
        console.error("認証エラー", result?.error);
        return NextResponse.json({ error: "ユーザ名またはパスワードが異なります" }, { status: 400 });
      }
    } catch (authError) {
      console.error("signIn 実行時のエラー", authError);
      return NextResponse.json({ error: "ユーザ名またはパスワードが異なります" }, { status: 400 });
    }

    const session = await auth();

    return NextResponse.json({
      message: "ログイン成功",
      session,
    }, { status: 200 });
    
  } catch (error) {
    console.error("Signin Error", error);
    return NextResponse.json({ error: "サーバエラーが発生しました" }, { status: 500 });
  }
}