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
