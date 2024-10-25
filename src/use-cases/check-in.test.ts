import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { CheckInUseCase } from "./check-in"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository"
import { Decimal } from "@prisma/client/runtime/library"


let checkInRepository: InMemoryCheckInRepository // Fake Repository
let checkInUseCase: CheckInUseCase
let gymRepository: InMemoryGymsRepository


describe('[CHECK IN] - USE CASE', () => {

    beforeEach(async () => {

        checkInRepository = new InMemoryCheckInRepository() // Fake Repository
        gymRepository = new InMemoryGymsRepository() // Fake Repository
        checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)


        await gymRepository.create({
            id: "gym_01",
            title: "Silver Lake Gym",
            description: "",
            latitude: -20.0103448,
            longitude: -45.5369600,
            phone: "03732615354"
        })

        vi.useRealTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('Should be able to check-in', async () => {

        const { checkIn } = await checkInUseCase.execute({
            gymId: "gym_01",
            userId: "d793135b-8d79-4823-8d08-080a6fddef69",
            userLatitude: -20.0103597,
            userLongitude: -45.5370311
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    test('Should not be able to check-in in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await checkInUseCase.execute({
            gymId: "gym_01",
            userId: "d793135b-8d79-4823-8d08-080a6fddef69",
            userLatitude: -20.0103448,
            userLongitude: -45.5369575
        })

        await expect(() =>

            checkInUseCase.execute({
                gymId: "gym_01",
                userId: "d793135b-8d79-4823-8d08-080a6fddef69",
                userLatitude: -20.0103597,
                userLongitude: -45.5370311
            })
        ).rejects.toBeInstanceOf(Error)
    })

    test('Should be able to check-in in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await checkInUseCase.execute({
            gymId: "gym_01",
            userId: "d793135b-8d79-4823-8d08-080a6fddef69",
            userLatitude: -20.0103448,
            userLongitude: -45.5369575
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await checkInUseCase.execute({
            gymId: "gym_01",
            userId: "d793135b-8d79-4823-8d08-080a6fddef69",
            userLatitude: -20.0103597,
            userLongitude: -45.5370311
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    test('Should not be able to check-in on distant gym', async () => {

        gymRepository.items.push({
            id: "gym_02",
            title: "Silver Lake Gym",
            description: "",
            latitude: new Decimal(-20.0183474),
            longitude: new Decimal(-45.5340621),
            phone: "03732615354"
        })

        await expect(() =>

            checkInUseCase.execute({
                gymId: "gym_02",
                userId: "d793135b-8d79-4823-8d08-080a6fddef69",
                userLatitude: -20.0103587,
                userLongitude: -45.5370311
            })

        ).rejects.toBeInstanceOf(Error)

    })
})

