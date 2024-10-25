import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-respository"
import { GetUserProfileUseCase } from "../get-user-profile"

export function makeGetUserProfileUserCase() {

    const userRepository = new PrismaUserRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)

    return getUserProfileUseCase
}