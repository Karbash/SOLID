import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-respository"
import { AuthenticateUseCase } from "../authenticate"

export function MakeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)
    return authenticateUseCase
}