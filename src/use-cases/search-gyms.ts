
import { Gym } from "@prisma/client";
import { GymRespository } from "@/repositories/gym-repository";

interface SearchGymUseCaseRequest {
    query: string,
    page: number
}

interface SearchGymUseCaseResponse {
    gyms: Gym[]
}

// D = Dependency Inversion Principle

export class SearchGymUseCase {

    private gymRepository: GymRespository

    constructor(gymRepository: GymRespository) {

        this.gymRepository = gymRepository
    }


    async execute({ query, page }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
        const gyms = await this.gymRepository.searchMany(query, page)
        return {
            gyms,
        }
    }
}

