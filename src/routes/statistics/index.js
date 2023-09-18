module.exports = async (fastify, opts) => {
  fastify.get('/', async (req, reply) => {
    // reference: https://node-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#connpoolmonitor
    return fastify.oracle.pool.getStatistics();
  });
};
