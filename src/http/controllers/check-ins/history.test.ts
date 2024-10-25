import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('[CHECK-IN HISTORY] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to list the history of check-ins', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "Academia de Chack-In",
                latitude: -20.0183832,
                longitude: -45.5347268
            }
        })

        const profileResponse = await request(app.server)
            .get("/me")
            .set('Authorization', `Bearer ${token}`)
            .send()

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: profileResponse.body.user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: profileResponse.body.user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: profileResponse.body.user.id,
                },
            ]
        })

        const response = await request(app.server)
            .get(`/check-ins/history`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                page: 1
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: profileResponse.body.user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: profileResponse.body.user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: profileResponse.body.user.id,
            })
        ])
    })
})
