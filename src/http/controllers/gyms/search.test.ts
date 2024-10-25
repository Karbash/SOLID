import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe('[SEARCH GYMS] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to search a gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Academia de Testes Unitarios",
                description: "Uma academia da hora e sua descricao.",
                phone: "03732564586",
                latitude: -20.0183832,
                longitude: -45.5347268
            })

        await request(app.server)
            .post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Academia de Testes End to End",
                description: "Uma academia da hora e sua descricao.",
                phone: "03732564586",
                latitude: -20.0183832,
                longitude: -45.5347268
            })

        await request(app.server)
            .post("/gyms")
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Academia Distante",
                description: "Uma academia da hora e sua descricao.",
                phone: "03732564586",
                latitude: -20.0183832,
                longitude: -48.5347268
            })

        const response = await request(app.server)
            .get(`/gyms/search`)
            .query({
                query: "Testes Unitarios"
            })
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Academia de Testes Unitarios",
            }),
        ])

    })

})