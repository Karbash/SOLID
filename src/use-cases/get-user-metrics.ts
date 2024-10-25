import { CheckInRespository } from "@/repositories/check-in-repository";

interface GetUserMetricsUseCaseRequest {
    userId: string,
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {

    private checkInRepository: CheckInRespository


    constructor(checkInRepository: CheckInRespository) {

        this.checkInRepository = checkInRepository
    }

    async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {

        const checkInsCount = await this.checkInRepository.countByUserId(userId)
        return { checkInsCount }
    }
}