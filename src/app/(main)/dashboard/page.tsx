import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>برای دیدن داشبورد باید وارد شوید.</div>;
    }

    return <div className="mt-30">خوش آمدی، {session.user?.email}</div>;
}
