import { SearchGymUseCase } from "../search-gyms"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-respository"

export function makeSearchGymsUserCase() {

    const gymRepository = new PrismaGymRepository()
    const searchGymsUseCase = new SearchGymUseCase(gymRepository)

    return searchGymsUseCase
}