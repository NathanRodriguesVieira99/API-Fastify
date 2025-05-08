import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts';
import { RegisterUseCase } from './register.ts';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        // mock do prisma-users-repository
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        // chama o método execute do registerUseCase com os dados do usuário
        const { user } = await registerUseCase.execute({
            name: 'Jhon Doe',
            email: 'JhonDoe@example.com',
            password: '12345678',
        });

        // verifica se a senha foi hashed comparando a senha original com o hash do bcryptjs
        const isPasswordCorrectlyHashed = await compare(
            '12345678',
            user.password_hash
        );

        // espera que a senha tenha sido hashed
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
    it('should not be able to register with the same email twice', async () => {
        // mock do prisma-users-repository
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        // chama o método execute do registerUseCase com o email fixo
        const email = 'JhonDoe@example.com';

        await registerUseCase.execute({
            name: 'Jhon Doe',
            email,
            password: '12345678',
        });

        // espera que ao chamar o método com o mesmo email estoure o erro UserAlreadyExistsError
        await expect(
            registerUseCase.execute({
                name: 'Jhon Doe',
                email,
                password: '12345678',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
    it('should not be able to register', async () => {
        // mock do prisma-users-repository
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        // chama o método execute do registerUseCase
        const { user } = await registerUseCase.execute({
            name: 'Jhon Doe',
            email: 'JhonDoe@example.com',
            password: '12345678',
        });

        // espera que o id seja uma string qualquer
        expect(user.id).toEqual(expect.any(String));
    });
});
