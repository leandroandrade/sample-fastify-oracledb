module.exports = async (fastify, opts) => {
    fastify.get('/', (req, reply) => {
        return {message: 'get all heroes'}
    });

    fastify.get('/:id', (req, reply) => {
        return {message: 'get hero by id'}
    });

    fastify.post('/', (req, reply) => {
        return {message: 'post hero'}
    });

    fastify.put('/:id', (req, reply) => {
        return {message: 'put hero by id'}
    });

    fastify.delete('/:id', (req, reply) => {
        return {message: 'delete hero by id'}
    });
};
