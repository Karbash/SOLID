import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { beforeEach, describe, expect, test } from "vitest"
import { AuthenticateUseCase } from "./authenticate"
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let usersRepository: InMemoryUsersRepository // Fake Repository
let authenticateUseCase: AuthenticateUseCase


describe('[AUTHENTICATE] - USE CASE', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository() // Fake Repository
        authenticateUseCase = new AuthenticateUseCase(usersRepository)
    })

    test('Should be able to authenticate', async () => {

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await bcryptjs.hash('123456', 6)
        })

        const { user } = await authenticateUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    test('Should not be able to authenticate with wrong email', async () => {

        await expect(() =>
            authenticateUseCase.execute({
                email: 'johndoe@example.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test('Should not be able to authenticate with wrong password', async () => {

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await bcryptjs.hash('123456', 6)
        })

        await expect(() =>
            authenticateUseCase.execute({
                email: 'johndoe@example.com',
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})