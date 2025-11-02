import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function ListingPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    let listing = null;
    let error = null;

    try {
        const { id } = await params;
        const parsedId = parseInt(id?.trim(), 10);
        
        if (isNaN(parsedId)) {
            return (
                <main className="flex flex-col items-center justify-center min-h-[60vh] text-red-600 font-semibold">
                    شناسه نامعتبر است.
                </main>
            );
        }

        // 🔹 گرفتن ملک از دیتابیس همراه با اطلاعات مالک
        listing = await prisma.property.findUnique({
            where: { id: parsedId }, // اصلاح: استفاده از parsedId به جای id
            include: {
                owner: {
                    select: { name: true, email: true },
                },
            },
        });
    } catch (err) {
        console.error("Error fetching listing:", err);
        error = "خطا در بارگذاری اطلاعات";
    }

    if (error) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[60vh] text-red-600 font-semibold">
                {error}
            </main>
        );
    }

    if (!listing) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600 font-semibold">
                ملکی با این شناسه پیدا نشد.
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center mt-10 px-4 grow w-full">
            {/* 🔹 دکمه بازگشت */}
            <Link
                href="/listings"
                className="inline-flex items-center text-blue-600 hover:underline mb-6"
            >
                <ChevronLeft className="w-4 h-4 ml-1" />
                بازگشت به لیست آگهی‌ها
            </Link>

            {/* 🔹 تصویر اصلی ملک */}
            {listing.images && listing.images.length > 0 ? (
                <div className="relative w-full max-w-3xl h-72 sm:h-96 rounded-xl overflow-hidden shadow-md mb-8 bg-amber-400">
                    <Image
                        src={`/images/${listing.images[0]}`}
                        alt={listing.title || "ملک"}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                </div>
            ) : (
                <div className="w-full max-w-3xl h-72 sm:h-96 rounded-xl overflow-hidden shadow-md mb-8 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">بدون تصویر</span>
                </div>
            )}

            {/* 🔹 اطلاعات اصلی ملک */}
            <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold mb-3">{listing.title || "بدون عنوان"}</h1>
                <p className="text-gray-700 mb-4">{listing.description || "بدون توضیحات"}</p>

                {/* 🔹 جزئیات ملک */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700 mb-6">
                    <p>🏠 نوع ملک: <span className="font-semibold">{listing.propertyType || "-"}</span></p>
                    <p>💰 نوع معامله: <span className="font-semibold">{listing.dealType || "-"}</span></p>
                    <p>📏 متراژ: <span className="font-semibold">{listing.area ? `${listing.area} متر` : "-"}</span></p>
                    <p>🛏️ اتاق‌ها: <span className="font-semibold">{listing.roomCount ?? "-"}</span></p>
                    <p>🚿 سرویس‌ها: <span className="font-semibold">{listing.bathroomCount ?? "-"}</span></p>
                    <p>🏢 طبقه: <span className="font-semibold">{listing.floor ?? "-"}</span></p>
                </div>

                {/* 🔹 امکانات */}
                <div className="border-t pt-4 text-sm text-gray-700">
                    <h2 className="font-semibold mb-2">امکانات:</h2>
                    <ul className="list-disc pr-5 space-y-1">
                        {listing.parking && <li>پارکینگ</li>}
                        {listing.elevator && <li>آسانسور</li>}
                        {listing.storage && <li>انباری</li>}
                        {listing.furnished && <li>مبله</li>}
                        {!listing.parking && !listing.elevator && !listing.storage && !listing.furnished && (
                            <li className="text-gray-400">امکانات خاصی ثبت نشده است.</li>
                        )}
                    </ul>
                </div>

                {/* 🔹 قیمت */}
                <div className="mt-6 border-t pt-4">
                    {listing.dealType === "فروش" && listing.price && (
                        <p className="text-lg font-semibold text-blue-600">
                            قیمت: {listing.price.toLocaleString()} تومان
                        </p>
                    )}
                    {listing.dealType === "اجاره" && (
                        <p className="text-lg font-semibold text-blue-600">
                            رهن: {listing.depositPrice?.toLocaleString() ?? "-"} تومان /
                            اجاره: {listing.rentPrice?.toLocaleString() ?? "-"} تومان
                        </p>
                    )}
                    {listing.dealType === "رهن کامل" && listing.depositPrice && (
                        <p className="text-lg font-semibold text-blue-600">
                            رهن کامل: {listing.depositPrice.toLocaleString()} تومان
                        </p>
                    )}
                </div>

                {/* 🔹 اطلاعات مالک */}
                <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                    <h2 className="font-semibold mb-1">مشخصات مالک:</h2>
                    <p>{listing.owner?.name || "نامشخص"}</p>
                    <p className="text-gray-500">{listing.owner?.email || "-"}</p>
                </div>

                {/* 🔹 تاریخ ثبت */}
                <p className="text-xs text-gray-400 mt-4">
                    ثبت شده در تاریخ {new Date(listing.createdAt).toLocaleDateString("fa-IR")}
                </p>
            </div>
        </main>
    );
}