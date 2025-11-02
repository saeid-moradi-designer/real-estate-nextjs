"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react"; // <- Lucide icon
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" })
    console.log("Login with Google");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center pt-24 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            ورود به حساب کاربری
          </h1>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 mb-4 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <LogIn size={24} />
            ورود با گوگل
          </button>

          <div className="flex items-center my-4">
            <span className="flex-grow h-px bg-gray-300"></span>
            <span className="mx-2 text-gray-400">یا</span>
            <span className="flex-grow h-px bg-gray-300"></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                ایمیل
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ورود
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            حساب کاربری نداری؟{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              ثبت نام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


// signIn("google", { callbackUrl: "/" })