import { CheckInUseCase } from "../check-in"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-respository"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository"

export function makeCheckInUserCase() {

    const gymRepository = new PrismaGymRepository()
    const checkInRepository = new PrismaCheckInsRepository()
    const checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

    return checkInUseCase
}