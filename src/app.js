const fp = require('fastify-plugin');
const autoLoad = require('@fastify/autoload');
const { join } = require('path');

async function appPlugin(app, config) {
  await app.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {
      pool: {
        user: 'test',
        password: 'test',
        connectString: '127.0.0.1:1521/XEPDB1',

        poolMin: 8,
        poolMax: 32,
        enableStatistics: true,
      },
      outFormat: 'OBJECT',
    },
  }).register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: 'api' },
  });
}

module.exports = fp(appPlugin);
