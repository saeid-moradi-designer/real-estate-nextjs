"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 mt-10">
      <div className="max-w-screen-xl mx-auto p-6 md:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* 🔹 لوگو و توضیح */}
          <div>
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse mb-4"
            >
              <Image
                src="/images/logo-gold.svg"
                alt="لوگو"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              ارائه‌دهنده بهترین خدمات خرید، فروش و اجاره املاک در تهران
            </p>
          </div>

          {/* 🔹 لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              لینک‌های سریع
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">
                  خانه
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-blue-500 transition">
                  املاک
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500 transition">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* 🔹 اطلاعات تماس */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              تماس با ما
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500" />
                <span>۰۹۱۲۱۲۳۴۵۶۷</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                <span>info@ahmadiestate.ir</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                <span>تهران، خیابان ولیعصر</span>
              </li>
            </ul>
          </div>

          {/* 🔹 شبکه‌های اجتماعی */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              دنبال کنید
            </h3>
            <div className="flex gap-4 text-gray-400">
              <Link href="#" className="hover:text-blue-600 transition">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition">
                <Instagram />
              </Link>
              <Link href="#" className="hover:text-sky-400 transition">
                <Twitter />
              </Link>
            </div>
          </div>
        </div>

        {/* 🔹 کپی‌رایت */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-500 flex justify-center">
          <p className="flex flex-col sm:flex-row items-center gap-2 text-center">
            <span>
              © {new Date().getFullYear()} تمامی حقوق محفوظ است | طراحی توسط{" "}
            </span>
            <span className="bg-blue-600 text-white font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-blue-700 transition">
              SaeidWeb@
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
