// // app/api/posts/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       orderBy: { createdAt: "desc" },
//       take: 6
//     });

//     return NextResponse.json(posts);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Error fetching posts' },
//       { status: 500 }
//     );
//   }
// }