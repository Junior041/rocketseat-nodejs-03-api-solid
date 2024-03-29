import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
    latitude: number; 
    longitude: number;
}

export interface GymsRepoitory {
    create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}