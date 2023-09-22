const { faker } = require('@faker-js/faker');
const oracledb = require('oracledb');

module.exports = async (fastify, opts) => {
  fastify.get('/seed/:total', async (req, reply) => {
    const { total } = req.params;

    const sql = 'INSERT INTO heroes (name, description) values (:name, :description)';
    const binds = [];

    for (let i = 0; i < total; i++) {
      binds.push({
        name: faker.person.firstName(),
        description: faker.lorem.words(),
      });
    }

    const connection = await fastify.oracle.getConnection();
    await connection.executeMany(sql, binds, {
      autoCommit: true,
    });
    await connection.close();

    return reply
      .status(200)
      .send({
        message: 'Database seeded successfully!',
      });
  });

  fastify.get('/', async (req, reply) => {
    const { rows } = await fastify.oracle.query('SELECT * FROM heroes');
    return rows;
  });

  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;

    const { rows } = await fastify.oracle.query('SELECT * FROM heroes where hero_id = :id', { id });
    if (!rows || !rows.length) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: `Hero ${id} not found!`,
      });
    }

    const [result] = rows;
    return result;
  });

  fastify.post('/', async (req, reply) => {
    const { name, description } = req.body;

    const res = await fastify.oracle.transact(conn => {
      return conn.execute('INSERT INTO heroes (name, description) values (:name, :description) RETURN hero_id INTO :id', {
        name,
        description,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      });
    });

    fastify.log.info(`rows affected: ${res.rowsAffected}`);

    const [id] = res.outBinds.id;

    return reply
      .status(201)
      .send({ id, name, description });
  });

  fastify.put('/:id', async (req, reply) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const params = { id };
    const conditions = [];

    if (name && name.length) {
      conditions.push('name = :name');
      params.name = name;
    }

    if (description && description.length) {
      conditions.push('description = :description');
      params.description = description;
    }

    const fields = conditions.join(', ');
    const query = `UPDATE heroes set ${fields} where hero_id = :id`;

    const res = await fastify.oracle.transact(conn => {
      return conn.execute(query, params);
    });

    fastify.log.info(`rows affected: ${res.rowsAffected}`);

    return reply
      .status(204)
      .send();
  });

  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;

    const res = await fastify.oracle.transact(conn => {
      return conn.execute('DELETE FROM heroes where hero_id = :id ', { id });
    });

    fastify.log.info(`rows affected: ${res.rowsAffected}`);

    return reply
      .status(204)
      .send();
  });
};
