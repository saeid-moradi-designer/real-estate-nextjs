import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let post = null;
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

    // 🔹 گرفتن پست از دیتابیس همراه با اطلاعات نویسنده
    post = await prisma.post.findUnique({
      where: { id: parsedId },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    error = "خطا در بارگذاری اطلاعات";
  }

  if (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-red-600 font-semibold">
        {error}
      </main>
    );
  }

  if (!post) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600 font-semibold">
        پستی با این شناسه پیدا نشد.
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center mt-10 px-4 grow w-full">
      {/* 🔹 دکمه بازگشت */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        <ChevronLeft className="w-4 h-4 ml-1" />
        بازگشت به مقالات
      </Link>

      {/* 🔹 تصویر پست */}
      {post.imageUrl ? (
        <div className="relative w-full max-w-3xl h-72 sm:h-96 rounded-xl overflow-hidden shadow-md mb-8">
          <Image
            src={"/images/" + post.imageUrl}
            alt={post.title || "پست"}
            fill
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <div className="w-full max-w-3xl h-72 sm:h-96 rounded-xl overflow-hidden shadow-md mb-8 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">بدون تصویر</span>
        </div>
      )}

      {/* 🔹 محتوای پست */}
      <article className="max-w-3xl w-full bg-white border border-gray-200 rounded-2xl shadow p-6 leading-relaxed">
        <h1 className="text-2xl font-bold mb-4">{post.title || "بدون عنوان"}</h1>

        {/* ✅ نمایش محتوای متنی */}
        {post.content && (
          <p className="text-gray-700 whitespace-pre-line mb-6">
            {post.content}
          </p>
        )}

        {/* ✅ نمایش ویدیو آپارات اگر موجود بود */}
        {post.embedCode && (
          <div
            className="my-8"
            dangerouslySetInnerHTML={{ __html: post.embedCode }}
          />
        )}

        {/* ✅ اگر فقط لینک ویدیو ساده بود */}
        {!post.embedCode && post.videoUrl && (
          <video
            src={post.videoUrl}
            controls
            className="my-8 rounded-lg shadow-md w-full"
          />
        )}

        {/* 🔹 نویسنده */}
        <div className="mt-8 border-t pt-4 text-sm text-gray-600">
          <h2 className="font-semibold mb-1">نویسنده:</h2>
          <p>{post.author?.name || "نامشخص"}</p>
          <p className="text-gray-500">{post.author?.email || "-"}</p>
        </div>

        {/* 🔹 تاریخ انتشار */}
        <p className="text-xs text-gray-400 mt-4">
          منتشر شده در تاریخ{" "}
          {new Date(post.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </article>
    </main>
  );
}
