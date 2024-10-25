
import { Gym } from "@prisma/client";
import { GymRespository } from "@/repositories/gym-repository";

interface CreateGymUseCaseRequest {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

// D = Dependency Inversion Principle

export class CreateGymUseCase {

    private gymRepository: GymRespository

    constructor(gymRepository: GymRespository) {

        this.gymRepository = gymRepository
    }


    async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })
        return {
            gym,
        }
    }
}

