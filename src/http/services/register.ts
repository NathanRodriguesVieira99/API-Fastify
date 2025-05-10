/*
USE-CASES DA CRIAÇÃO E VALIDAÇÃO DE USUÁRIO
*/
import type { UsersRepository } from '@/repositories/prisma/users-repository.js';
import type { RegisterUseCaseParams } from '@/interfaces/RegisterUseCaseParams.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts';
import { hash } from 'bcryptjs';
import type { RegisterUseCaseResponse } from '@/interfaces/RegisterUseCaseResponse.js';

export class RegisterUseCase {
    // construtor privado que  recebe a tipagem para criar o usuário no db
    constructor(private usersRepository: UsersRepository) {}

    // executa todos os métodos de criação de usuário ja tipado com parâmetros
    async execute({
        name,
        email,
        password,
    }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
        // criptografa a senha
        const password_hash = await hash(password, 6);

        // chama o método que valida se tem um usuário com e-mail repetido
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        // chama o método que cria o usuário
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return {
            user,
        };
    }
}
