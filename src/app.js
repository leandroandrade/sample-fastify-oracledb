const fp = require('fastify-plugin');
const autoLoad = require('@fastify/autoload');
const { join } = require('path');

async function appPlugin(app, config) {
  await app.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {
      pool: {
        user: 'oracle',
        password: 'oracle',
        connectString: '127.0.0.1:1521/XEPDB1'
      },
      // name: 'testdb',
      outFormat: 'OBJECT'
    }
  }).register(autoLoad, {
    dir: join(__dirname, 'decorators'),
  }).register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: 'api' },
  });
}

module.exports = fp(appPlugin);
