import request from 'supertest';
import { expect } from 'chai';
import app, { server } from '../src/index.js';
import 'mocha'
import { describe, after, it } from 'mocha'; // Import the 'describe' function

after(() => {
    server.close();
})

describe('Authentication API', () => {
    describe('POST /authenticate', () => {
        it('should return a JWT token for any credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ username: 'any_username', password: 'any_password' });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token'); // Check for JWT token
        });

        it('should return a 400 if no username', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ password: "random_value" });

            expect(response.status).to.equal(400);
        });

        it('should return a 400 if no password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ username: "random_value" });

            expect(response.status).to.equal(400);
        });

        it('should return a 400 if no credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({});

            expect(response.status).to.equal(400);
        });

    });

    describe('Any other route', () => {
        it('should return 404 for any other route', async () => {
            const response = await request(app)
                .get('/api/auth/random_route');

            expect(response.status).to.equal(404);
        })
    })

});
