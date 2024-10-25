import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-respository"
import { RegisterUseCase } from "../register"

export function makeRegisterUserCase() {

    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    return registerUseCase
}