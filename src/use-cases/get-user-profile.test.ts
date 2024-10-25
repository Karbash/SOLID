import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { beforeEach, describe, expect, test } from "vitest"
import bcryptjs from 'bcryptjs'
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


let usersRepository: InMemoryUsersRepository // Fake Repository
let getprofileUseCase: GetUserProfileUseCase


describe('[GET USER PROFILE] - USE CASE', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository() // Fake Repository
        getprofileUseCase = new GetUserProfileUseCase(usersRepository)
    })

    test('Should be able to get a user profile', async () => {

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await bcryptjs.hash('123456', 6)
        })

        const { user } = await getprofileUseCase.execute({
            userId: createdUser.id
        })


        expect(user.name).toEqual('John Doe')
    })

    test('Should not be able to get a user profile with wrong id', async () => {

        await expect(() =>

            getprofileUseCase.execute({
                userId: "non-existing-id"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})