/*
  Warnings:

  - Added the required column `area` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dealType` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bathroomCount" INTEGER,
ADD COLUMN     "dealType" TEXT NOT NULL,
ADD COLUMN     "depositPrice" DOUBLE PRECISION,
ADD COLUMN     "elevator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "floor" INTEGER,
ADD COLUMN     "furnished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "propertyType" TEXT NOT NULL,
ADD COLUMN     "rentPrice" DOUBLE PRECISION,
ADD COLUMN     "roomCount" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "storage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalFloors" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
