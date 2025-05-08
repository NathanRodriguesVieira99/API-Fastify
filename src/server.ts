import { fastify } from 'fastify';
import { env } from './env/index.ts';
import { Routes } from './http/routes/routes.ts';
import { ZodError } from 'zod';

// criação do servidor
const server = fastify({});

server
    .listen({
        host: '0.0.0.0',
        port: env.PORT,
    })
    .then(() => {
        console.log('🚀 Server is running on PORT 3333');
    });

// instancia das rotas
server.register(Routes);

// error handler global
server.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'validation error', issues: error.format });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO criar log para uma ferramenta externa
    }
    return reply.status(500).send({ message: 'Internal server error' });
});
