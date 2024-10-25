import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

describe('[REGISTER] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to register ', async () => {
        const response = await request(app.server)
            .post("/users")
            .send({
                name: "John Doe",
                email: "johndqoe@email.com",
                password: "123456"
            })

        expect(response.statusCode).toEqual(201)
    })

})