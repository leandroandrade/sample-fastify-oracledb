const fp = require('fastify-plugin');
const fastifyOracle = require('../externals/fastify-oracledb');

async function oraclePlugin(fastify, opts) {
  await fastify.register(fastifyOracle, {
    pool: {
      user: 'test',
      password: 'test',
      connectString: '127.0.0.1:1521/XEPDB1',

      poolMin: 8,
      poolMax: 32,
      enableStatistics: true,
    },
    outFormat: 'OBJECT',
  });
}

module.exports = fp(oraclePlugin);
