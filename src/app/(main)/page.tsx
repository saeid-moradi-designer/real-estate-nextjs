"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Home, Video, FileText, Users } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
  category?: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "نکات طلایی خرید ملک در تهران",
    content: "قبل از خرید ملک باید به چند نکته مهم توجه کنید که...",
    imageUrl: "/images/slide3.jpg",
    category: "راهنمای خرید",
    createdAt: "2025-11-02",
  },
  {
    id: 2,
    title: "چطور بهترین قیمت را برای خانه بگیریم؟",
    content: "در این مقاله راه‌های افزایش ارزش ملک را بررسی می‌کنیم...",
    imageUrl: "/images/slide2.jpg",
    category: "فروش",
    createdAt: "2025-11-01",
  },
  {
    id: 3,
    title: "راهنمای وام مسکن برای خریداران جدید",
    content: "اگر تازه قصد خرید خانه دارید، این ویدیو را از دست ندهید.",
    videoUrl: "https://www.aparat.com/v/xyz456",
    category: "وام و سرمایه‌گذاری",
    createdAt: "2025-10-30",
  },
];

export default function HomePage() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, direction: "rtl" },
    [Autoplay({ delay: 4000 })]
  );

  const slides = [
    {
      src: "/images/slide1.jpg",
      title: "با «خان» خانه رؤیایی‌ات را پیدا کن",
      subtitle: "پست‌ها و راهنمایی‌های تخصصی برای خریداران و فروشندگان",
    },
    {
      src: "/images/slide2.jpg",
      title: "پست‌های آموزشی و تحلیلی بازار ملک",
      subtitle: "تازه‌ترین تحلیل‌ها از بازار مسکن ایران",
    },
    {
      src: "/images/slide3.jpg",
      title: "ویدیوهای آموزشی و مصاحبه‌های اختصاصی",
      subtitle: "از کارشناسان املاک یاد بگیر",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ✅ Hero Slider */}
      <section className="relative w-full overflow-hidden border-b" ref={emblaRef}>
        <div className="embla__container flex" dir="rtl">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="embla__slide flex-[0_0_100%] relative h-[500px]"
              style={{ minWidth: "100%" }}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover brightness-75"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ About Section */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          سامانه <span className="text-blue-600">خان</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          «خان» پلتفرمی مدرن برای اشتراک‌گذاری پست‌های آموزشی، ویدیوها و اخبار
          حوزه املاک است. هدف ما این است که مسیر خرید، فروش و سرمایه‌گذاری در ملک
          را برای کاربران ساده‌تر و آگاهانه‌تر کنیم.
        </p>
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
                <span className="text-xs text-blue-600 font-semibold">
                  {post.category}
                </span>
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

      {/* ✅ Features Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">
            چرا سامانه <span className="text-blue-600">خان</span>؟
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, text: "جدیدترین املاک روز" },
              { icon: FileText, text: "مقالات و تحلیل‌های تخصصی" },
              { icon: Video, text: "ویدیوهای آموزشی و مشاوره‌ای" },
              { icon: Users, text: "ارتباط با کارشناسان حرفه‌ای" },
            ].map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
              >
                <Icon className="w-10 h-10 text-blue-600 mb-3" />
                <p className="font-medium text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="bg-blue-600 py-10 text-center text-white">
        <h3 className="text-2xl font-bold mb-3">
          به دنبال ملک دلخواهت هستی؟
        </h3>
        <p className="opacity-90 mb-6">
          لیست کامل املاک را مشاهده کن و با چند کلیک فیلتر کن.
        </p>
        <Link
          href="/listings"
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          مشاهده املاک
        </Link>
      </section>
    </main>
  );
}
