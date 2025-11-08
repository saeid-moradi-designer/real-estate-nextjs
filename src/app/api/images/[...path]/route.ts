// app/api/images/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = join('/storage/images', ...params.path);

    // بررسی وجود فایل
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'عکس پیدا نشد' }, { status: 404 });
    }

    // خواندن فایل
    const fileBuffer = await readFile(filePath);
    
    // تشخیص نوع فایل
    const extension = params.path[params.path.length - 1].split('.').pop();
    const contentType = getContentType(extension || '');

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // کش برای 1 سال
      },
    });
  } catch (error) {
    console.error('خطا در خواندن عکس:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

function getContentType(extension: string): string {
  const types: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };
  
  return types[extension.toLowerCase()] || 'application/octet-stream';
}