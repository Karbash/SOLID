import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository"

export function makeGetUserMetricsUserCase() {

    const checkInRepository = new PrismaCheckInsRepository()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)

    return getUserMetricsUseCase
}