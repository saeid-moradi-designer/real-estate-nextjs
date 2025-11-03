"use client";

import { Phone, Mail, MapPin, Send } from "lucide-react";
import { SocialIcon } from "react-social-icons";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🔹 هدر زیبا */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-10" />
        <h1 className="text-4xl font-bold relative z-10">تماس با ما</h1>
        <p className="mt-3 text-gray-300 relative z-10">
          با ما در ارتباط باشید — ما در سامانه <span className="text-yellow-500">خان</span> آماده پاسخگویی به شما هستیم.
        </p>
      </section>

      {/* 🔹 بخش تماس */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* فرم تماس */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            ارسال پیام
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام شما</label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                placeholder="نام خود را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
              <input
                type="email"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                placeholder="ایمیل شما"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">پیام</label>
              <textarea
                rows={5}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition resize-none"
                placeholder="متن پیام شما..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition"
            >
              <Send size={18} />
              ارسال پیام
            </button>
          </form>
        </div>

        {/* اطلاعات تماس و نقشه */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
              اطلاعات تماس
            </h2>

            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <Phone className="text-yellow-500" />
                <span>۰۹۰۲۰۰۷۹۱۰۱</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-yellow-500" />
                <span>Mehrabahmadifabilsara@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-yellow-500" />
                <span>تهران، جمهوری</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              شبکه‌های اجتماعی
            </h3>
            <div className="flex gap-4">
              <SocialIcon
                url="https://whatsapp.com/channel/0029Vb6IPL8IyPtK5CV1or07"
                bgColor="#25D366"
                style={{ height: 45, width: 45 }}
              />
              <SocialIcon
                url="https://t.me/Khan_RealEstate_CustomersClub"
                bgColor="#0088cc"
                style={{ height: 45, width: 45 }}
              />
              <SocialIcon
                url="https://instagram.com"
                bgColor="#E1306C"
                style={{ height: 45, width: 45 }}
              />
            </div>
          </div>

          {/* نقشه گوگل (می‌تونی iframe اختصاصی خودت رو بذاری) */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src="https://www.google.com/maps?q=Tehran,+Iran&output=embed"
              width="100%"
              height="250"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
