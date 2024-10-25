import { beforeEach, describe, expect, test } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository"
import { FetchNearbyGymUseCase } from "./fetch-nearby-gyms"


let gymsRepository: InMemoryGymsRepository // Fake Repository
let fetchNearbyGymsUseCase: FetchNearbyGymUseCase


describe('[FETCH NEARBY GYMS] - USE CASE', () => {

    beforeEach(async () => {

        gymsRepository = new InMemoryGymsRepository() // Fake Repository
        fetchNearbyGymsUseCase = new FetchNearbyGymUseCase(gymsRepository)
    })

    test('Should be able to search nearby gyms', async () => {

        await gymsRepository.create({
            id: `Gym-01`,
            title: `Triunfo Muay Thai`,
            description: "",
            latitude: -20.0101132,
            longitude: -45.5370444,
            phone: ""
        })

        await gymsRepository.create({
            id: `Gym-02`,
            title: `MS Assessoria Esportiva`,
            description: "",
            latitude: -20.1378867,
            longitude: -45.5080687,
            phone: ""
        })


        //-20.018191, -45.534304  CASA

        const { gyms } = await fetchNearbyGymsUseCase.execute({
            userLatitude: -20.018191,
            userLongitude: -45.534304
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "Triunfo Muay Thai" }),
        ])
    })

})

