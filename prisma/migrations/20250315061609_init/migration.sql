-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'guest',
    "icon" TEXT NOT NULL DEFAULT '/user_default.png',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyLetter" (
    "id" SERIAL NOT NULL,
    "autherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "notifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MyLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherLetter" (
    "id" INTEGER NOT NULL,
    "autherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "notifyAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtherLetter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MyLetter" ADD CONSTRAINT "MyLetter_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
