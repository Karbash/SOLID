import { afterAll, beforeAll, describe, expect, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe('[VALIDATE CHECK-IN] - (End to End)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to validate a check-in', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

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

        const responseCheckIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: profileResponse.body.user.id,
            }
        })

        console.log("Response checkIn", responseCheckIn)

        const response = await request(app.server)
            .patch(`/check-ins/${responseCheckIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(204)

        const checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: responseCheckIn.id
            }
        })

        console.log("VALIDATE ")
        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })

})