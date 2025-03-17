import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient;

export const fetchLetters = async () => {
  return await prisma.letter.findMany({
    include: { auther: true },
  });
};

export const createLetter = async (autherId: number, content: string, notifyAt: Date) => {
  try {
    const newLetter = await prisma.letter.create({
      data: {
        autherId,
        content,
        notifyAt,
      },
    });

    return newLetter;
  } catch(error: any) {
    console.error("Error in createLetter:", error.message);
    throw new Error(`Prisma Error: ${error.message}`);
  }
};