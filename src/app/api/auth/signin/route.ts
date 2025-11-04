import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "تمام فیلدها الزامی است" }, { status: 400 });
    }

    // چک کن کاربر وجود داره؟
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است ❌" }, { status: 401 });
    }

    // مقایسه رمز عبور
    const isValid = await bcrypt.compare(password, user.password || "");
    if (!isValid) {
      return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است ❌" }, { status: 401 });
    }

    // اگر درست بود
    return NextResponse.json({ success: true, message: "ورود موفق ✅" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "خطا در سرور" }, { status: 500 });
  }
}
