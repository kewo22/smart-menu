import { PrismaClient } from "@prisma/client";

// export const db = new PrismaClient();

export const db = globalThis.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;