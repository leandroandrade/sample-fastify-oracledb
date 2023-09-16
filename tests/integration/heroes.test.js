const t = require('tap');
const { buildApp } = require('../shared/helper');

const { test } = t;

test('should fetch all heroes', async (t) => {
    const fastify = await buildApp(t);

    const response = await fastify.inject({
        method: 'GET',
        url: '/api/heroes',
    });
    t.equal(response.statusCode, 200);
});

test('should fetch hero by id', async (t) => {
    const fastify = await buildApp(t);

    const response = await fastify.inject({
        method: 'GET',
        url: '/api/heroes',
    });
    t.equal(response.statusCode, 200);
});

test('should persist hero', async (t) => {
    const fastify = await buildApp(t);

    const response = await fastify.inject({
        method: 'POST',
        url: '/api/heroes',
        headers: {
            'Content-Type': 'application/json',
        },
        payload: {

        }
    });
    t.equal(response.statusCode, 200);
});

test('should update hero', async (t) => {
    const fastify = await buildApp(t);

    const response = await fastify.inject({
        method: 'PUT',
        url: '/api/heroes/1',
        headers: {
            'Content-Type': 'application/json',
        },
        payload: {

        }
    });
    t.equal(response.statusCode, 200);
});

test('should delete hero', async (t) => {
    const fastify = await buildApp(t);

    const response = await fastify.inject({
        method: 'DELETE',
        url: '/api/heroes/1',
    });
    t.equal(response.statusCode, 200);
});
