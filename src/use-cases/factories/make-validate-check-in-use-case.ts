import { ValidateCheckInUseCase } from "../validate-check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository"

export function makeValidateCheckInUserCase() {

    const checlInRepository = new PrismaCheckInsRepository()
    const validateCheckInUseCase = new ValidateCheckInUseCase(checlInRepository)

    return validateCheckInUseCase
}