import { env } from '@/env/index.ts';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
});
