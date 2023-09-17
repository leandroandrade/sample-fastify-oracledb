const t = require('tap');
const {
  buildApp, clearTable, createHeroes, createHero,
} = require('../shared/helper');

const { test } = t;

let fastify;

t.beforeEach(async t => {
  fastify = await buildApp(t);

  await clearTable(fastify);
});

test('should fetch all heroes', async (t) => {
  const totalHeroes = 10;
  await createHeroes(fastify, totalHeroes);

  const res = await fastify.inject({
    method: 'GET',
    url: '/api/heroes',
  });

  t.equal(res.statusCode, 200);
  t.equal(res.json().length, totalHeroes);
});

test('should fetch hero by id', async (t) => {
  const hero = await createHero(fastify);

  const res = await fastify.inject({
    method: 'GET',
    url: `/api/heroes/${hero.id}`,
  });

  t.equal(res.statusCode, 200);

  const returnedHero = res.json();
  t.equal(returnedHero.HERO_ID, hero.id);
  t.equal(returnedHero.NAME, hero.name);
  t.equal(returnedHero.DESCRIPTION, hero.description);
});

// test('should persist hero', async (t) => {
//   const fastify = await buildApp(t);
//
//   const response = await fastify.inject({
//     method: 'POST',
//     url: '/api/heroes',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     payload: {
//
//     },
//   });
//   t.equal(response.statusCode, 200);
// });
//
// test('should update hero', async (t) => {
//   const fastify = await buildApp(t);
//
//   const response = await fastify.inject({
//     method: 'PUT',
//     url: '/api/heroes/1',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     payload: {
//
//     },
//   });
//   t.equal(response.statusCode, 200);
// });
//
// test('should delete hero', async (t) => {
//   const fastify = await buildApp(t);
//
//   const response = await fastify.inject({
//     method: 'DELETE',
//     url: '/api/heroes/1',
//   });
//   t.equal(response.statusCode, 200);
// });
