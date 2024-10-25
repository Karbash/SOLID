import { beforeEach, describe, expect, test } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository"
import { SearchGymUseCase } from "./search-gyms"


let gymsRepository: InMemoryGymsRepository // Fake Repository
let searchGymsUseCase: SearchGymUseCase


describe('[SEARCH GYMS] - USE CASE', () => {

    beforeEach(async () => {

        gymsRepository = new InMemoryGymsRepository() // Fake Repository
        searchGymsUseCase = new SearchGymUseCase(gymsRepository)
    })

    test('Should be able to search for gyms', async () => {

        await gymsRepository.create({
            id: `Gym-01`,
            title: `Heavy Burst Academy`,
            description: "",
            latitude: 12.0000,
            longitude: -5.000,
            phone: ""
        })

        await gymsRepository.create({
            id: `Gym-02`,
            title: `Silver Lake Academy`,
            description: "",
            latitude: 12.0000,
            longitude: -5.000,
            phone: ""
        })

        const { gyms } = await searchGymsUseCase.execute({
            query: "Silver",
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Silver Lake Academy" }),
        ])
    })



    test('Should be able to search for gyms paginated', async () => {


        for (let i = 1; i <= 22; i++) {

            await gymsRepository.create({
                id: `Gym-${i}`,
                title: `Title-${i}`,
                description: "",
                latitude: 12.0000,
                longitude: -5.000,
                phone: ""
            })
        }

        const { gyms } = await searchGymsUseCase.execute({
            query: "Title",
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Title-21" }),
            expect.objectContaining({ title: "Title-22" })
        ])
    })

})

