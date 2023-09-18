const t = require('tap');
const { faker } = require('@faker-js/faker');
const {
  buildApp, clearTable, createHeroes, createHero, getHeroById,
} = require('../shared/helper');

const { test } = t;

let fastify;

t.beforeEach(async t => {
  fastify = await buildApp(t);

  await clearTable(fastify);
});

test('should seed database', async (t) => {
  const totalHeroes = 10;

  const res = await fastify.inject({
    method: 'GET',
    url: `/api/heroes/seed/${totalHeroes}`,
  });

  t.equal(res.statusCode, 200);
  t.same(res.json(), {
    message: 'Database seeded successfully!',
  });
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

test('should return `404` when a hero does not exist', async (t) => {
  const res = await fastify.inject({
    method: 'GET',
    url: '/api/heroes/123',
  });

  t.equal(res.statusCode, 404);
  t.same(res.json(), {
    statusCode: 404,
    error: 'Not Found',
    message: 'Hero 123 not found!',
  });
});

test('should persist a hero', async (t) => {
  const name = faker.person.firstName();
  const description = faker.lorem.words();

  const res = await fastify.inject({
    method: 'POST',
    url: '/api/heroes',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      name,
      description,
    },
  });

  t.equal(res.statusCode, 201);

  const newHero = res.json();
  t.equal(newHero.name, name);
  t.equal(newHero.description, description);
});

test('should update hero name', async (t) => {
  const hero = await createHero(fastify);
  const newName = `random name ${faker.person.firstName()}`;

  const res = await fastify.inject({
    method: 'PUT',
    url: `/api/heroes/${hero.id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      name: newName,
    },
  });

  t.equal(res.statusCode, 204);

  const heroFromDB = await getHeroById(fastify, hero.id);
  t.equal(heroFromDB.NAME, newName);
});

test('should update hero description', async (t) => {
  const hero = await createHero(fastify);
  const newDescription = `random description ${faker.lorem.words()}`;

  const res = await fastify.inject({
    method: 'PUT',
    url: `/api/heroes/${hero.id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    payload: {
      description: newDescription,
    },
  });

  t.equal(res.statusCode, 204);

  const heroFromDB = await getHeroById(fastify, hero.id);
  t.equal(heroFromDB.DESCRIPTION, newDescription);
});

test('should delete hero', async (t) => {
  const hero = await createHero(fastify);

  const response = await fastify.inject({
    method: 'DELETE',
    url: `/api/heroes/${hero.id}`,
  });

  t.equal(response.statusCode, 204);

  const heroFromDB = await getHeroById(fastify, hero.id);
  t.ok(heroFromDB == null);
});
