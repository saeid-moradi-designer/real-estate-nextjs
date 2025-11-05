import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

  return NextResponse.json({ user: user ? { id: user.id, name: user.name } : null });
}
