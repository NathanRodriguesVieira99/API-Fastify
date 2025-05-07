import { fastify } from 'fastify';
import { env } from './env/index.ts';

const server = fastify({});

server
    .listen({
        host: '0.0.0.0',
        port: env.PORT,
    })
    .then(() => {
        console.log('🚀 Server is running on PORT 3333');
    });
