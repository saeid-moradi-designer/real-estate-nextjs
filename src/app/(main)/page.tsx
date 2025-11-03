"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "نکات طلایی خرید ملک در تهران",
    content: "قبل از خرید ملک باید به چند نکته مهم توجه کنید که...",
    imageUrl: "/images/slide3.jpg",
    createdAt: "2025-11-02",
  },
  {
    id: 2,
    title: "چطور بهترین قیمت را برای خانه بگیریم؟",
    content: "در این مقاله راه‌های افزایش ارزش ملک را بررسی می‌کنیم...",
    imageUrl: "/images/slide2.jpg",
    createdAt: "2025-11-01",
  },
  {
    id: 3,
    title: "راهنمای وام مسکن برای خریداران جدید",
    content: "اگر تازه قصد خرید خانه دارید، این ویدیو را از دست ندهید.",
    videoUrl: "https://www.aparat.com/v/xyz456",
    createdAt: "2025-10-30",
  },
];

export default function HomePage() {
  // ✅ تنظیم Carousel با راست‌به‌چپ و Autoplay
  const [emblaRef] = useEmblaCarousel(
    { loop: true, direction: "rtl" },
    [Autoplay({ delay: 3000 })]
  );

  const slides = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ✅ Hero section (Carousel) */}
      <section className="relative w-full overflow-hidden border-b" ref={emblaRef}>
        <div className="embla__container flex" dir="rtl">
          {slides.map((src, i) => (
            <div
              key={i}
              className="embla__slide flex-[0_0_100%] relative h-[400px]"
              style={{ minWidth: "100%" }}
            >
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover brightness-75"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Posts grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
          جدیدترین پست‌ها
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative h-56 w-full overflow-hidden">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : post.videoUrl ? (
                  <div className="relative h-full flex items-center justify-center bg-gray-900">
                    <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                ) : (
                  <div className="bg-gray-200 h-full" />
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.content}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ CTA section */}
      <section className="bg-blue-50 py-10 text-center">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          به دنبال ملک دلخواهت هستی؟
        </h3>
        <p className="text-gray-600 mb-6">
          لیست کامل املاک ثبت‌شده را مشاهده کن و با چند کلیک فیلتر کن.
        </p>
        <Link
          href="/listings"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          مشاهده املاک
        </Link>
      </section>
    </main>
  );
}
