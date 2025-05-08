/* 
REPOSITORY COM MÉTODOS PARA CRIAÇÃO DE USUÁRIO NO BANCO DE DADOS VIA PRISMA
*/
import { prisma } from '@/lib/prisma.ts';
import { Prisma } from '@prisma/client';
import type { UsersRepository } from './users-repository.d.ts';

export class PrismaUsersRepository implements UsersRepository {
    // método que cria o usuário
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    // método que não permite criar usuário com um e-mail repetido
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}
