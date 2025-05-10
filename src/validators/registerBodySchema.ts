import { z } from 'zod';

// valida os dados do usuário que vai ser criado com zod
export const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});
