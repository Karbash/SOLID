import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
    longitude: number,
    latitude: number
}

export interface GymRespository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}