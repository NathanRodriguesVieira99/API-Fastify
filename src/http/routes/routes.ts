/* 
ROTAS DA API
*/
import type { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register.ts';

export async function Routes(server: FastifyInstance) {
    server.post('/users', register);
}
