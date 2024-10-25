import { CheckIn } from "@prisma/client";
import { CheckInRespository } from "@/repositories/check-in-repository";
import { GymRespository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberCheckInError } from "./errors/max-number-check-in-error";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {

    private checkInRepository: CheckInRespository
    private gymRepository: GymRespository

    constructor(checkInRepository: CheckInRespository, gymRepository: GymRespository) {

        this.checkInRepository = checkInRepository
        this.gymRepository = gymRepository
    }

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        //Calcular a distancia
        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            })

        const MAX_DISTANCE_IN_KILOMETERS = 0.1 //100 meters

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }


        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new MaxNumberCheckInError()
        }

        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return { checkIn }
    }
}