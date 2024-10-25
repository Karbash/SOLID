import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'


let gymRespository: InMemoryGymsRepository // Fake Repository
let createGymUseCase: CreateGymUseCase


describe('[CREATE GYM] - USE CASE', () => {

    beforeEach(() => {
        gymRespository = new InMemoryGymsRepository() // Fake Repository
        createGymUseCase = new CreateGymUseCase(gymRespository)
    })

    test('Should be able to create gym', async () => {

        const { gym } = await createGymUseCase.execute({
            title: "Gym Silver Lake",
            description: "Hipped Gym in City",
            phone: "3732617752",
            latitude: -5.0000,
            longitude: 21.0000,
        })
        expect(gym.id).toEqual(expect.any(String))
    })
})