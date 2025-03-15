/*
  Warnings:

  - You are about to drop the `MyLetter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtherLetter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MyLetter" DROP CONSTRAINT "MyLetter_autherId_fkey";

-- DropTable
DROP TABLE "MyLetter";

-- DropTable
DROP TABLE "OtherLetter";

-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "autherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "notifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
