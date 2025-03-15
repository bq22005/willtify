import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchLetters = async () => {
  return await prisma.letter.findMany({
    include: { auther: true },
  });
};

export const createLetter = async (autherId: number, content: string, notifyAt: Date) => {
  return await prisma.letter.create({
    data: { autherId, content, notifyAt },
  });
};