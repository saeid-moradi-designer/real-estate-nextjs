"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";


interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "صفحه‌اصلی", href: "/" },
  { label: "املاک", href: "/listings" },
  { label: "مقالات", href: "/posts" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const userName = session?.user?.name || null;

  return (
      <header className="fixed w-full z-50 top-0 start-0 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 shadow-sm">
        <nav className="max-w-7xl h-20 flex items-center justify-between mx-auto px-4">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
                src="/images/logo-gold.svg"
                alt="لوگو خان"
                width={100}
                height={100}
                priority
                className="w-23 h-23 object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* منوی دسکتاپ */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 font-medium">
              {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`text-gray-200 hover:text-[#FEC360] transition-colors duration-200 relative py-2 group ${
                            pathname === link.href ? "text-[#FEC360]" : ""
                        }`}
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FEC360] transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  </li>
              ))}
            </ul>

            {/* نمایش نام کاربر یا دکمه ورود */}
            {userName ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-200 font-medium">سلام، {userName}</span>
                  <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl px-4 py-2 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </div>
            ) : (
                <Link href="/signin">
                  <button
                      type="button"
                      className="flex items-center gap-2 bg-[#FEC360] hover:bg-[#fed27a] text-gray-900 font-semibold rounded-xl px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <User className="w-4 h-4" />
                    ورود به حساب
                  </button>
                </Link>
            )}
          </div>

          {/* دکمه همبرگری موبایل */}
          <div className="flex items-center lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                className="inline-flex items-center justify-center p-3 w-12 h-12 text-gray-200 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* منوی موبایل */}
        {isOpen && (
            <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-md border-b border-gray-700 shadow-lg">
              <div className="px-4 py-6">
                <ul className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center py-3 px-4 text-gray-200 hover:text-[#FEC360] hover:bg-gray-700/50 rounded-xl transition-all duration-200 font-medium"
                        >
                          {link.label}
                        </Link>
                      </li>
                  ))}

                  <li className="pt-4 border-t border-gray-700">
                    {userName ? (
                        <div className="flex items-center justify-between px-4">
                          <span className="text-gray-200 font-medium">سلام، {userName}</span>
                          <button
                              onClick={() => signOut({ callbackUrl: "/" })}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl px-4 py-2 transition-all duration-200"
                          >
                            <LogOut className="w-4 h-4" />
                            خروج
                          </button>
                        </div>
                    ) : (
                        <Link
                            href="/signin"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full bg-[#FEC360] hover:bg-[#fed27a] text-gray-900 font-semibold rounded-xl px-6 py-3 transition-all duration-200 shadow-md"
                        >
                          <User className="w-4 h-4" />
                          ورود به حساب
                        </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
        )}
      </header>
  );
};

export default Navbar;
