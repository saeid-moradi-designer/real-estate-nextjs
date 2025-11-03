"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Users, Lightbulb, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <section className="relative h-[350px] w-full">
        <Image
          src="/images/khan-banner.jpg"
          alt="درباره سامانه خان"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
          <h1 className="text-4xl font-bold mb-3">درباره سامانه خان</h1>
          <p className="text-lg max-w-2xl">
            پلتفرمی برای آگاهی، انتخاب هوشمند و خرید مطمئن در بازار املاک ایران
          </p>
        </div>
      </section>

      {/* ✅ About Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              ما چه هدفی داریم؟
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              «خان» با هدف ساده‌سازی فرایند خرید، فروش و سرمایه‌گذاری در حوزه
              املاک طراحی شده است. ما اعتقاد داریم آگاهی، مهم‌ترین گام در تصمیمات
              مالی است. به همین دلیل، تلاش می‌کنیم اطلاعات دقیق، آموزش‌های
              کاربردی و تحلیل‌های روز بازار مسکن را در اختیار شما قرار دهیم.
            </p>
            <p className="text-gray-700 leading-relaxed">
              چه به دنبال خانه‌ای برای زندگی باشید، چه قصد سرمایه‌گذاری در ملک
              داشته باشید، «خان» همراه مطمئن شماست.
            </p>
          </div>

          <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/building2.png"
              alt="تیم سامانه خان"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ✅ Mission / Values Section */}
      <section className="bg-white py-16 border-y">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10 text-gray-800">
            مأموریت ما در سامانه <span className="text-blue-600">خان</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building2,
                title: "بازار شفاف املاک",
                desc: "نمایش دقیق اطلاعات و قیمت‌ها برای تصمیم‌گیری آگاهانه.",
              },
              {
                icon: Users,
                title: "ارتباط با مشاوران حرفه‌ای",
                desc: "امکان گفت‌وگو و دریافت مشاوره از کارشناسان معتبر.",
              },
              {
                icon: Lightbulb,
                title: "آموزش و آگاهی",
                desc: "پست‌ها و ویدیوهای آموزشی برای خریداران و فروشندگان.",
              },
              {
                icon: Phone,
                title: "پشتیبانی سریع",
                desc: "در هر لحظه آماده پاسخ‌گویی به کاربران هستیم.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-md transition"
              >
                <Icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="py-14 text-center bg-blue-600 text-white">
        <h3 className="text-2xl font-bold mb-4">
          آماده‌ای با «خان» ملک دلخواهت را پیدا کنی؟
        </h3>
        <p className="opacity-90 mb-6">
          از پست‌های آموزشی و لیست املاک ما دیدن کن و با کارشناسان در تماس باش.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/listings"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            مشاهده املاک
          </Link>
          <Link
            href="/contact"
            className="bg-blue-500 border border-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </main>
  );
}
