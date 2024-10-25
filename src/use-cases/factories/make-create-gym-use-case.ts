import { CreateGymUseCase } from "../create-gym"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-respository"

export function makeCreateGymUserCase() {

    const gymRepository = new PrismaGymRepository()
    const createGymUseCase = new CreateGymUseCase(gymRepository)

    return createGymUseCase
}