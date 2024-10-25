import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRespository } from "../users-repository";



export class PrismaUserRepository implements UsersRespository {

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        return user
    }


    async findByEmail(email: string) {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password_hash: data.password_hash,
            }
        })
        return user
    }
}