import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { ValidateCheckInUseCase } from "./validate-check-in"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { LateCheckInValidateError } from "./errors/late-check-in-validate-error"


let checkInRepository: InMemoryCheckInRepository // Fake Repository
let validateCheckInUseCase: ValidateCheckInUseCase



describe('[VALIDATE CHECK IN] - USE CASE', () => {

    beforeEach(async () => {

        checkInRepository = new InMemoryCheckInRepository() // Fake Repository
        validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

        vi.useRealTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('Should be able to validate check-in', async () => {

        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

        const { checkIn } = await validateCheckInUseCase.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))

    })

    test('Should not be able to validate inexistent check-in', async () => {
        expect(async () => {
            await validateCheckInUseCase.execute({
                checkInId: "inexistentId"
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    test('Should not be able to validate check-in after 20 minutes of this creation', async () => {

        vi.useFakeTimers().setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

        const twentyOneMinutes = 1000 * 60 * 21 //miliseconds

        vi.useFakeTimers().advanceTimersByTime(twentyOneMinutes)


        expect(async () => {
            await validateCheckInUseCase.execute({
                checkInId: createdCheckIn.id
            })
        }).rejects.toBeInstanceOf(LateCheckInValidateError)
    })
})

