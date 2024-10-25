import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRespository } from "../check-in-repository";
import dayjs from "dayjs";



export class PrismaCheckInsRepository implements CheckInRespository {

    async create(data: Prisma.CheckInUncheckedCreateInput) {

        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }

    async save(checkIn: CheckIn) {

        const checkInUpdated = await prisma.checkIn.update({
            where: {
                id: checkIn.id
            },
            data: checkIn
        })

        return checkInUpdated
    }

    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')


        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })

        return checkIn
    }

    async findManyByUserId(userId: string, page: number) {

        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return checkIns
    }

    async findById(id: string) {

        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkIn
    }

    async countByUserId(userId: string) {

        const count = await prisma.checkIn.count({
            where: {
                user_id: userId
            }
        })

        return count
    }


}