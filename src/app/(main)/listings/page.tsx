import prisma from "@/lib/prisma";
import HeroSection from "@/components/HomeComponents/HeroSection";
import ListingsGrid from "@/components/HomeComponents/ListingsGrid";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  // ✅ دریافت املاک از دیتابیس
  const listings = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* استفاده از HeroSection */}
      <HeroSection listingsCount={listings.length} />

      {/* Listings Grid */}
      <ListingsGrid listings={listings ?? []} />
    </>
  );
}
