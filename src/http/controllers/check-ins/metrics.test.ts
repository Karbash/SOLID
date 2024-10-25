import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('[CHECK-IN METRICS] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to count the metrics of check-ins', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "Academia de Chack-In",
                latitude: -20.0183832,
                longitude: -45.5347268
            }
        })


        await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -20.0183832,
                longitude: -45.5347268,
            })


        const response = await request(app.server)
            .get(`/check-ins/metrics`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                checkInsCount: 1,
            })
        )
    })
})
