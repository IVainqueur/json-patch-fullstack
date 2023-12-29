import request from 'supertest';
import { expect } from 'chai';
import app, { server } from '../src/index.js';
import { describe, after, before, it } from 'mocha';

after(() => {
    server.close();
})

let token

describe('Patch API', () => {
    before(async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'any_username', password: 'any_password' });

        token = response.body.token
    })
    describe('POST /patch', () => {
        it('should apply the patch operations and return the patched JSON object', async () => {
            const originalJson = { foo: 'bar', baz: 'qux' };
            const patch = [
                { op: 'replace', path: '/foo', value: 'new_value' },
                { op: 'add', path: '/hello', value: 'world' },
            ];

            const expectedPatchedJson = { foo: 'new_value', baz: 'qux', hello: 'world' };

            const response = await request(app)
                .patch('/api/patch')
                .send({ json: originalJson, patch })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(200);
            expect(response.body.patched_output).to.deep.equal(expectedPatchedJson);
        });

        it('should return an error if the patch is invalid', async () => {
            const invalidPatch = [
                { op: 'invalid_op', path: '/foo', value: 'new_value' },
            ];

            const response = await request(app)
                .patch('/api/patch')
                .send({ json: { foo: 'bar' }, patch: invalidPatch })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
        });

        it('should return an error if the JSON is invalid', async () => {
            const response = await request(app)
                .patch('/api/patch')
                .send({ json: 'invalid_json', patch: [] })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
        });

        it('should return an error if the patch is missing', async () => {
            const response = await request(app)
                .patch('/api/patch')
                .send({ json: { foo: 'bar' } })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
        });

        it('should return an error if the JSON is missing', async () => {
            const response = await request(app)
                .patch('/api/patch')
                .send({ patch: [] })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error');
        });

    });
});