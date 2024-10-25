
import { Gym } from "@prisma/client";
import { GymRespository } from "@/repositories/gym-repository";

interface FetchNearbyGymUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
    gyms: Gym[]
}

// D = Dependency Inversion Principle

export class FetchNearbyGymUseCase {

    private gymRepository: GymRespository

    constructor(gymRepository: GymRespository) {

        this.gymRepository = gymRepository
    }


    async execute({ userLatitude, userLongitude }: FetchNearbyGymUseCaseRequest): Promise<FetchNearbyGymUseCaseResponse> {
        const gyms = await this.gymRepository.findManyNearby(
            {
                latitude: userLatitude,
                longitude: userLongitude
            }
        )
        return {
            gyms,
        }
    }
}

