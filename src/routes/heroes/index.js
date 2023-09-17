module.exports = async (fastify, opts) => {
  fastify.get('/', async (req, reply) => {
    const { rows } = await fastify.oracle.query('SELECT * FROM heroes');
    return rows;
  });

  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;

    const { rows } = await fastify.oracle.query('SELECT * FROM heroes where hero_id = :id', [id]);
    // TODO: validate whether rows is empty
    const [result] = rows;
    return result;
  });

  fastify.post('/', async (req, reply) => {
    const { name, description } = req.body;
    const id = Math.floor(Math.random() * 1000);

    const res = await fastify.oracle.transact(conn => {
      return conn.execute('INSERT INTO heroes values (:id, :name, :description)', {
        id,
        name,
        description,
      });
    });

    fastify.log.info(`rows affected: ${res.rowsAffected}`);

    return reply
      .status(201)
      .send({ id, name, description });
  });

  fastify.put('/:id', (req, reply) => {
    return { message: 'put hero by id' };
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
