"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "صفحه‌اصلی", href: "/" },
  { label: "املاک", href: "/listings" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 top-0 start-0  bg-gray-900 text-white">
      <nav className="max-w-screen-xl h-16 flex flex-wrap items-center justify-between mx-auto px-4">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-gold.svg"
            alt="لوگو"
            width={40}
            height={40}
            priority
            className="w-auto h-10 object-contain"
          />
          
        </Link>

        {/* دکمه‌های سمت راست */}
        <div className="flex items-center gap-2 md:order-2">
          <Link href="/signin">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ورود
            </button>
          </Link>

          {/* دکمه همبرگری */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-400 rounded-lg 
            md:hidden hover:bg-gray-800 focus:outline-none  focus:ring-gray-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* منوی دسکتاپ */}
        <div
          className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:gap-8 font-medium mt-4 md:mt-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 rounded-sm hover:text-blue-500 
                    md:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* منوی موبایل */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed top-[64px] left-0 right-0 z-40 bg-gray-900"
        >
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-sm hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
