module.exports = async (fastify, opts) => {
  fastify.get('/', async (req, reply) => {
    return fastify.oracle.pool.getStatistics();
  });
};
