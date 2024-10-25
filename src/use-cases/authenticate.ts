import { UsersRespository } from "@/repositories/users-repository";
import bcryptjs from 'bcryptjs';
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {

    private usersRepository: UsersRespository

    constructor(usersRepository: UsersRespository) {

        this.usersRepository = usersRepository
    }

    async execute({
        email,
        password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        //buscar usuario no banco de dados pelo email
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new InvalidCredentialsError()
        }
        //comparar senha salva no banco com hash da senha inserida
        const doesPasswordMatches = await bcryptjs.compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}