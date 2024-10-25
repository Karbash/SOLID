import { beforeEach, describe, expect, test } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { GetUserMetricsUseCase } from "./get-user-metrics"


let checkInRepository: InMemoryCheckInRepository // Fake Repository
let getUserMetricsUseCase: GetUserMetricsUseCase


describe('[GET USER METRICS] - USE CASE', () => {

    beforeEach(async () => {

        checkInRepository = new InMemoryCheckInRepository() // Fake Repository
        getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)
    })


    test('Should be able to get check-ins count for metrics', async () => {

        await checkInRepository.create({
            gym_id: "gym_01",
            user_id: "d793135b-8d79-4823-8d08-080a6fddef69",
        })

        await checkInRepository.create({
            gym_id: "gym_02",
            user_id: "d793135b-8d79-4823-8d08-080a6fddef69",
        })

        const { checkInsCount } = await getUserMetricsUseCase.execute({
            userId: "d793135b-8d79-4823-8d08-080a6fddef69"
        })

        expect(checkInsCount).toEqual(2)

    })
})

