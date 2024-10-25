import { UsersRespository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {

    private usersRepository: UsersRespository

    constructor(usersRepository: UsersRespository) {

        this.usersRepository = usersRepository
    }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {

        //buscar usuario no banco de dados pelo id
        const user = await this.usersRepository.findById(userId)
        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}