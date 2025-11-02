// src/app/(auth)/signin/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <section className="w-full max-w-md p-6 bg-white rounded-2xl shadow">
      <div className="w-full flex flex-col items-center bg-gray-900 text-white align-center py-5 mx-auto">
        <Image src="/images/logo-gold.svg" alt="logo" width={50} height={50} className="w-auto h-10 object-contain"/>
      </div>
      <form className="flex flex-col gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 transition"
        >
          ایجاد حساب با گوگل
        </button>
        <Link href="/signin">
          ورود
        </Link>
        {/* <Link
          href="/signup"
        >
          ثبت نام
        </Link> */}
      </form>
    </section>
  );
}
