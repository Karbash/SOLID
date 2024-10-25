import { CheckIn } from "@prisma/client";
import { CheckInRespository } from "@/repositories/check-in-repository";

interface FetchCheckInsHistoryUseCaseRequest {
    userId: string,
    page: number
}

interface FetchCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchCheckInsHistoryUseCase {

    private checkInRepository: CheckInRespository


    constructor(checkInRepository: CheckInRespository) {

        this.checkInRepository = checkInRepository
    }

    async execute({ userId, page }: FetchCheckInsHistoryUseCaseRequest): Promise<FetchCheckInsHistoryUseCaseResponse> {

        const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
        return { checkIns }
    }
}