const supertest = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('get /', () => {
        it('responds with status 200, OK', () => {
            //use return here for the promise, or use async/await
            return supertest(server)
                .get('/')
                .expect(200);
        });

        //async example of above
        it('responds with 200, OK', async () => {
            await supertest(server)
                .get('/')
                .expect(200); //Luis used Content-Type, /json/i to showcase another test
        })
    })

    describe('get /api/superheroes/:id', () => {
        it('responds with a JSON containing a single user, and 200 status code', async () => {
            await supertest(server)
                .get('/api/superheroes/1')
                .expect(200)
                .expect('Content-Type', /json/i);
        })
        it('responds with 404, User not Found when a user is non-existent', async () => {
            await supertest(server)
                .get('/api/superheroes/doesnotexist')
                .expect(404);
        })
    })

    describe('post /api/superheroes', () => {
        it('responds with status 201, created', async () => {
            await supertest(server)
                .post('/api/superheroes')
                .send({ //use .send for req.body
                    name: 'Egg',
                    power: 'Cracks'
                })
                .expect(201);
        })
        it('responds with a JSON', async () => {
            await supertest(server)
                .post('/api/superheroes')
                .send({
                    name: 'Egg',
                    power: 'Cracks'
                })
                .expect('Content-Type', /json/i);
        })
    })

    describe('delete /api/superheroes/:id', () => {
        it('responds with status 200, OK', async () => {
            await supertest(server)
                .delete('/api/superheroes/1')
                .expect(200);
        })
        it('responds with a JSON', async () => {
            await supertest(server)
                .delete('/api/superheroes/1')
                .expect('Content-Type', /json/i);
        })
    })
})