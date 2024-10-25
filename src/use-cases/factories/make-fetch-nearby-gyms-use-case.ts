import { FetchNearbyGymUseCase } from "../fetch-nearby-gyms"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-respository"

export function makeFetchNearbyGymsUserCase() {

    const gymRepository = new PrismaGymRepository()
    const fetchNearbyGymsUseCase = new FetchNearbyGymUseCase(gymRepository)

    return fetchNearbyGymsUseCase
}