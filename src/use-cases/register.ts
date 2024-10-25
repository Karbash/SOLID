
import { UsersRespository } from "@/repositories/users-repository";
import bcrypt from 'bcryptjs';
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

// D = Dependency Inversion Principle

export class RegisterUseCase {

    private usersRepository: UsersRespository

    constructor(usersRepository: UsersRespository) {

        this.usersRepository = usersRepository
    }


    async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const password_hash = await bcrypt.hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({ name, email, password_hash })
        return { user }
    }
}

