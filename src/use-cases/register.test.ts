import { expect, test, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


let usersRepository: InMemoryUsersRepository // Fake Repository
let registerUseCase: RegisterUseCase


describe('[REGISTER] - USE CASE', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository() // Fake Repository
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    test('Should be able to register', async () => {

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    test('Should hash user password upon registration', async () => {

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)

    })

    test('Should not be able to register with same email twice', async () => {

        const email = 'johndoe@example.com';

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() =>

            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456'
            }),

        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})