module.exports = async (fastify, opts) => {
    fastify.get('/', async (req, reply) => {
        const conn = await fastify.oracle.getConnection()
        const result = await conn.execute('SELECT 1 AS FOO FROM DUAL', {}, { outFormat: fastify.oracle.db.OBJECT })

        console.log(result)

        await conn.close()
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
