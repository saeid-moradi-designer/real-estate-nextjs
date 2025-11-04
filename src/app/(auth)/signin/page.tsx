// src/components/AuthForm.tsx
"use client";

import React, { useState } from "react";

type AuthMode = "signIn" | "signUp";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleMode = () => {
    setMode(mode === "signIn" ? "signUp" : "signIn");
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signIn") {
      console.log("Signing in:", { email, password });
    } else {
      console.log("Signing up:", { name, email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mode === "signIn" ? "ورود" : "ثبت نام"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signUp" && (
            <div>
              <label className="block text-gray-700 mb-1">نام کامل</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام شما"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-1">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            {mode === "signIn" ? "ورود" : "ثبت نام"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {mode === "signIn" ? "حساب ندارید؟" : "قبلاً ثبت نام کرده‌اید؟"}{" "}
          <span
            onClick={toggleMode}
            className="text-blue-500 cursor-pointer font-semibold hover:underline"
          >
            {mode === "signIn" ? "ثبت نام" : "ورود"}
          </span>
        </p>
      </div>
    </div>
  );
}
