import { PrismaGymsRepository } from "../../repoitories/prisma/prisma-gyms-repoitory";
import { FetchNearbyGymsUserCase } from "../fetch-nearby-gymns";

export function makeFetchNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new FetchNearbyGymsUserCase(gymsRepository);
	return useCase;
}