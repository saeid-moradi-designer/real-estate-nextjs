import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const propertyId = parseInt(id);

        if (isNaN(propertyId)) {
            return NextResponse.json({ error: "شناسه ملک نامعتبر است" }, { status: 400 });
        }

        const property = await prisma.property.findUnique({
            where: { id: propertyId },
        });

        if (!property) {
            return NextResponse.json({ error: "ملک با این شناسه پیدا نشد" }, { status: 404 });
        }

        return NextResponse.json(property);
    } catch (err: any) {
        console.error("GET /api/properties/[id] error:", err);
        return NextResponse.json({ error: "خطا در اتصال به دیتابیس" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const propertyId = parseInt(id);
        if (isNaN(propertyId)) {
            return NextResponse.json({ error: "شناسه ملک نامعتبر است" }, { status: 400 });
        }

        const updated = await prisma.property.update({
            where: { id: propertyId },
            data: body,
        });

        return NextResponse.json(updated);
    } catch (err: any) {
        console.error("PUT /api/properties/[id] error:", err);

        if (err.code === 'P2025') {
            return NextResponse.json({ error: "ملک با این شناسه پیدا نشد" }, { status: 404 });
        }

        return NextResponse.json({ error: "خطا در بروزرسانی ملک" }, { status: 500 });
    }
}