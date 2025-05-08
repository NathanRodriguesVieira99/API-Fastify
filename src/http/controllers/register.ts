/*
CONTROLLER QUE RECEBE E ENVIA AS REQUISIÇÕES DOS REPOSITORIES
*/
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '../services/register.ts';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts';
import { UserAlreadyExistsError } from '../services/errors/user-already-exists-error.ts';

// método que  faz a request e reply da criação de usuário
export async function register(request: FastifyRequest, reply: FastifyReply) {
    // valida os dados do usuário que vai ser criado com zod
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    });

    // extrai os dados validados do body da request
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        // chama o repository de criação de usuário
        const usersRepository = new PrismaUsersRepository();
        // injeta o repository no método de criação de usuário
        const registerUseCase = new RegisterUseCase(usersRepository);
        // cria o usuário com dados validados
        await registerUseCase.execute({
            name,
            email,
            password,
        });
    } catch (error) {
        // verifica os possíveis erros
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }
    // status 201 = bem sucedido
    return reply.status(201).send();
}
