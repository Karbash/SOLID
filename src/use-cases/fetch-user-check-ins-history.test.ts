import { beforeEach, describe, expect, test } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { FetchCheckInsHistoryUseCase } from "./fetch-user-check-ins-history"


let checkInRepository: InMemoryCheckInRepository // Fake Repository
let checkInsHistoryUseCase: FetchCheckInsHistoryUseCase


describe('[FETCH USER CHECK IN HISTORY] - USE CASE', () => {

    beforeEach(async () => {

        checkInRepository = new InMemoryCheckInRepository() // Fake Repository
        checkInsHistoryUseCase = new FetchCheckInsHistoryUseCase(checkInRepository)
    })


    test('Should be able to fetch check-in history', async () => {

        await checkInRepository.create({
            gym_id: "gym_01",
            user_id: "d793135b-8d79-4823-8d08-080a6fddef69",
        })

        await checkInRepository.create({
            gym_id: "gym_02",
            user_id: "d793135b-8d79-4823-8d08-080a6fddef69",
        })

        const { checkIns } = await checkInsHistoryUseCase.execute({
            userId: "d793135b-8d79-4823-8d08-080a6fddef69",
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym_01" }),
            expect.objectContaining({ gym_id: "gym_02" })
        ])
    })

    test('Should be able to fetch paginated check-in history', async () => {


        for (let i = 1; i <= 22; i++) {

            await checkInRepository.create({
                gym_id: `gym_${i}`,
                user_id: "d793135b-8d79-4823-8d08-080a6fddef69",
            })
        }

        const { checkIns } = await checkInsHistoryUseCase.execute({
            userId: "d793135b-8d79-4823-8d08-080a6fddef69",
            page: 2,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym_21" }),
            expect.objectContaining({ gym_id: "gym_22" })
        ])
    })

})

