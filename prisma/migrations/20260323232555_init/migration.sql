/*
  Warnings:

  - You are about to drop the column `acompananteId` on the `Huesped` table. All the data in the column will be lost.
  - You are about to drop the column `habitacionResponsableId` on the `Huesped` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Huesped" DROP CONSTRAINT "Huesped_acompananteId_fkey";

-- DropForeignKey
ALTER TABLE "Huesped" DROP CONSTRAINT "Huesped_habitacionResponsableId_fkey";

-- AlterTable
ALTER TABLE "Huesped" DROP COLUMN "acompananteId",
DROP COLUMN "habitacionResponsableId",
ADD COLUMN     "habitacionId" TEXT,
ADD COLUMN     "responsableId" TEXT;

-- AddForeignKey
ALTER TABLE "Huesped" ADD CONSTRAINT "Huesped_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "Habitacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Huesped" ADD CONSTRAINT "Huesped_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "Huesped"("id") ON DELETE SET NULL ON UPDATE CASCADE;
