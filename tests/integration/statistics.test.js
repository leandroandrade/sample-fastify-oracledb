const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

let fastify;

t.beforeEach(async t => {
  fastify = await buildApp(t);
});

test('should return statistics of database usage', async (t) => {
  const res = await fastify.inject({
    method: 'GET',
    url: '/api/statistics',
  });

  t.equal(res.statusCode, 200);
});
