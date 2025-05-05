import { fastify } from 'fastify';

const server = fastify({});

server.listen({ port: 3333 }, () => {
    console.log('Server is running on PORT: 3333');
});
