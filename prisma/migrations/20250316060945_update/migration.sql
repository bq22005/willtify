/*
  Warnings:

  - You are about to drop the column `date` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");
