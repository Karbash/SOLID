import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('[CREATE GYM] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to create a gym', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
            .post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Academia de Testes",
                description: "Uma academia da hora e sua descricao.",
                phone: "03732564586",
                latitude: -20.0183832,
                longitude: -45.5347268
            })


        expect(response.statusCode).toEqual(201)

    })

})