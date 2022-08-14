const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('/posts/:postId tests', function() {
    it('GET /posts/1 should return a view', async function () {
        const res = await requestWithSupertest.get('/posts/1')
        console.log(res)
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toEqual('text/html; charset=utf-8')
    });

    it('GET /posts/1 should return a 404', async function() {
        const res = await requestWithSupertest.get('/posts/2')
        expect(res.status).toEqual(404);
    })
});

describe('api/posts/:postId/comments tests', function() {
    it('POST should work with correct input', async function () {
        const res = await requestWithSupertest.post('/api/posts/1/comments')
            .send({
                body: 'This is a fake comment.',
                authorId: 1,
            });
        expect(res.status).toEqual(201);
        expect(res.body.body).toEqual('This is a fake comment.');
    });

    it('POST should return 500 with bad input', async function () {
        const res = await requestWithSupertest.post('/api/posts/1/comments')
            .send({
                authorId: 1,
            });
        expect(res.status).toEqual(500);
        expect(res.text).toEqual('Bad request.');
    });
});

describe('api/comments/:commentId/upvote tests', function() {
    it('POST should work with correct input', async function () {
        const res = await requestWithSupertest.post('/api/comments/1/upvote')
            .send({
                userId: 1,
            });
        expect(res.status).toEqual(201);
    });

    it('POST should return 500 with bad input', async function () {
        const res = await requestWithSupertest.post('/api/posts/1/comments')
            .send({
                authorIdasdfa: 1,
            });
        expect(res.status).toEqual(500);
        expect(res.text).toEqual('Bad request.');
    });
});

