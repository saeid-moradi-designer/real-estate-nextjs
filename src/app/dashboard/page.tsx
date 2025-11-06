import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogOut, Home, Users, Building, FileText } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-700">
                برای دیدن داشبورد باید وارد شوید.
            </div>
        );
    }

    const userEmail = session.user?.email;

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-8 text-blue-600">پنل مدیریت</h1>
                    <nav className="space-y-4">
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                            <Home size={20} /> خانه
                        </Link>
                        <Link href="/dashboard/users" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                            <Users size={20} /> کاربران
                        </Link>
                        <Link href="/dashboard/properties" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                            <Building size={20} /> املاک
                        </Link>
                        <Link href="/dashboard/posts" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                            <FileText size={20} /> پست‌ها
                        </Link>
                    </nav>
                </div>
                <form action="/api/auth/signout" method="post">
                    <button
                        type="submit"
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 mt-6"
                    >
                        <LogOut size={20} /> خروج
                    </button>
                </form>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-semibold">خوش آمدی 👋</h2>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-medium">
                        {userEmail}
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cards for Users, Properties, and Posts */}
                    <div className="bg-white shadow rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-2">کاربران</h3>
                        <p className="text-3xl font-bold text-blue-600">125</p>
                        <Link href="/dashboard/users" className="text-sm text-blue-500 hover:text-blue-700 mt-2 block">
                            مشاهده کاربران →
                        </Link>
                    </div>

                    <div className="bg-white shadow rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-2">املاک</h3>
                        <p className="text-3xl font-bold text-green-600">۴۵</p>
                        <Link href="/dashboard/properties" className="text-sm text-green-500 hover:text-green-700 mt-2 block">
                            مشاهده املاک →
                        </Link>
                    </div>

                    <div className="bg-white shadow rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-2">پست‌ها</h3>
                        <p className="text-3xl font-bold text-purple-600">۸۷</p>
                        <Link href="/dashboard/posts" className="text-sm text-purple-500 hover:text-purple-700 mt-2 block">
                            مشاهده پست‌ها →
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}