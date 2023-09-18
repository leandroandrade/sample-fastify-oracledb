const Fastify = require('fastify');
const { faker } = require('@faker-js/faker');

const appPlugin = require('../../src/app');
const configs = require('../../src/configs');

async function buildApp(t) {
  const fastify = Fastify(configs);
  await fastify.register(appPlugin);

  t.teardown(async () => {
    await fastify.close();
  });
  return fastify;
}

async function clearTable(fastify) {
  await fastify.oracle.query('TRUNCATE TABLE heroes');
}

async function getHeroes(fastify) {
  const { rows } = await fastify.oracle.query('SELECT * FROM heroes');
  return rows;
}

async function createHeroes(fastify, size) {
  const sql = 'INSERT INTO heroes values (:id, :name, :description)';
  const binds = [];

  for (let i = 0; i < size; i++) {
    binds.push({
      id: faker.number.int({ max: Number.MAX_SAFE_INTEGER }),
      name: faker.person.firstName(),
      description: faker.lorem.words(),
    });
  }

  const connection = await fastify.oracle.getConnection();
  await connection.executeMany(sql, binds, {
    autoCommit: true,
  });
  await connection.close();
}

async function createHero(fastify) {
  const id = faker.number.int(1000);
  const name = faker.person.firstName();
  const description = faker.lorem.words();

  return await fastify.oracle.transact(async conn => {
    await conn.execute('INSERT INTO heroes values (:id, :name, :description)', {
      id,
      name,
      description,
    });

    return {
      id, name, description,
    };
  });
}

async function getHeroById(fastify, id) {
  const { rows } = await fastify.oracle.query('SELECT * FROM heroes where hero_id = :id', [id]);
  if (!rows || !rows.length) {
    return null;
  }

  const [result] = rows;
  return result;
}

module.exports = {
  buildApp,
  getHeroes,
  createHeroes,
  clearTable,
  createHero,
  getHeroById,
};
