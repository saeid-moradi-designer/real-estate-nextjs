import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سامانه خان",
  description: "Generated Saeid Moradi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        {children}
      </body>
    </html>
  );
}
