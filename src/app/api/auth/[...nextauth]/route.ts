import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "ایمیل", type: "text" },
                password: { label: "رمز عبور", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return { id: user.id + "", name: user.name, email: user.email };
            },
        }),
    ],

    session: {
        strategy: "jwt" as SessionStrategy, // 👈 اصلاح شد
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
