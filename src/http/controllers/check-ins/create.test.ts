import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('[CREATE CHECK-IN] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to create a check-in', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "Academia de Chack-In",
                latitude: -20.0183832,
                longitude: -45.5347268
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -20.0183832,
                longitude: -45.5347268,
            })



        expect(response.statusCode).toEqual(201)

    })

})