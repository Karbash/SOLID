import { FetchCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository"

export function makeFetchUserCheckInHistoryUserCase() {

    const checkInRepository = new PrismaCheckInsRepository()
    const fetchUserCheckInHistoryUseCase = new FetchCheckInsHistoryUseCase(checkInRepository)

    return fetchUserCheckInHistoryUseCase
}